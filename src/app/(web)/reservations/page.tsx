import { redirect } from "next/navigation";

const ReservationsPage = () => {
  redirect("/dashboard/bookings");
};

export default ReservationsPage;
