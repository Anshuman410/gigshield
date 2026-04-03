import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { worker_id, policy_id } = await req.json()

    // 1. Get worker historical average
    const worker = await prisma.worker.findUnique({ where: { id: worker_id } })
    if (!worker) return NextResponse.json({ error: 'Worker not found' }, { status: 404 })

    // 2. Fetch the most recent earnings week (mocking the drop week)
    const recentWeek = await prisma.earningsLedger.findFirst({
      where: { workerId: worker_id },
      orderBy: { weekStart: 'desc' }
    })

    if (!recentWeek) return NextResponse.json({ error: 'No ledger found' }, { status: 404 })

    const expectedEarnings = worker.historicalHourlyAvg * recentWeek.totalActiveHours;
    const actualEarnings = recentWeek.totalEarnings;
    
    // 3. Drop Threshold Rule
    const dropPercentage = ((expectedEarnings - actualEarnings) / expectedEarnings) * 100;
    
    let settlement_approved = 0;
    let status = 'PROCESSING';

    if (dropPercentage > 30) {
      settlement_approved = expectedEarnings - actualEarnings; // Cover the gap
      if (settlement_approved > 2000) settlement_approved = 2000; // Max coverage boundary

      await prisma.claim.create({
        data: {
          policyId: policy_id,
          type: 'SETTLEMENT',
          amount: settlement_approved,
          status: 'APPROVED'
        }
      })
      status = 'APPROVED';
    } else {
      status = 'REJECTED (Drop < 30%)'
    }

    return NextResponse.json({
      expected_earnings: expectedEarnings,
      actual_earnings: actualEarnings,
      drop_percentage: dropPercentage.toFixed(1),
      settlement_approved,
      status
    })

  } catch(e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
