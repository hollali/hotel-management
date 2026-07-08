import Link from "next/link";
import Image from "next/image";
import { FaBed, FaUsers, FaClock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { getHotelInfo, getFeaturedRooms } from "@/app/libs/sanityFetch";

export const dynamic = "force-dynamic";

const Home = async () => {
  let hotelInfo;
  let featuredRooms: Awaited<ReturnType<typeof getFeaturedRooms>> = [];
  try {
    [hotelInfo, featuredRooms] = await Promise.all([
      getHotelInfo(),
      getFeaturedRooms(),
    ]);
  } catch (error) {
    console.error("Failed to fetch Sanity data:", error);
  }

  return (
    <div>
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />
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
          <h1 className="font-heading text-5xl md:text-7xl xl:text-8xl font-medium text-white mb-6 tracking-[-0.02em]">
            {hotelInfo?.name || "Sky Inn Hotel"}
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed tracking-[0.02em]">
            {hotelInfo?.description ||
              "Experience luxury and comfort in the heart of Ghana. Your perfect stay awaits."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/rooms"
              className="btn-primary-white px-10 py-4 text-base"
            >
              Browse Rooms
            </Link>
            <Link
              href="/contacts"
              className="inline-flex items-center justify-center border border-white/30 text-white px-10 py-4 text-base font-medium uppercase tracking-[0.07em] transition-colors hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2" />
          </div>
        </div>
      </section>

      <section className="bg-stellar-blue text-white">
        <div className="kempinski-container py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <FaClock className="text-brand text-xl shrink-0" />
              <div>
                <p className="text-stellar-grey text-xs uppercase tracking-[0.08em] mb-1">Check-In / Check-Out</p>
                <p className="font-heading text-lg">
                  {hotelInfo?.checkInTime || "14:00"} / {hotelInfo?.checkOutTime || "12:00"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-brand text-xl shrink-0" />
              <div>
                <p className="text-stellar-grey text-xs uppercase tracking-[0.08em] mb-1">Location</p>
                <p className="font-heading text-lg">
                  {hotelInfo
                    ? `${hotelInfo.city}, ${hotelInfo.country}`
                    : "Accra, Ghana"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-brand text-xl shrink-0" />
              <div>
                <p className="text-stellar-grey text-xs uppercase tracking-[0.08em] mb-1">Reservations</p>
                <p className="font-heading text-lg">{hotelInfo?.phone || "+233 0243658631"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuredRooms.length > 0 && (
        <section className="kempinski-container py-16 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-title mb-4">Rooms & Suites</h2>
            <p className="section-subtitle mx-auto">
              Choose from our collection of thoughtfully designed accommodations, each crafted for your comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredRooms.slice(0, 6).map((room) => {
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

          <div className="text-center mt-12 md:mt-16">
            <Link href="/rooms" className="btn-primary px-10 py-4 text-base">
              Discover More
            </Link>
          </div>
        </section>
      )}

      <section className="bg-beige">
        <div className="kempinski-container py-16 md:py-24 text-center">
          <h2 className="section-title mb-4">Ready for an Unforgettable Stay?</h2>
          <p className="section-subtitle mx-auto mb-8">
            Book your room today and experience the finest hospitality Ghana has to offer.
          </p>
          <Link href="/rooms" className="btn-primary px-10 py-4 text-base">
            Book Your Stay
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
