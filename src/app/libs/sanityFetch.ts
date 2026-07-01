import { createClient, type QueryParams } from "@sanity/client";
import groq from "groq";

function getClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
  }
  return createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    useCdn: process.env.NODE_ENV === "production",
    apiVersion: "2024-01-01",
  });
}

export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  return getClient().fetch<T>(query, params);
}

export { groq };

export async function getRooms() {
  return sanityFetch<SanityRoom[]>(
    groq`*[_type == "hotelRoom"] | order(name asc) {
      _id,
      name,
      slug,
      description,
      price,
      discount,
      coverImage { url, file { asset->{ url } } },
      type,
      dimension,
      NumberOfBed,
      maxGuests,
      offeredAmenities,
      isFeatured,
      "reviews": *[_type == "review" && references(^._id)]
    }`
  );
}

export async function getRoomBySlug(slug: string) {
  return sanityFetch<SanityRoom | null>(
    groq`*[_type == "hotelRoom" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      description,
      price,
      discount,
      images[] { url, file { asset->{ url } } },
      coverImage { url, file { asset->{ url } } },
      type,
      SpecialNote,
      dimension,
      NumberOfBed,
      maxGuests,
      offeredAmenities,
      isFeatured,
      "reviews": *[_type == "review" && references(^._id)]
    }`,
    { slug }
  );
}

export type SanityAsset = {
  url: string;
};

export type SanityRoom = {
  _id: string;
  name: string;
  slug: { current: string };
  description: string;
  price: number;
  discount: number;
  images?: { url?: string; file?: { asset?: SanityAsset } }[];
  coverImage: { url?: string; file?: { asset?: SanityAsset } };
  type: "basic" | "luxury" | "suite";
  SpecialNote?: string;
  dimension?: string;
  NumberOfBed?: number;
  maxGuests?: number;
  offeredAmenities?: { icon?: string; amenity?: string }[];
  isFeatured?: boolean;
  reviews?: {
    _id: string;
    guestName: string;
    text: string;
    userRating: number;
  }[];
};
