"use client";
import { useEffect, useState } from "react";
import { ReviewCard } from "@/components/ReviewCard";
import { getTutorReviews } from "@/app/modules/review.service";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  student: { name: string };
}

export default function TutorReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGet = async () => {
      try {
        const res = await getTutorReviews();
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to load reviews", err);
      } finally {
        setLoading(false);
      }
    };
    handleGet();
  }, []);

  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(
        1,
      )
    : "0.0";

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">Loading feedback...</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Student Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Rating Summary Box */}
        <div className="bg-blue-50 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
          <span className="text-5xl font-black text-blue-700">{average}</span>
          <div className="text-yellow-500 text-xl my-2">
            {"★".repeat(Math.floor(Number(average)))}
            {Number(average) % 1 !== 0 && "☆"}
          </div>
          <p className="text-blue-600 font-medium text-sm">Average Rating</p>
          <p className="text-gray-400 text-xs mt-1">
            {reviews.length} total reviews
          </p>
        </div>

        {/* Review List Section */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {reviews.length > 0 ? (
            reviews.map((item) => <ReviewCard key={item.id} review={item} />)
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p>No reviews found yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
