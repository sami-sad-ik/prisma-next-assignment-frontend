interface ReviewCardProps {
  review: {
    rating: number;
    comment: string | null;
    createdAt: string;
    student: { name: string };
  };
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="border-b border-gray-100 py-6 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-gray-800">{review.student.name}</h4>
        <span className="text-xs text-gray-400">
          {new Date(review.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-gray-200"}`}>
            ★
          </span>
        ))}
      </div>

      <p className="text-gray-600 leading-relaxed">
        {review.comment || (
          <span className="italic text-gray-400">No comment provided.</span>
        )}
      </p>
    </div>
  );
};
