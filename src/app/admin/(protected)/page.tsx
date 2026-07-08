export const dynamic = "force-dynamic";

import { getDashboardStats } from "@/actions/admin";
import DashboardClient from "./_components/DashboardClient";

const AdminDashboardPage = async () => {
  const stats = await getDashboardStats();

  return <DashboardClient stats={stats} />;
};

export default AdminDashboardPage;
