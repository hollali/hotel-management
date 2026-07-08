import Image from "next/image";
import { notFound } from "next/navigation";
import { getRoomBySlug } from "@/app/libs/sanityFetch";
import { getRoomReviews } from "@/actions/reviews";
import { FaBed, FaUsers, FaStar, FaCheck } from "react-icons/fa";
import BookingForm from "./BookingForm";
import ReviewForm from "./ReviewForm";

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
  const dbReviews = await getRoomReviews(room._id);
  const allReviews = [...(room.reviews || []), ...dbReviews];

  return (
    <section className="kempinski-container pt-28 pb-16 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <div className="lg:col-span-2">
          <div className="relative h-[400px] md:h-[500px] overflow-hidden mb-6">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={room.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-beige flex items-center justify-center">
                <span className="text-stellar-grey">No Image</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {room.images?.slice(0, 4).map((img, i) => (
              <div key={i} className="relative h-24 w-24 md:h-28 md:w-28 overflow-hidden">
                <Image
                  src={img.url || img.file?.asset?.url || ""}
                  alt={`${room.name} ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <h1 className="font-heading text-3xl md:text-4xl xl:text-5xl font-medium mb-4 text-stellar-blue">
            {room.name}
          </h1>
          <div className="flex items-center flex-wrap gap-4 md:gap-6 mb-6 text-sm text-stellar-grey">
            {room.NumberOfBed && (
              <span className="flex items-center gap-2">
                <FaBed className="text-brand" />
                {room.NumberOfBed} {room.NumberOfBed > 1 ? "Beds" : "Bed"}
              </span>
            )}
            {room.maxGuests && (
              <span className="flex items-center gap-2">
                <FaUsers className="text-brand" />
                Up to {room.maxGuests} Guests
              </span>
            )}
            <span className="px-3 py-1 bg-beige text-stellar-grey text-xs uppercase tracking-[0.08em]">
              {room.type}
            </span>
          </div>

          <p className="text-stellar-grey mb-8 leading-relaxed text-base md:text-lg">
            {room.description}
          </p>

          {room.SpecialNote && (
            <div className="bg-beige border-l-4 border-brand p-4 mb-8">
              <p className="text-sm text-stellar-blue">
                {room.SpecialNote}
              </p>
            </div>
          )}

          {room.offeredAmenities && room.offeredAmenities.length > 0 && (
            <div className="mb-8">
              <h2 className="font-heading text-xl font-medium mb-4 text-stellar-blue">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {room.offeredAmenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-stellar-grey"
                  >
                    <FaCheck className="text-brand text-xs" />
                    <span>{amenity.amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {allReviews.length > 0 && (
            <div className="mb-8">
              <h2 className="font-heading text-xl font-medium mb-4 text-stellar-blue">
                Reviews ({allReviews.length})
              </h2>
              <div className="space-y-4">
                {allReviews.map((review, i) => (
                  <div
                    key={"guestName" in review ? review.id || i : review._id}
                    className="bg-beige p-5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-stellar-blue text-sm">{review.guestName}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.userRating }).map((_, s) => (
                          <FaStar key={s} className="text-brand text-sm" />
                        ))}
                      </div>
                    </div>
                    <p className="text-stellar-grey text-sm leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <ReviewForm roomId={room._id} roomName={room.name} />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white p-6 md:p-8 border border-stellar-light-grey">
            <div className="mb-6 pb-6 border-b border-stellar-light-grey">
              <div className="flex items-baseline justify-between">
                <span className="font-heading text-3xl font-medium text-stellar-blue">
                  GHS {room.price}
                </span>
                <span className="text-stellar-grey text-sm">/night</span>
              </div>
              {room.discount > 0 && (
                <p className="text-sm text-brand mt-1">
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
