import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, platformId, city, zoneName } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if worker already exists
    const existingWorker = await prisma.worker.findUnique({
      where: { email },
    });

    if (existingWorker) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const resolvedPlatformId = platformId || `GIG-${Math.floor(10000 + Math.random() * 90000)}`;

    const worker = await prisma.worker.create({
      data: {
        name,
        email,
        password: hashedPassword,
        platformId: resolvedPlatformId,
        historicalHourlyAvg: 15.0, // base starter avg
      },
    });

    // Don't send password back
    const { password: _, ...workerData } = worker;

    return NextResponse.json({ message: "Registered successfully", worker: workerData }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}
