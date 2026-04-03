import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const workerId = searchParams.get('worker_id')
    const zoneId = searchParams.get('zone_id')

    if (!workerId || !zoneId) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

    const zone = await prisma.zone.findUnique({ where: { id: zoneId }})
    if (!zone) return NextResponse.json({ error: 'Zone not found' }, { status: 404 })

    // Mock AI Risk Score (1-10) using simple deterministic formula
    let riskScore = zone.baseRiskMultiplier * 5; 
    if (riskScore > 10) riskScore = 9.9;

    const basePremium = 25;
    const weeklyPremiumInr = Math.floor(basePremium * (1 + riskScore / 10));

    return NextResponse.json({
      risk_score: riskScore.toFixed(1),
      weekly_premium_inr: weeklyPremiumInr,
      max_coverage_inr: 2000,
      advice: riskScore >= 6 ? "High rain risk modeled. Pre-check vehicle condition." : "Conditions clear. Expect steady volume.",
      zone_id: zoneId
    })
  } catch (error: any) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
