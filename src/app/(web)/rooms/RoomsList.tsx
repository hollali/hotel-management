"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBed, FaUsers, FaSearch, FaSlidersH, FaTimes } from "react-icons/fa";
import type { SanityRoom } from "@/app/libs/sanityFetch";

const RoomsList = ({ rooms }: { rooms: SanityRoom[] }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const hasActiveFilters = typeFilter !== "all" || maxPrice !== "" || sortBy !== "name";

  const clearFilters = () => {
    setTypeFilter("all");
    setMaxPrice("");
    setSortBy("name");
  };

  const filtered = useMemo(() => {
    let result = [...rooms];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((r) => r.type === typeFilter);
    }

    if (maxPrice) {
      const price = Number(maxPrice);
      result = result.filter((r) => {
        const effectivePrice =
          r.discount > 0
            ? Math.round(r.price * (1 - r.discount / 100))
            : r.price;
        return effectivePrice <= price;
      });
    }

    result.sort((a, b) => {
      const aPrice =
        a.discount > 0 ? Math.round(a.price * (1 - a.discount / 100)) : a.price;
      const bPrice =
        b.discount > 0 ? Math.round(b.price * (1 - b.discount / 100)) : b.price;
      if (sortBy === "price_asc") return aPrice - bPrice;
      if (sortBy === "price_desc") return bPrice - aPrice;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [rooms, search, typeFilter, maxPrice, sortBy]);

  return (
    <section className="kempinski-container pt-28 pb-16 md:pb-24">
      <div className="text-center mb-12 md:mb-16">
        <h1 className="section-title mb-4">Rooms & Suites</h1>
        <p className="section-subtitle mx-auto">
          Experience luxury and comfort in our carefully curated rooms and suites.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative flex items-center border border-stellar-light-grey bg-white rounded-full transition-colors focus-within:border-brand">
          <FaSearch className="absolute left-5 text-stellar-grey text-sm icon-pulse" />
          <input
            type="text"
            placeholder="Search rooms by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-4 pl-12 pr-14 bg-transparent text-stellar-blue placeholder:text-stellar-grey/60 text-sm tracking-wide focus:outline-none rounded-full"
          />
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`absolute right-2 flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-[0.08em] font-medium rounded-full transition-all duration-300 ${
              filtersOpen || hasActiveFilters
                ? "bg-stellar-blue text-white"
                : "bg-beige text-stellar-blue hover:bg-brand hover:text-white"
            }`}
            aria-label="Toggle filters"
          >
            <FaSlidersH className={`text-[10px] transition-transform duration-300 ${filtersOpen ? "rotate-90" : ""}`} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      <div
        className={`max-w-3xl mx-auto overflow-hidden transition-all duration-300 ease-in-out ${
          filtersOpen ? "max-h-60 opacity-100 mb-8" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-wrap items-center gap-4 p-5 border border-stellar-light-grey bg-beige/40 rounded-2xl">
          <div className="flex items-center gap-2 flex-1 min-w-[160px]">
            <label className="text-xs uppercase tracking-[0.08em] text-stellar-grey whitespace-nowrap">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex-1 border border-stellar-light-grey px-3 py-2.5 bg-white text-stellar-blue text-sm focus:outline-none focus:border-brand appearance-none cursor-pointer rounded-full"
            >
              <option value="all">All</option>
              <option value="basic">Basic</option>
              <option value="luxury">Luxury</option>
              <option value="suite">Suite</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-1 min-w-[160px]">
            <label className="text-xs uppercase tracking-[0.08em] text-stellar-grey whitespace-nowrap">
              Max Price
            </label>
            <input
              type="number"
              placeholder="GHS"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="flex-1 border border-stellar-light-grey px-3 py-2.5 bg-white text-stellar-blue text-sm focus:outline-none focus:border-brand rounded-full"
            />
          </div>

          <div className="flex items-center gap-2 flex-1 min-w-[160px]">
            <label className="text-xs uppercase tracking-[0.08em] text-stellar-grey whitespace-nowrap">
              Sort
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 border border-stellar-light-grey px-3 py-2.5 bg-white text-stellar-blue text-sm focus:outline-none focus:border-brand appearance-none cursor-pointer rounded-full"
            >
              <option value="name">Name</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2.5 text-xs uppercase tracking-[0.08em] text-stellar-grey hover:text-brand transition-colors rounded-full"
            >
              <FaTimes className="text-[10px] icon-hover" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-stellar-grey mb-6 max-w-3xl mx-auto">
        {filtered.length} {filtered.length === 1 ? "room" : "rooms"} found
      </p>

      {/* Room Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filtered.map((room) => {
          const coverUrl =
            room.coverImage?.url || room.coverImage?.file?.asset?.url;

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
                      {room.NumberOfBed}{" "}
                      {room.NumberOfBed > 1 ? "Beds" : "Bed"}
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
                          GHS{" "}
                          {Math.round(
                            room.price * (1 - room.discount / 100)
                          )}
                        </span>
                        <span className="text-xs text-stellar-grey ml-1">
                          /night
                        </span>
                        <span className="block text-xs line-through text-stellar-grey">
                          GHS {room.price}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="font-heading text-xl font-medium text-stellar-blue">
                          GHS {room.price}
                        </span>
                        <span className="text-xs text-stellar-grey ml-1">
                          /night
                        </span>
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

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-stellar-grey text-lg">
            No rooms match your filters.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 text-sm text-brand hover:text-stellar-blue uppercase tracking-[0.07em] transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default RoomsList;
