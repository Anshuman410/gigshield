import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // 1. Create Zones
    const zoneA = await prisma.zone.create({
      data: {
        id: 'Z-DEL-South',
        city: 'Delhi',
        name: 'South Delhi Hub',
        baseRiskMultiplier: 1.2,
      }
    });

    const zoneB = await prisma.zone.create({
      data: {
        id: 'Z-DEL-North',
        city: 'Delhi',
        name: 'North Delhi Hub',
        baseRiskMultiplier: 1.0,
      }
    });

    // 2. Create Worker (Ravi)
    const worker1 = await prisma.worker.create({
      data: {
        id: 'W123',
        name: 'Ravi Kumar',
        platformId: 'DEL-9912',
        historicalHourlyAvg: 85.50,
        createdAt: new Date('2025-01-01T00:00:00Z'),
      }
    });

    // 3. Create Earnings Ledger (History)
    await prisma.earningsLedger.createMany({
      data: [
        { workerId: worker1.id, weekStart: new Date('2026-02-18T00:00:00Z'), totalEarnings: 3500, totalActiveHours: 40 },
        { workerId: worker1.id, weekStart: new Date('2026-02-25T00:00:00Z'), totalEarnings: 3650, totalActiveHours: 42 },
        { workerId: worker1.id, weekStart: new Date('2026-03-04T00:00:00Z'), totalEarnings: 3200, totalActiveHours: 38 },
        { workerId: worker1.id, weekStart: new Date('2026-03-11T00:00:00Z'), totalEarnings: 2050, totalActiveHours: 41 },
      ]
    });

    return NextResponse.json({ success: true, message: 'Database seeded' });
  } catch (error: any) {
    if (error.code === 'P2002') {
       return NextResponse.json({ success: true, message: 'Already seeded' });
    }
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
