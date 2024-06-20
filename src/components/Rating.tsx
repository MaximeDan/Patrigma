import React from "react";
import { Icons } from "./Icons";

type RatingProps = {
  rating: number;
  ratingCount: number;
};

const Rating = ({ rating, ratingCount }: RatingProps) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  // Générer le tableau des étoiles à afficher
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Icons.fullStar className="size-4" key={i} />);
  }

  for (let i = 0; i < halfStars; i++) {
    stars.push(<Icons.halfStar className="size-4" key={i} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Icons.emptyStar className="size-4" key={i} />);
  }
  return (
    <div className="mb-3 mt-1 flex items-start">
      {stars}
      <p className="ml-1 text-[12px] text-beige-600">{`(${ratingCount} avis)`}</p>
    </div>
  );
};

export default Rating;
