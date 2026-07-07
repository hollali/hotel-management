import Link from "next/link";
import Image from "next/image";
import { getRooms } from "@/app/libs/sanityFetch";
import { FaBed, FaUsers } from "react-icons/fa";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const RoomsPage = async () => {
  const rooms = await getRooms();

  return (
    <section className="kempinski-container pt-28 pb-16 md:pb-24">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="section-title mb-4">Rooms & Suites</h1>
        <p className="section-subtitle mx-auto">
          Experience luxury and comfort in our carefully curated rooms and suites.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {rooms.map((room) => {
          const coverUrl = room.coverImage?.url || room.coverImage?.file?.asset?.url;

          return (
            <Link
              key={room._id}
              href={`/rooms/${room.slug.current}`}
              className="group bg-white"
            >
              <div className="relative h-72 md:h-80 overflow-hidden">
                {coverUrl ? (
                  <Image
                    src={coverUrl}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-beige flex items-center justify-center">
                    <span className="text-stellar-grey">No Image</span>
                  </div>
                )}
                {room.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-brand text-white px-3 py-1 text-xs font-medium uppercase tracking-[0.08em]">
                    {room.discount}% OFF
                  </div>
                )}
                <div className="absolute inset-0 bg-stellar-blue/0 group-hover:bg-stellar-blue/20 transition-colors duration-500" />
              </div>

              <div className="p-6 border border-stellar-light-grey border-t-0">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-xl font-medium group-hover:text-brand transition-colors">
                    {room.name}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-beige text-stellar-grey uppercase tracking-[0.08em]">
                    {room.type}
                  </span>
                </div>

                <p className="text-stellar-grey text-sm mb-4 line-clamp-2 leading-relaxed">
                  {room.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-stellar-grey mb-4 uppercase tracking-[0.08em]">
                  {room.NumberOfBed && (
                    <span className="flex items-center gap-1">
                      <FaBed className="text-brand" />
                      {room.NumberOfBed} {room.NumberOfBed > 1 ? "Beds" : "Bed"}
                    </span>
                  )}
                  {room.maxGuests && (
                    <span className="flex items-center gap-1">
                      <FaUsers className="text-brand" />
                      Up to {room.maxGuests}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stellar-light-grey">
                  <div>
                    {room.discount > 0 ? (
                      <div>
                        <span className="font-heading text-xl font-medium text-stellar-blue">
                          GHS {Math.round(room.price * (1 - room.discount / 100))}
                        </span>
                        <span className="text-xs text-stellar-grey ml-1">/night</span>
                        <span className="block text-xs line-through text-stellar-grey">
                          GHS {room.price}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="font-heading text-xl font-medium text-stellar-blue">
                          GHS {room.price}
                        </span>
                        <span className="text-xs text-stellar-grey ml-1">/night</span>
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium text-stellar-blue uppercase tracking-[0.07em] group-hover:text-brand transition-colors">
                    Book Now
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-20">
          <p className="text-stellar-grey text-lg">No rooms available at the moment.</p>
        </div>
      )}
    </section>
  );
};

export default RoomsPage;
