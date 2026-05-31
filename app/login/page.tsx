"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // --- 1. PŘIHLÁŠENÍ (SIGN IN) ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Odeslání dat do NextAuth
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      // Vypíše přesnou chybu ze serveru (např. nutnost ověřit e-mail)
      if (res.error === "CredentialsSignin") {
        setError("Invalid email or password.");
      } else {
        setError(res.error);
      }
      setIsLoading(false);
    } else {
      router.push("/"); // Úspěch -> přesměrování
    }
  };

  // --- 2. REGISTRACE (CREATE ACCOUNT) ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Odeslání dat na registrační API
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        // ÚSPĚCH: Už se automaticky nepřihlašujeme. Zobrazíme výzvu k ověření e-mailu!
        setError("");
        alert("Account created! Please check your email to verify your account before logging in.");
        
        // Volitelně vyčistíme formulář
        setPassword("");
      } else {
        // API vrátilo chybu (např. e-mail už existuje)
        const data = await res.json();
        setError(data.message || "Failed to register.");
      }
    } catch (err) {
      console.error(err);
      setError("A critical server error occurred. Check your terminal.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. VYKRESLENÍ (UI) ---
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-muted/20">
      <div className="w-full max-w-md p-8 bg-card border rounded-2xl shadow-lg">
        
        <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold uppercase tracking-tight text-primary">CAF PRE-BMT</h1>
            <p className="text-muted-foreground text-sm mt-1">Access your training plan</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Create Account</TabsTrigger>
          </TabsList>

          {/* SIGN IN FORM */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="soldier@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          {/* REGISTER FORM */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name">Full Name (Optional)</Label>
                <Input id="reg-name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" type="email" placeholder="soldier@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        
      </div>
    </div>
  );
}