export interface LogoMarqueeItem {
  src: string
  alt: string
}

export interface LogoMarqueeProps {
  title: string
  logos: LogoMarqueeItem[]
  direction?: 'left' | 'right'
}
