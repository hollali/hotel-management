"use client";

import { useState } from "react";
import { toggleAvailability } from "@/actions/availability";
import toast from "react-hot-toast";

type Props = {
  roomId: string;
  availability: { date: string; isAvailable: boolean }[];
};

const AvailabilityGrid = ({ roomId, availability }: Props) => {
  const today = new Date();
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const availabilitySet = new Map(
    availability.map((a) => [a.date, a.isAvailable])
  );

  const [local, setLocal] = useState<Map<string, boolean>>(
    new Map(days.map((d) => [d, availabilitySet.get(d) ?? true]))
  );

  const handleToggle = async (date: string) => {
    const current = local.get(date) ?? true;
    setLocal(new Map(local).set(date, !current));
    try {
      await toggleAvailability(roomId, date, !current);
      toast.success(`${date}: ${!current ? "Available" : "Blocked"}`);
    } catch {
      setLocal(new Map(local).set(date, current));
      toast.error("Failed to update");
    }
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((date) => {
        const d = new Date(date);
        const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
        const dayNum = d.getDate();
        const isAvailable = local.get(date) ?? true;
        const isPast = d <= today;

        return (
          <button
            key={date}
            onClick={() => handleToggle(date)}
            disabled={isPast}
            className={`flex flex-col items-center p-2 text-xs border transition-colors ${
              isPast
                ? "border-stellar-light-grey bg-beige/50 text-stellar-grey cursor-not-allowed"
                : isAvailable
                  ? "border-green-300 bg-green-50 text-green-700 hover:bg-green-100 cursor-pointer"
                  : "border-red-300 bg-red-50 text-red-700 hover:bg-red-100 cursor-pointer"
            }`}
            title={isPast ? "Past date" : isAvailable ? "Click to block" : "Click to unblock"}
          >
            <span className="font-medium">{dayName}</span>
            <span className="text-lg font-heading">{dayNum}</span>
            <span className="text-[10px] mt-0.5">
              {isPast ? "—" : isAvailable ? "Open" : "Blocked"}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default AvailabilityGrid;
