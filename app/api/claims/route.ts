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
    const workerId = payload.sub as string;

    const claims = await prisma.claim.findMany({
      where: {
        policy: { workerId }
      },
      include: {
        policy: {
          include: { zone: true }
        }
      },
      orderBy: { id: 'desc' }
    });

    return NextResponse.json({ claims }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch claims" }, { status: 500 });
  }
}
