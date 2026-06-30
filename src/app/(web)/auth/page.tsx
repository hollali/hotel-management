"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "@/app/hooks/useTheme";

const AuthPage = () => {
  const { isDark } = useTheme();

  return (
    <section className="container mx-auto flex items-center justify-center min-h-[60vh]">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
        }}
      />
    </section>
  );
};

export default AuthPage;
