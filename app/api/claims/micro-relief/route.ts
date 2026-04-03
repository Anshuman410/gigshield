import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { worker_id, policy_id, trigger_id, gps } = await req.json()

    // Mock Fraud Check Logic (0 - 100)
    let fraudScore = 0;
    const rulesFailed = [];

    // Rule 1: GPS Mismatch (mock simple check for Delhi bounds)
    if (!gps || gps.lat < 28.0 || gps.lat > 29.0) {
      fraudScore += 40;
      rulesFailed.push("Zone Location Mismatch");
    }

    // Rule 2: Active Proof Mismatch (Mock 10% chance)
    if (Math.random() > 0.9) {
      fraudScore += 100;
      rulesFailed.push("Activity Proof Mismatch");
    }

    // Decisioning
    let status = 'APPROVED';
    if (fraudScore > 20 && fraudScore < 70) status = 'PENDING';
    if (fraudScore >= 70) status = 'REJECTED';

    const claim = await prisma.claim.create({
      data: {
        policyId: policy_id,
        type: 'MICRO',
        amount: 50, // Rs 50 voucher
        status: status
      }
    })

    if (fraudScore > 0) {
      await prisma.fraudLog.create({
        data: {
          claimId: claim.id,
          ruleFailed: rulesFailed.join(', '),
          confidenceScore: fraudScore
        }
      })
    }

    if (status === 'APPROVED') {
       return NextResponse.json({ claim_id: claim.id, status, payout_type: "VOUCHER", code: "CHAI-RELIEF-QR-99" })
    } else {
       return NextResponse.json({ claim_id: claim.id, status, fraud_score: fraudScore, reason: rulesFailed.join(', ') })
    }

  } catch(e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
