import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "soldier@caf.ca" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. Najdeme uživatele a rovnou převedeme e-mail na malá písmena!
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() } 
        });

        if (!user) {
          return null; // Uživatel nenalezen
        }

        // 2. Kontrola, jestli heslo sedí s hashem v databázi
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null; // Špatné heslo
        }

        // 3. Kontrola, zda uživatel klikl na odkaz v e-mailu
        if (!user.emailVerified) {
          throw new Error("Please verify your email address before logging in.");
        }

        // 4. Vše je v pořádku, vrátíme uživatele do session
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    })
  ],
  session: {
    strategy: "jwt", 
  },
  pages: {
    signIn: '/login', 
  }
});

export { handler as GET, handler as POST };