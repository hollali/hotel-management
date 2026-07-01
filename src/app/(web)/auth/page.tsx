"use client";

import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useTheme } from "@/app/hooks/useTheme";

const AuthPage = () => {
  const { isDark } = useTheme();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");

  return (
    <section className="container mx-auto flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-md">
        <div className="flex mb-6 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          <button
            onClick={() => setMode("sign-in")}
            className={`flex-1 py-2 text-center font-medium transition-colors ${
              mode === "sign-in"
                ? "bg-primary text-white"
                : "bg-transparent text-gray-600 dark:text-gray-400"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("sign-up")}
            className={`flex-1 py-2 text-center font-medium transition-colors ${
              mode === "sign-up"
                ? "bg-primary text-white"
                : "bg-transparent text-gray-600 dark:text-gray-400"
            }`}
          >
            Sign Up
          </button>
        </div>
        {mode === "sign-in" ? (
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-lg",
              },
            }}
          />
        ) : (
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-lg",
              },
            }}
          />
        )}
      </div>
    </section>
  );
};

export default AuthPage;
