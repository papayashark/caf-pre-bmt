import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/app/lib/db";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = body.name;
    const email = body.email.toLowerCase(); // Vynutí malá písmena
    const password = body.password;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email is already in use." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Vytvoření uživatele v databázi
    await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    // 2. Vygenerování tokenu
    const token = uuidv4();
    await prisma.verificationToken.create({
      data: {
        email,
        token,
        expires: new Date(Date.now() + 3600 * 1000) 
      }
    });

    // 3. Odeslání e-mailu přes Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const confirmLink = `${process.env.NEXTAUTH_URL}/verify?token=${token}`;
    
    const mailOptions = {
      from: '"CAF PRE-BMT" <' + process.env.EMAIL_USER + '>',
      to: email, 
      subject: "Verify your CAF PRE-BMT account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Welcome to CAF PRE-BMT!</h2>
          <p>Click the button below to verify your email address and activate your account.</p>
          <br>
          <a href="${confirmLink}" style="padding: 12px 24px; background-color: #f97316; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Verify Account</a>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Verification email sent!" }, { status: 201 });
  } catch (error) {
    console.error("🚨 REGISTRATION ERROR:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}