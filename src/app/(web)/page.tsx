import Link from "next/link";
import Image from "next/image";
import { FaBed, FaUsers, FaClock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { getHotelInfo, getFeaturedRooms } from "@/app/libs/sanityFetch";

export const dynamic = "force-dynamic";

const Home = async () => {
  const hotelInfo = await getHotelInfo();
  const featuredRooms = await getFeaturedRooms();

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[75vh] md:h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${
              hotelInfo?.logo?.asset?.url
                ? `/skyinn.png`
                : "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600"
            })`,
          }}
        />
        <div className="relative z-20 text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            {hotelInfo?.name || "Sky Inn Hotel"}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            {hotelInfo?.description ||
              "Experience luxury and comfort in the heart of Ghana. Your perfect stay awaits."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg"
            >
              Browse Rooms
            </Link>
            <Link
              href="/contacts"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-tertiary-dark dark:bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <FaClock className="text-2xl text-primary" />
            <div className="text-left">
              <p className="text-sm text-gray-300">Check-In / Check-Out</p>
              <p className="font-semibold">
                {hotelInfo?.checkInTime || "14:00"} / {hotelInfo?.checkOutTime || "12:00"}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <FaMapMarkerAlt className="text-2xl text-primary" />
            <div className="text-left">
              <p className="text-sm text-gray-300">Location</p>
              <p className="font-semibold">
                {hotelInfo
                  ? `${hotelInfo.city}, ${hotelInfo.country}`
                  : "Accra, Ghana"}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <FaPhone className="text-2xl text-primary" />
            <div className="text-left">
              <p className="text-sm text-gray-300">Reservations</p>
              <p className="font-semibold">{hotelInfo?.phone || "+233 0243658631"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      {featuredRooms.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Rooms</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our most popular accommodations, handpicked for an unforgettable stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.slice(0, 6).map((room) => {
              const coverUrl = room.coverImage?.url || room.coverImage?.file?.asset?.url;

              return (
                <Link
                  key={room._id}
                  href={`/rooms/${room.slug.current}`}
                  className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
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
                      <div className="absolute top-3 right-3 bg-tertiary-dark text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {room.discount}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {room.name}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                        {room.type}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {room.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {room.NumberOfBed && (
                        <span className="flex items-center gap-1">
                          <FaBed />
                          {room.NumberOfBed} {room.NumberOfBed > 1 ? "Beds" : "Bed"}
                        </span>
                      )}
                      {room.maxGuests && (
                        <span className="flex items-center gap-1">
                          <FaUsers />
                          Up to {room.maxGuests}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {room.discount > 0 ? (
                        <div>
                          <span className="text-xl font-bold text-primary">
                            GHS {Math.round(room.price * (1 - room.discount / 100))}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">/night</span>
                          <span className="block text-xs line-through text-gray-400">
                            GHS {room.price}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-xl font-bold text-primary">GHS {room.price}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">/night</span>
                        </div>
                      )}
                      <span className="text-sm text-primary font-medium group-hover:underline">
                        Book Now
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/rooms"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              View All Rooms
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for an Unforgettable Stay?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Book your room today and experience the finest hospitality Ghana has to offer.
          </p>
          <Link
            href="/rooms"
            className="inline-block bg-white text-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Book Your Stay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
