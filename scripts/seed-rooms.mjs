import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "w5cuzufz",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skYSVq9ViUOT9Vx30ZPyhs156B7yJTcaZwxFJotVFwDsK8VRKon4YJw01KCUBfPXR8aykRoftwtSEKMrvVYxIPz8VxLDr0NkCc0HaHf7qSN25BNL36PXr8G6aJnsA1R8h0Pb40HCuO9oLM2FpnucKI5RJsPTCxWFRZAzJcR7dbkiBMFRaxLa",
  useCdn: false,
});

const rooms = [
  {
    _type: "hotelRoom",
    name: "Standard Single Room",
    slug: { _type: "slug", current: "standard-single-room" },
    description:
      "A cozy and comfortable room perfect for solo travelers. Features a plush single bed, modern amenities, and a warm ambiance that makes you feel right at home. Ideal for business trips or weekend getaways.",
    price: 800,
    discount: 0,
    type: "basic",
    SpecialNote:
      "Check-in time is 2:00 PM, checkout time is 12:00 PM. Complimentary breakfast included for single occupancy.",
    dimension: "22 sqm",
    NumberOfBed: 1,
    maxGuests: 1,
    isFeatured: false,
    coverImage: {
      _type: "image",
      url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    },
    images: [
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      },
    ],
    offeredAmenities: [
      { icon: "FaWifi", amenity: "Free Wi-Fi" },
      { icon: "FaTv", amenity: "Flat Screen TV" },
      { icon: "FaSnowflake", amenity: "Air Conditioning" },
      { icon: "FaCoffee", amenity: "Tea & Coffee Maker" },
    ],
  },
  {
    _type: "hotelRoom",
    name: "Standard Double Room",
    slug: { _type: "slug", current: "standard-double-room" },
    description:
      "A spacious room with a comfortable double bed, perfect for couples or friends traveling together. Enjoy modern decor, ambient lighting, and all the essentials for a relaxing stay.",
    price: 1200,
    discount: 10,
    type: "basic",
    SpecialNote:
      "Check-in time is 2:00 PM, checkout time is 12:00 PM. Late checkout available upon request.",
    dimension: "28 sqm",
    NumberOfBed: 1,
    maxGuests: 2,
    isFeatured: true,
    coverImage: {
      _type: "image",
      url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    },
    images: [
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      },
    ],
    offeredAmenities: [
      { icon: "FaWifi", amenity: "Free Wi-Fi" },
      { icon: "FaTv", amenity: "Flat Screen TV" },
      { icon: "FaSnowflake", amenity: "Air Conditioning" },
      { icon: "FaCoffee", amenity: "Tea & Coffee Maker" },
      { icon: "FaBath", amenity: "Private Bathroom" },
    ],
  },
  {
    _type: "hotelRoom",
    name: "Deluxe Twin Room",
    slug: { _type: "slug", current: "deluxe-twin-room" },
    description:
      "Generously sized room featuring two comfortable twin beds. Perfect for friends or colleagues sharing. Includes a work desk, spacious wardrobe, and premium bathroom amenities.",
    price: 1500,
    discount: 0,
    type: "luxury",
    SpecialNote:
      "Check-in time is 2:00 PM, checkout time is 12:00 PM. Complimentary airport shuttle for stays of 3 nights or more.",
    dimension: "32 sqm",
    NumberOfBed: 2,
    maxGuests: 2,
    isFeatured: false,
    coverImage: {
      _type: "image",
      url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    },
    images: [
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      },
    ],
    offeredAmenities: [
      { icon: "FaWifi", amenity: "Free Wi-Fi" },
      { icon: "FaTv", amenity: "55-Inch Smart TV" },
      { icon: "FaSnowflake", amenity: "Air Conditioning" },
      { icon: "FaCoffee", amenity: "Nespresso Machine" },
      { icon: "FaBath", amenity: "Rainfall Shower" },
      { icon: "FaConcierge", amenity: "Concierge Service" },
    ],
  },
  {
    _type: "hotelRoom",
    name: "Executive King Room",
    slug: { _type: "slug", current: "executive-king-room" },
    description:
      "An elegant executive room with a king-size bed, premium linens, and panoramic city views. Features a dedicated work area, luxury bathroom with soaking tub, and exclusive lounge access.",
    price: 2200,
    discount: 15,
    type: "luxury",
    SpecialNote:
      "Check-in time is 2:00 PM, checkout time is 12:00 PM. Includes complimentary breakfast and evening cocktails at the Executive Lounge.",
    dimension: "38 sqm",
    NumberOfBed: 1,
    maxGuests: 2,
    isFeatured: true,
    coverImage: {
      _type: "image",
      url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    },
    images: [
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      },
    ],
    offeredAmenities: [
      { icon: "FaWifi", amenity: "High-Speed Wi-Fi" },
      { icon: "FaTv", amenity: "65-Inch OLED TV" },
      { icon: "FaSnowflake", amenity: "Climate Control" },
      { icon: "FaCoffee", amenity: "Premium Mini Bar" },
      { icon: "FaBath", amenity: "Soaking Tub & Rain Shower" },
      { icon: "FaConcierge", amenity: "24/7 Concierge" },
      { icon: "FaUtensils", amenity: "Room Service" },
    ],
  },
  {
    _type: "hotelRoom",
    name: "Family Suite",
    slug: { _type: "slug", current: "family-suite" },
    description:
      "A spacious suite designed for families, featuring a master bedroom with king bed and a separate living area with sofa beds. Includes a mini kitchen, children's play area, and stunning pool views.",
    price: 3000,
    discount: 0,
    type: "suite",
    SpecialNote:
      "Check-in time is 2:00 PM, checkout time is 12:00 PM. Children under 12 stay free. Crib available on request.",
    dimension: "55 sqm",
    NumberOfBed: 3,
    maxGuests: 5,
    isFeatured: true,
    coverImage: {
      _type: "image",
      url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
    },
    images: [
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      },
    ],
    offeredAmenities: [
      { icon: "FaWifi", amenity: "Free Wi-Fi" },
      { icon: "FaTv", amenity: "Two Smart TVs" },
      { icon: "FaSnowflake", amenity: "Air Conditioning" },
      { icon: "FaCoffee", amenity: "Mini Kitchen" },
      { icon: "FaBath", amenity: "Two Bathrooms" },
      { icon: "FaShower", amenity: "Bathtub" },
      { icon: "FaUtensils", amenity: "Room Service" },
    ],
  },
  {
    _type: "hotelRoom",
    name: "Honeymoon Suite",
    slug: { _type: "slug", current: "honeymoon-suite" },
    description:
      "A romantic retreat featuring a luxurious king bed, private balcony with breathtaking views, jacuzzi tub, and champagne on arrival. Perfect for couples celebrating special occasions.",
    price: 3500,
    discount: 5,
    type: "suite",
    SpecialNote:
      "Check-in time is 2:00 PM, checkout time is 12:00 PM. Complimentary champagne, flowers, and late checkout for honeymoon guests.",
    dimension: "48 sqm",
    NumberOfBed: 1,
    maxGuests: 2,
    isFeatured: true,
    coverImage: {
      _type: "image",
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    },
    images: [
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      },
    ],
    offeredAmenities: [
      { icon: "FaWifi", amenity: "Free Wi-Fi" },
      { icon: "FaTv", amenity: "75-Inch Smart TV" },
      { icon: "FaSnowflake", amenity: "Climate Control" },
      { icon: "FaCoffee", amenity: "Premium Mini Bar" },
      { icon: "FaBath", amenity: "Jacuzzi Tub" },
      { icon: "FaUmbrellaBeach", amenity: "Private Balcony" },
      { icon: "FaConcierge", amenity: "Butler Service" },
    ],
  },
  {
    _type: "hotelRoom",
    name: "Presidential Suite",
    slug: { _type: "slug", current: "presidential-suite" },
    description:
      "The crown jewel of Sky Inn Hotel. A magnificent suite with separate living and dining areas, panoramic floor-to-ceiling windows, private study, and a fully stocked premium bar. Experience unmatched luxury and personalized service.",
    price: 5500,
    discount: 0,
    type: "suite",
    SpecialNote:
      "Check-in time is 2:00 PM, checkout time is 12:00 PM. Includes personal butler, airport limousine transfer, and access to all hotel facilities.",
    dimension: "95 sqm",
    NumberOfBed: 2,
    maxGuests: 4,
    isFeatured: true,
    coverImage: {
      _type: "image",
      url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    },
    images: [
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      },
      {
        _type: "image",
        url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      },
    ],
    offeredAmenities: [
      { icon: "FaWifi", amenity: "Dedicated High-Speed Wi-Fi" },
      { icon: "FaTv", amenity: "Multiple 85-Inch TVs" },
      { icon: "FaSnowflake", amenity: "Smart Climate Control" },
      { icon: "FaCoffee", amenity: "Full Premium Bar" },
      { icon: "FaBath", amenity: "Marble Bathroom & Jacuzzi" },
      { icon: "FaUmbrellaBeach", amenity: "Wraparound Balcony" },
      { icon: "FaConcierge", amenity: "Personal Butler" },
      { icon: "FaUtensils", amenity: "Private Chef on Request" },
      { icon: "FaSpa", amenity: "In-Suite Spa Treatments" },
    ],
  },
];

async function seed() {
  console.log("Clearing existing hotel rooms...");
  const existing = await client.fetch('*[_type == "hotelRoom"]{_id}');
  if (existing.length > 0) {
    const tx = client.transaction();
    existing.forEach((doc) => tx.delete(doc._id));
    await tx.commit();
    console.log(`Deleted ${existing.length} existing rooms.`);
  }

  console.log(`Creating ${rooms.length} hotel rooms...`);
  const tx = client.transaction();
  rooms.forEach((room) => tx.create(room));
  const result = await tx.commit();
  console.log(`Done! Created ${rooms.length} rooms.`);
  console.log("Document IDs:", result.results.map((r) => r.id).join(", "));
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
