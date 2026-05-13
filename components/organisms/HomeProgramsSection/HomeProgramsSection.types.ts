import type { ProgramListCardProps } from '@/components/molecules/ProgramListCard'

export interface HomeProgramsSectionProps {
  pretitulo?: string | null
  titulo: string
  parrafo?: string | null
  programas: ProgramListCardProps[]
  botonLabel?: string | null
  botonHref?: string | null
}
