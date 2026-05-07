export interface FAQItemProps {
  pregunta: string;
  respuesta: string;
  /** Estado controlado del accordion */
  isOpen: boolean;
  /** Handler para alternar estado */
  onToggle: () => void;
}
