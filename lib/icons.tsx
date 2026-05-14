/**
 * Capa de abstracción de iconos del proyecto.
 * Todos los iconos son SVG inline, estilo lineal (stroke, sin fill).
 * Para cambiar de librería, editar SOLO este archivo.
 */

// Atributos SVG comunes reutilizados en todos los iconos
const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const BrainIcon = () => (
  <svg {...svgProps}>
    {/* Hemisferio izquierdo del cerebro */}
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a3.5 3.5 0 0 1-6.84-1.045A3.5 3.5 0 0 1 2 16.5a3.46 3.46 0 0 1 2.025-3.183A4 4 0 1 1 9.5 2Z" />
    {/* Hemisferio derecho del cerebro */}
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a3.5 3.5 0 0 0 6.84-1.045A3.5 3.5 0 0 0 22 16.5a3.46 3.46 0 0 0-2.025-3.183A4 4 0 1 0 14.5 2Z" />
  </svg>
);

export const BookIcon = () => (
  <svg {...svgProps}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    {/* Línea divisoria central del libro */}
    <path d="M12 2v15" />
  </svg>
);

export const SpeechIcon = () => (
  <svg {...svgProps}>
    {/* Burbuja de conversación */}
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
  </svg>
);

export const LeafIcon = () => (
  <svg {...svgProps}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    {/* Tallo */}
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

export const PuzzleIcon = () => (
  <svg {...svgProps}>
    {/* Pieza de rompecabezas simplificada */}
    <path d="M4 7h3a1 1 0 0 0 1-1V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v6a1 1 0 0 0-1 1h-2a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1z" />
  </svg>
);

export const TargetIcon = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const PhoneIcon = () => (
  <svg {...svgProps}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.91a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" />
  </svg>
);

export const MapPinIcon = () => (
  <svg {...svgProps}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const MailIcon = () => (
  <svg {...svgProps}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const StarIcon = () => (
  <svg {...svgProps}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const ChevronRightIcon = () => (
  <svg {...svgProps}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const CheckIcon = () => (
  <svg {...svgProps}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const ArrowRightIcon = () => (
  <svg {...svgProps}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const MenuIcon = () => (
  <svg {...svgProps}>
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export const CloseIcon = () => (
  <svg {...svgProps}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const WhatsappIcon = () => (
  <svg {...svgProps}>
    {/* Burbuja de WhatsApp con teléfono */}
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const InstagramIcon = () => (
  <svg {...svgProps}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    {/* Punto de la cámara */}
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const FacebookIcon = () => (
  <svg {...svgProps}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const YoutubeIcon = () => (
  <svg {...svgProps}>
    <path d="M22 12s0-3.2-.41-4.74a2.95 2.95 0 0 0-2.08-2.08C17.99 4.77 12 4.77 12 4.77s-5.99 0-7.51.41A2.95 2.95 0 0 0 2.41 7.26C2 8.8 2 12 2 12s0 3.2.41 4.74a2.95 2.95 0 0 0 2.08 2.08c1.52.41 7.51.41 7.51.41s5.99 0 7.51-.41a2.95 2.95 0 0 0 2.08-2.08C22 15.2 22 12 22 12Z" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

export const TiktokIcon = () => (
  <svg {...svgProps}>
    <path d="M14 3c.4 2.2 1.72 3.52 4 3.9" />
    <path d="M10 11.5a4.5 4.5 0 1 0 4.5 4.5V3" />
  </svg>
);

export const GlobeIcon = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
  </svg>
);

export const ChevronUpIcon = () => (
  <svg {...svgProps}>
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export const ClockIcon = () => (
  <svg {...svgProps}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const LightBulbIcon = () => (
  <svg {...svgProps}>
    <path d="M9 21h6" />
    <path d="M12 3a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V17H9v-2.8A6 6 0 0 1 6 9a6 6 0 0 1 6-6Z" />
    <path d="M9 17h6" />
  </svg>
);

export const QuoteIcon = () => (
  <svg {...svgProps}>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
  </svg>
);

/**
 * Mapa de todos los iconos disponibles.
 * El átomo Icon lo usa para resolver el nombre → componente.
 */
export const icons = {
  BrainIcon,
  BookIcon,
  SpeechIcon,
  LeafIcon,
  PuzzleIcon,
  TargetIcon,
  PhoneIcon,
  MapPinIcon,
  MailIcon,
  StarIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CheckIcon,
  ArrowRightIcon,
  MenuIcon,
  CloseIcon,
  WhatsappIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  TiktokIcon,
  GlobeIcon,
  ClockIcon,
  LightBulbIcon,
  QuoteIcon,
} as const;

export type IconName = keyof typeof icons;
