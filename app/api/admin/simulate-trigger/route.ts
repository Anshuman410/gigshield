import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// In a real scenario, this would be triggered by a genuine API webhook like WeatherAPI or a Cron job parsing AQI.
export async function POST(req: NextRequest) {
  try {
    const { zoneId, eventType, severity } = await req.json();

    const zone = await prisma.zone.findUnique({ where: { id: zoneId } });
    if (!zone) return NextResponse.json({ error: "Zone not found" }, { status: 404 });

    // Create the trigger event
    const trigger = await prisma.triggerEvent.create({
      data: {
        zoneId,
        eventType,
        severity,
        active: true
      }
    });

    // Zero-Touch claim processing:
    // Find all active policies in this zone
    const activePolicies = await prisma.policy.findMany({
      where: {
        zoneId,
        status: "ACTIVE"
      }
    });

    // Auto-file claims for affected workers
    const claimsCreated = await Promise.all(activePolicies.map(async (policy) => {
      // Calculate micro claim amount based on severity and policy MaxCoverage
      const amount = Math.min(policy.maxCoverage * 0.1 * severity, policy.maxCoverage);
      
      return prisma.claim.create({
        data: {
          policyId: policy.id,
          type: "MICRO",
          amount: Math.round(amount),
          status: "APPROVED" // Zero-touch means instantly approved based on verifiable trigger
        }
      });
    }));

    return NextResponse.json({
      message: `Trigger Simulated: ${eventType}. Zero-touch claims automatically filed.`,
      trigger,
      claimsProcessed: claimsCreated.length
    }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Trigger simulation failed" }, { status: 500 });
  }
}
