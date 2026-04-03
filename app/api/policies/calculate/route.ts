import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This endpoint acts as the AI Integration Example for Dynamic Pricing Models
export async function POST(req: NextRequest) {
  try {
    const { zoneId, durationMonths } = await req.json();

    const zone = await prisma.zone.findUnique({ where: { id: zoneId } });
    if (!zone) return NextResponse.json({ error: "Zone not found" }, { status: 404 });

    // Base pricing algorithm
    // Let's assume standard base rate is ₹50 per week
    const BASE_WEEKLY_RATE = 50;
    
    // Total weeks = duration in months * 4 (roughly)
    const weeks = durationMonths * 4;

    // AI Pricing Logics:
    let aiAdjustedWeeklyRate = BASE_WEEKLY_RATE;
    let extraCoverageHoursPerWeek = 0;
    let aisummary = "";

    // 1. Water logging safe zone bonus
    if (zone.historicalSafetyScore >= 0.8) {
      aiAdjustedWeeklyRate -= 2; // model charges ₹2 less per week
      aisummary = `Zone is historically safe (Safety Score: ${zone.historicalSafetyScore.toFixed(2)}). Machine Learning algorithm adjusted weekly premium by -₹2.`;
    } else if (zone.historicalSafetyScore < 0.5) {
      // 2. High risk predictive weather bonus coverage
      aiAdjustedWeeklyRate += 5; // Risk premium
      extraCoverageHoursPerWeek = 10;
      aisummary = `High risk zone detected (Safety Score: ${zone.historicalSafetyScore.toFixed(2)}). Predictive AI modeling increased premium but dynamically offered +10 increased coverage hours.`;
    } else {
      aisummary = `Zone exhibits normal risk factors. Base premium applied.`;
    }

    // Apply zone base multiplier
    aiAdjustedWeeklyRate = aiAdjustedWeeklyRate * zone.baseRiskMultiplier;

    const totalPremium = Math.round(aiAdjustedWeeklyRate * weeks);
    
    // Coverage max limit based on duration
    const maxCoverageAmount = Math.round(1000 * durationMonths);

    return NextResponse.json({
      baseRate: BASE_WEEKLY_RATE,
      weeklyPremium: aiAdjustedWeeklyRate,
      totalPremium,
      extraCoverageHoursPerWeek,
      maxCoverageAmount,
      aiInsights: aisummary,
      weeks
    });
  } catch (err) {
    return NextResponse.json({ error: "AI Pricing calculation failed" }, { status: 500 });
  }
}
