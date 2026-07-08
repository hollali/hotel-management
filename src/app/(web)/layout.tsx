import Header from "@/app/components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function WebLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-stellar-blue">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
