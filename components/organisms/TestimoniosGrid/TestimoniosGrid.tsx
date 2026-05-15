'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ServiceFilterPills } from '@/components/molecules/ServiceFilterPills'
import { TestimonioCard } from '@/components/molecules/TestimonioCard'
import { TestimonialPopup } from '@/components/molecules/TestimonialPopup'
import type { TestimoniosGridProps, TestimonioGridItem } from './TestimoniosGrid.types'

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

export function TestimoniosGrid({ items }: TestimoniosGridProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<TestimonioGridItem | null>(null)
  const [origin, setOrigin] = useState({ x: 0, y: 0 })

  const filters = useMemo(() => {
    const map = new Map<string, string>()
    items.forEach((item) => {
      if (item.servicioSlug && item.servicioNombre) {
        map.set(item.servicioSlug, item.servicioNombre)
      }
    })
    return Array.from(map.entries()).map(([slug, label]) => ({ slug, label }))
  }, [items])

  const filteredItems = useMemo(() => {
    if (!activeFilter) return items
    return items.filter((item) => item.servicioSlug === activeFilter)
  }, [items, activeFilter])

  const handleCardClick = (item: TestimonioGridItem, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const viewportCX = window.innerWidth / 2
    const viewportCY = window.innerHeight / 2
    setOrigin({ x: centerX - viewportCX, y: centerY - viewportCY })
    setSelectedItem(item)
  }

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
            />
          </div>
        )}

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeFilter ?? 'all'}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredItems.map((item) => (
            <motion.div key={item.id} variants={cardVariants}>
              <TestimonioCard
                id={item.id}
                quote={item.quote}
                author={item.author}
                role={item.role}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                rating={item.rating}
                servicioNombre={item.servicioNombre}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleCardClick(item, e)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Popup */}
      <TestimonialPopup
        testimonio={
          selectedItem
            ? {
                id: selectedItem.id,
                author: selectedItem.author,
                role: selectedItem.role ?? '',
                imageSrc: selectedItem.imageSrc,
                imageAlt: selectedItem.imageAlt,
                imagenDestacadaTestimonioSrc: selectedItem.imagenDestacadaTestimonioSrc,
                imagenDestacadaTestimonioAlt: selectedItem.imagenDestacadaTestimonioAlt,
                servicioNombre: selectedItem.servicioNombre,
                servicioSlug: selectedItem.servicioSlug,
                texto: selectedItem.texto,
                calificacion: selectedItem.calificacion,
                videoUrl: selectedItem.videoUrl,
              }
            : {
                id: '',
                author: '',
                role: '',
                texto: '',
                calificacion: 0,
              }
        }
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        origin={origin}
      />
    </section>
  )
}
