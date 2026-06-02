'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { ServiceFilterPills } from '@/components/molecules/ServiceFilterPills'
import { stripHtml } from '@/lib/utils/stripHtml'
import type { ArticulosGridProps, ArticuloGridItem } from './ArticulosGrid.types'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ArticulosGrid({ items }: ArticulosGridProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filters = useMemo(() => {
    const map = new Map<string, string>()
    items.forEach((item) => {
      if (item.categoriaSlug && item.categoria) {
        map.set(item.categoriaSlug, item.categoria)
      }
    })
    return Array.from(map.entries()).map(([slug, label]) => ({ slug, label }))
  }, [items])

  const filteredItems = useMemo(() => {
    if (!activeFilter) return items
    return items.filter((item) => item.categoriaSlug === activeFilter)
  }, [items, activeFilter])

  return (
    <section className="px-4 pb-16 pt-6 sm:px-6 md:pb-24 md:pt-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Filtros */}
        {filters.length > 0 && (
          <div className="mb-10">
            <ServiceFilterPills
              filters={filters}
              activeFilter={activeFilter}
              onSelect={setActiveFilter}
              allLabel="Todos"
            />
          </div>
        )}

        {/* Grid: 2 por fila */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeFilter ?? 'all'}
          className="grid gap-6 sm:grid-cols-2"
        >
          {filteredItems.map((item) => (
            <motion.div key={item.id} variants={cardVariants}>
              <ArticuloCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ArticuloCard({ item }: { item: ArticuloGridItem }) {
  const cleanExcerpt = stripHtml(item.excerpt)

  return (
    <Link
      href={`/articulos/${item.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2.25rem] bg-brand-blanco p-3 transition-all duration-500 ease-out hover:scale-[1.025] shadow-sm"
    >
      {/* Imagen arriba */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.85rem]">
        {item.imagenSrc ? (
          <Image
            src={item.imagenSrc}
            alt={item.imagenAlt ?? item.titulo}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full bg-brand-celeste/20" />
        )}
      </div>

      {/* Contenido abajo */}
      <div className="flex flex-1 flex-col p-3">
        <div className="flex items-center gap-3">
          {item.categoria && (
            <span className="self-start rounded-full bg-brand-celeste/15 px-[0.6rem] py-2 font-body text-[0.77rem] font-medium leading-none text-brand-celeste">
              {item.categoria}
            </span>
          )}
          <span className="font-body text-[0.77rem] text-[#253a44]/60">
            {formatDate(item.fecha)}
          </span>
        </div>

        <Heading
          as="h3"
          variant="h3"
          className="mt-3 text-[1.75rem] font-bold leading-[1.05] text-brand-celeste font-body transition-colors duration-300 group-hover:text-brand-azul"
        >
          {item.titulo}
        </Heading>

        <Text
          variant="small"
          className="mt-3 flex-1 text-[#253a44]/80 line-clamp-3 text-[0.96rem] leading-[1.35]"
        >
          {cleanExcerpt}
        </Text>

        {/* Botón Ver más */}
        <div className="mt-4 flex items-center gap-2 font-body text-sm font-semibold text-brand-celeste transition-colors duration-300 group-hover:text-brand-azul">
          <span>Ver más</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
