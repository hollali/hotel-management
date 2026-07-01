import Image from "next/image";
import { notFound } from "next/navigation";
import { getRoomBySlug } from "@/app/libs/sanityFetch";
import { FaBed, FaUsers, FaStar, FaCheck } from "react-icons/fa";
import BookingForm from "./BookingForm";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const RoomDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  const coverUrl = room.coverImage?.url || room.coverImage?.file?.asset?.url;

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-6">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={room.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {room.images?.slice(0, 4).map((img, i) => (
              <div key={i} className="relative h-24 w-24 md:h-32 md:w-32 rounded-lg overflow-hidden">
                <Image
                  src={img.url || img.file?.asset?.url || ""}
                  alt={`${room.name} ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{room.name}</h1>
          <div className="flex items-center space-x-6 mb-6 text-gray-600 dark:text-gray-400">
            {room.NumberOfBed && (
              <span className="flex items-center">
                <FaBed className="mr-2" />
                {room.NumberOfBed} {room.NumberOfBed > 1 ? "Beds" : "Bed"}
              </span>
            )}
            {room.maxGuests && (
              <span className="flex items-center">
                <FaUsers className="mr-2" />
                Up to {room.maxGuests} Guests
              </span>
            )}
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm capitalize">
              {room.type}
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            {room.description}
          </p>

          {room.SpecialNote && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                {room.SpecialNote}
              </p>
            </div>
          )}

          {room.offeredAmenities && room.offeredAmenities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {room.offeredAmenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
                  >
                    <FaCheck className="text-green-500 text-sm" />
                    <span>{amenity.amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {room.reviews && room.reviews.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Reviews ({room.reviews.length})
              </h2>
              <div className="space-y-4">
                {room.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{review.guestName}</span>
                      <div className="flex items-center">
                        {Array.from({ length: review.userRating }).map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-sm" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-bold text-primary">
                  GHS {room.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">/night</span>
              </div>
              {room.discount > 0 && (
                <p className="text-sm text-green-600 mt-1">
                  {room.discount}% discount available
                </p>
              )}
            </div>

            <BookingForm room={room} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetailPage;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) return { title: "Room Not Found" };
  return {
    title: `${room.name} - Sky Inn Hotel`,
    description: room.description,
  };
}
