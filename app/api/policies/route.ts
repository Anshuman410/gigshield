import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// Get active policy for a worker
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const workerId = searchParams.get('worker_id')
    if (!workerId) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

    const policy = await prisma.policy.findFirst({
      where: { workerId, status: 'ACTIVE' },
      orderBy: { startDate: 'desc' }
    })
    
    if (!policy) return NextResponse.json({ hasPolicy: false })
    return NextResponse.json({ hasPolicy: true, policy })
  } catch(error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

// Buy a new policy
export async function POST(req: Request) {
  try {
    const { worker_id, zone_id, premium_paid } = await req.json()
    
    // Expire older policies for this worker
    await prisma.policy.updateMany({
      where: { workerId: worker_id, status: 'ACTIVE' },
      data: { status: 'EXPIRED' }
    });

    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(startDate.getDate() + 7) // 7 days coverage

    const policy = await prisma.policy.create({
      data: {
        workerId: worker_id,
        zoneId: zone_id,
        premiumPaid: premium_paid,
        maxCoverage: 2000,
        startDate: startDate,
        endDate: endDate,
        status: 'ACTIVE'
      }
    })

    return NextResponse.json({ policy_id: policy.id, status: policy.status, valid_until: policy.endDate })
  } catch(e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
