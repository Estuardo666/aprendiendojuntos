export type DividerColor = 'naranja' | 'azul' | 'celeste' | 'default';

export interface DividerProps {
  color?: DividerColor;
  /** Grosor del trazo SVG. Default: 2.5 */
  strokeWidth?: number;
  className?: string;
}
