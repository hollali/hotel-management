import type { Metadata } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/app/components/Header/Header";
import "./globals.css";
import Footer from "../components/Footer/Footer";
import Toast from "../components/Toast/Toast";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: "Sky Inn Hotel",
  description: "The Premier Hotel In Ghana",
  icons: [{ rel: "icon", url: "/skyinn.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${playfair.variable} ${jost.variable}`}>
        <body className="font-secondary">
          <main className="min-h-screen bg-white text-stellar-blue">
            <Toast />
            <Header />
            {children}
            <Footer />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
