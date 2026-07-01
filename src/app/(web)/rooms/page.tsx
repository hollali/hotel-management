import Link from "next/link";
import Image from "next/image";
import { getRooms } from "@/app/libs/sanityFetch";
import { FaBed, FaUsers, FaTag } from "react-icons/fa";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const RoomsPage = async () => {
  const rooms = await getRooms();

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Our Rooms
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        Experience luxury and comfort in our carefully curated rooms and suites.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => {
          const coverUrl = room.coverImage?.asset?.url;

          return (
            <Link
              key={room._id}
              href={`/rooms/${room.slug.current}`}
              className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                {room.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-tertiary-dark text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <FaTag className="mr-1" />
                    {room.discount}% OFF
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {room.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>

                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {room.NumberOfBed && (
                    <span className="flex items-center">
                      <FaBed className="mr-1" />
                      {room.NumberOfBed} {room.NumberOfBed > 1 ? "Beds" : "Bed"}
                    </span>
                  )}
                  {room.maxGuests && (
                    <span className="flex items-center">
                      <FaUsers className="mr-1" />
                      Up to {room.maxGuests}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      GHS {room.price}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      /night
                    </span>
                    {room.discount > 0 && (
                      <span className="block text-sm line-through text-gray-400">
                        GHS {Math.round(room.price * (1 + room.discount / 100))}
                      </span>
                    )}
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm capitalize">
                    {room.type}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No rooms available at the moment.</p>
        </div>
      )}
    </section>
  );
};

export default RoomsPage;
