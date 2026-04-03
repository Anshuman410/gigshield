import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    let zones = await prisma.zone.findMany();
    
    // Seed default zones if empty
    if (zones.length === 0) {
      zones = await Promise.all([
        prisma.zone.create({ data: { name: "Downtown Sector 4", city: "Metropolis", baseRiskMultiplier: 1.2, historicalSafetyScore: 0.4 } }),
        prisma.zone.create({ data: { name: "Suburban Heights", city: "Metropolis", baseRiskMultiplier: 0.8, historicalSafetyScore: 0.85 } }),
        prisma.zone.create({ data: { name: "Industrial North", city: "Metropolis", baseRiskMultiplier: 1.5, historicalSafetyScore: 0.3 } }),
      ]);
    }
    
    return NextResponse.json(zones);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch zones" }, { status: 500 });
  }
}
