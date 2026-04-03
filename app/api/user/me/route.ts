import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-gigshield-key");

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = payload.sub as string;

    const worker = await prisma.worker.findUnique({
      where: { id: userId },
      include: {
        policies: {
          include: { 
            zone: true,
            claims: true 
          }
        }
      }
    });

    if (!worker) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // @ts-ignore
    const { password, ...safeWorker } = worker;
    
    // Flatten claims for the dashboard overview
    const allClaims = worker.policies.flatMap(p => p.claims);

    return NextResponse.json({ ...safeWorker, claims: allClaims }, { status: 200 });
  } catch (error) {
    console.error("Fetch user error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
