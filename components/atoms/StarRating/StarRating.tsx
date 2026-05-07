import type { StarRatingProps } from './StarRating.types';

// SVG de estrella rellena (filled) usando tokens de marca
function StarFilled() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#FAB600"
      stroke="#FAB600"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// SVG de estrella vacía
function StarEmpty() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FAB600"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 opacity-40"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function StarRating({ value, max = 5 }: StarRatingProps) {
  const clamped = Math.min(Math.max(Math.round(value), 0), max);

  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${clamped} de ${max} estrellas`}
    >
      {Array.from({ length: max }, (_, i) =>
        i < clamped ? <StarFilled key={i} /> : <StarEmpty key={i} />,
      )}
    </div>
  );
}
