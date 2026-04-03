import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-gigshield-key");

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const workerId = payload.sub as string;

    const { zoneId, totalPremium, maxCoverageAmount, durationMonths } = await req.json();

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + durationMonths);

    const policy = await prisma.policy.create({
      data: {
        workerId,
        zoneId,
        premiumPaid: totalPremium,
        maxCoverage: maxCoverageAmount,
        startDate,
        endDate,
        status: "ACTIVE"
      }
    });

    return NextResponse.json({ message: "Policy purchased successfully", policy }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Purchase failed" }, { status: 500 });
  }
}
