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
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await getClient().fetch<T>(query, params);
    } catch (error) {
      lastError = error;
      if (attempt < 3) {
        await new Promise((r) => setTimeout(r, attempt * 1000));
      }
    }
  }
  throw lastError;
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

export type SanityHotelInfo = {
  name: string;
  description: string;
  logo?: { asset?: SanityAsset };
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  checkInTime: string;
  checkOutTime: string;
};

export async function getHotelInfo() {
  return sanityFetch<SanityHotelInfo | null>(
    groq`*[_type == "hotelInfo"][0] {
      name,
      description,
      logo { asset->{ url } },
      address,
      city,
      country,
      phone,
      email,
      website,
      checkInTime,
      checkOutTime
    }`
  );
}

export type SanityFAQ = {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order?: number;
};

export async function getFAQs() {
  return sanityFetch<SanityFAQ[]>(
    groq`*[_type == "faq"] | order(order asc) {
      _id,
      question,
      answer,
      category,
      order
    }`
  );
}

export type SanityPromotion = {
  _id: string;
  title: string;
  description?: string;
  discountPercentage: number;
  code: string;
  isActive: boolean;
  validFrom?: string;
  validUntil?: string;
};

export async function getPromotionByCode(code: string) {
  return sanityFetch<SanityPromotion | null>(
    groq`*[_type == "promotion" && code == $code && isActive == true][0] {
      _id,
      title,
      description,
      discountPercentage,
      code,
      isActive,
      validFrom,
      validUntil
    }`,
    { code }
  );
}

export async function getFeaturedRooms() {
  return sanityFetch<SanityRoom[]>(
    groq`*[_type == "hotelRoom" && isFeatured == true] | order(name asc) {
      _id,
      name,
      slug,
      description,
      price,
      discount,
      coverImage { url, file { asset->{ url } } },
      type,
      NumberOfBed,
      maxGuests,
      offeredAmenities,
      isFeatured
    }`
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
