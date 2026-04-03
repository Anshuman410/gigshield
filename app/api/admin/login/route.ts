import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-gigshield-key");

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (email === "anshuman@gmail.com" && password === "Anshuman@123") {
      const token = await new SignJWT({ sub: "admin", email })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(JWT_SECRET);

      const response = NextResponse.json({ message: "Admin Login successful" }, { status: 200 });

      response.cookies.set({
        name: "admin_auth_token",
        value: token,
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    return NextResponse.json({ error: "ACCESS DENIED. INVALID CREDENTIALS." }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
