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

    const { policyId, amount, description } = await req.json();

    // Verify the policy belongs to the worker
    const policy = await prisma.policy.findFirst({
      where: { id: policyId, workerId, status: "ACTIVE" }
    });

    if (!policy) {
      return NextResponse.json({ error: "Active policy not found for this worker." }, { status: 400 });
    }

    if (amount > policy.maxCoverage) {
      return NextResponse.json({ error: "Claim amount exceeds policy coverage limit." }, { status: 400 });
    }

    const claim = await prisma.claim.create({
      data: {
        policyId,
        type: "MANUAL",
        amount: Number(amount),
        // @ts-ignore
        description,
        status: "PENDING"
      }
    });

    return NextResponse.json({ message: "Claim requested successfully", claim }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to submit claim" }, { status: 500 });
  }
}
