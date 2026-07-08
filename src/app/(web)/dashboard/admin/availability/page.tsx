import { getRooms } from "@/app/libs/sanityFetch";
import { getAvailability } from "@/actions/availability";
import AvailabilityGrid from "./AvailabilityGrid";

export const dynamic = "force-dynamic";

const AvailabilityPage = async () => {
  const rooms = await getRooms();
  const allAvailability = await Promise.all(
    rooms.map((r) => getAvailability(r._id))
  );

  const availabilityMap = new Map<string, Awaited<ReturnType<typeof getAvailability>>>();
  rooms.forEach((r, i) => availabilityMap.set(r._id, allAvailability[i]));

  return (
    <div>
      <h2 className="font-heading text-xl font-medium mb-6 text-stellar-blue">Room Availability</h2>
      <p className="text-stellar-grey text-sm mb-6">
        Toggle room availability for specific dates. Greyed out = blocked.
      </p>

      <div className="space-y-8">
        {rooms.map((room) => (
          <div key={room._id} className="border border-stellar-light-grey p-4 md:p-6">
            <h3 className="font-heading text-lg font-medium text-stellar-blue mb-4">
              {room.name}
            </h3>
            <AvailabilityGrid
              roomId={room._id}
              availability={availabilityMap.get(room._id) || []}
            />
          </div>
        ))}
      </div>

      {rooms.length === 0 && (
        <p className="text-stellar-grey">No rooms found.</p>
      )}
    </div>
  );
};

export default AvailabilityPage;
