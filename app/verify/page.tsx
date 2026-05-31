"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found in the URL.");
      return;
    }

    fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage("Your account has been verified!");
        } else {
          setStatus("error");
          setMessage(data.message || "Failed to verify.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("A critical error occurred.");
      });
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <div className="max-w-md w-full p-8 bg-card border rounded-2xl shadow-lg">
        <h1 className="text-2xl font-extrabold uppercase tracking-tight text-primary mb-4">
          Account Verification
        </h1>
        
        {status === "loading" && (
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        )}
        
        <p className={`text-lg font-medium mb-8 ${status === "error" ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>

        {status !== "loading" && (
          <Link href="/login">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all">
              Proceed to Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

// Suspense is required by Next.js when using useSearchParams
export default function VerifyPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <VerifyContent />
    </Suspense>
  );
}