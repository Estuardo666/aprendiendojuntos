import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { cn } from '@/lib/utils/cn'
import type { HomeSectionHeaderProps } from './HomeSectionHeader.types'

export function HomeSectionHeader({
  pretitulo,
  titulo,
  parrafo,
  align = 'center',
  className,
}: HomeSectionHeaderProps) {
  return (
    <div className={cn(align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      {pretitulo && (
        <span className="pretitulo">{pretitulo}</span>
      )}
      <Heading
        as="h2"
        variant="h2"
        animate={true}
        className={cn(
          'mt-4 text-[clamp(2.45rem,4.8vw,3em)] leading-[0.92] tracking-[-0.06em] text-brand-azul',
          align === 'center' && 'mx-auto max-w-[40rem]',
        )}
      >
        {titulo}
      </Heading>
      {parrafo && (
        <Text
          variant="body"
          className={cn(
            'mt-5 text-[clamp(1.02rem,1.35vw,1.18rem)] leading-[1.32] text-brand-texto',
            align === 'center' && 'mx-auto max-w-[42rem]',
          )}
        >
          {parrafo}
        </Text>
      )}
    </div>
  )
}
