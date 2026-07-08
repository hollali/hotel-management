"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { submitReview } from "@/actions/reviews";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import * as Sentry from "@sentry/nextjs";

type Props = {
  roomId: string;
  roomName: string;
};

const ReviewForm = ({ roomId, roomName }: Props) => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      router.push("/auth");
      return;
    }

    setLoading(true);
    try {
      await submitReview({
        roomId,
        roomName,
        guestName: "Guest",
        text,
        userRating: rating,
      });
      toast.success("Review submitted!");
      setText("");
      setRating(5);
    } catch (error) {
      Sentry.captureException(error);
      toast.error(error instanceof Error ? error.message : "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="font-heading text-xl font-medium mb-4 text-stellar-blue">Write a Review</h2>
      <form onSubmit={handleSubmit} className="bg-beige p-5 space-y-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="text-2xl transition-colors"
            >
              <FaStar
                className={
                  (hover || rating) >= star
                    ? "text-brand"
                    : "text-stellar-light-grey"
                }
              />
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience..."
          rows={4}
          required
          className="w-full border border-stellar-light-grey px-4 py-3 bg-white text-stellar-blue focus:outline-none focus:border-brand transition-colors text-sm resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary px-6 py-2 text-sm"
        >
          {loading ? "Submitting..." : isSignedIn ? "Submit Review" : "Sign In to Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
