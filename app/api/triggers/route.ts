import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const triggers = await prisma.triggerEvent.findMany({
    where: { active: true },
    orderBy: { timestamp: 'desc' }
  })
  return NextResponse.json(triggers)
}

export async function POST(req: Request) {
  try {
    const { zone_id, event_type, severity } = await req.json()

    // Create a new trigger event globally
    const trigger = await prisma.triggerEvent.create({
      data: {
        zoneId: zone_id,
        eventType: event_type,
        severity: severity,
        active: true
      }
    })

    // Update risk multiplier for that zone
    await prisma.zone.update({
      where: { id: zone_id },
      data: { baseRiskMultiplier: 1.8 } // Spike the zone risk
    })

    return NextResponse.json({ trigger_id: trigger.id, status: "BROADCASTED" })
  } catch(e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
