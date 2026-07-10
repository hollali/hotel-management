import { getRooms } from "@/app/libs/sanityFetch";
import type { SanityRoom } from "@/app/libs/sanityFetch";
import RoomsList from "./RoomsList";

export const dynamic = "force-dynamic";

const RoomsPage = async () => {
  let rooms: SanityRoom[] = [];
  try {
    rooms = await getRooms();
  } catch (error) {
    console.error("Failed to fetch rooms:", error);
  }

  return <RoomsList rooms={rooms} />;
};

export default RoomsPage;
