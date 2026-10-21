function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`star-icon ${filled ? "star-filled" : "star-empty"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
    </svg>
  );
}

function StarRating({ rate }: { rate: number }) {
  const rounded = Math.round(rate);
  return (
    <span className="star-rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= rounded} />
      ))}
    </span>
  );
}

export default StarRating;
