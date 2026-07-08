import { verifyAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";
import AdminShellClient from "./_components/AdminShellClient";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <div className="flex">
        <AdminShellClient>{children}</AdminShellClient>
      </div>
    </div>
  );
};

export default AdminLayout;
