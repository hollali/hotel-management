"use client";

import { useState } from "react";
import { SignIn, SignUp } from "@clerk/nextjs";

const AuthPage = () => {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");

  return (
    <section className="kempinski-container flex items-center justify-center min-h-screen pt-20 pb-16">
      <div className="w-full max-w-md">
        <h1 className="font-heading text-3xl md:text-4xl font-medium text-center mb-8 text-stellar-blue">
          {mode === "sign-in" ? "Welcome Back" : "Create Account"}
        </h1>
        <div className="flex mb-8 border border-stellar-light-grey">
          <button
            onClick={() => setMode("sign-in")}
            className={`flex-1 py-3 text-sm font-medium uppercase tracking-[0.07em] transition-colors ${
              mode === "sign-in"
                ? "bg-stellar-blue text-white"
                : "bg-transparent text-stellar-grey hover:text-stellar-blue"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode("sign-up")}
            className={`flex-1 py-3 text-sm font-medium uppercase tracking-[0.07em] transition-colors ${
              mode === "sign-up"
                ? "bg-stellar-blue text-white"
                : "bg-transparent text-stellar-grey hover:text-stellar-blue"
            }`}
          >
            Sign Up
          </button>
        </div>
        {mode === "sign-in" ? (
          <SignIn
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-none border border-stellar-light-grey rounded-none",
                headerTitle: "font-heading text-stellar-blue",
                headerSubtitle: "text-stellar-grey",
                formButtonPrimary: "bg-stellar-blue hover:bg-brand text-sm uppercase tracking-[0.07em] rounded-none",
                formFieldLabel: "text-xs uppercase tracking-[0.08em] text-stellar-grey",
                formFieldInput: "border-stellar-light-grey rounded-none focus:border-brand",
                footerActionLink: "text-brand hover:text-stellar-blue",
                dividerLine: "bg-stellar-light-grey",
                dividerText: "text-stellar-grey",
                socialButtonsBlockButton: "border-stellar-light-grey rounded-none hover:bg-beige",
                socialButtonsBlockButtonText: "text-stellar-grey",
              },
            }}
          />
        ) : (
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-none border border-stellar-light-grey rounded-none",
                headerTitle: "font-heading text-stellar-blue",
                headerSubtitle: "text-stellar-grey",
                formButtonPrimary: "bg-stellar-blue hover:bg-brand text-sm uppercase tracking-[0.07em] rounded-none",
                formFieldLabel: "text-xs uppercase tracking-[0.08em] text-stellar-grey",
                formFieldInput: "border-stellar-light-grey rounded-none focus:border-brand",
                footerActionLink: "text-brand hover:text-stellar-blue",
                dividerLine: "bg-stellar-light-grey",
                dividerText: "text-stellar-grey",
                socialButtonsBlockButton: "border-stellar-light-grey rounded-none hover:bg-beige",
                socialButtonsBlockButtonText: "text-stellar-grey",
              },
            }}
          />
        )}
      </div>
    </section>
  );
};

export default AuthPage;
