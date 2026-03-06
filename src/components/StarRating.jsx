import { Star } from "lucide-react";

const StarRating = ({ rating, onRate, size = 20 }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`cursor-pointer transition ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-gray-300"
          }`}
          onClick={() => onRate && onRate(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
