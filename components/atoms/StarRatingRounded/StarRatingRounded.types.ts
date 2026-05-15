export interface StarRatingRoundedProps {
  /** Valor actual (1-5) */
  value: number;
  /** Máximo de estrellas. Default: 5 */
  max?: number;
  /** Animación pop-in secuencial */
  animated?: boolean;
  /** Delay entre cada estrella en segundos. Default: 0.1 */
  staggerDelay?: number;
}
