import { redirect } from "next/navigation";

const DashboardPage = () => {
  redirect("/dashboard/bookings");
};

export default DashboardPage;
