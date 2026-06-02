'use client'

import { useRef, useState, useEffect } from 'react'

interface ArticleContentWithProgressProps {
  content: string
}

export function ArticleContentWithProgress({ content }: ArticleContentWithProgressProps) {
  const articleRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = articleRef.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight

      if (scrollable <= 0) {
        setProgress(0)
        return
      }

      const scrolled = -rect.top
      setProgress(Math.min(1, Math.max(0, scrolled / scrollable)))
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-brand-naranja transition-[width] duration-100 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <section className="px-4 pb-10 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <article
            ref={articleRef}
            className="prose prose-lg prose-headings:font-body prose-headings:text-brand-azul prose-p:font-body prose-p:text-[#253a44] prose-a:text-brand-celeste prose-strong:text-[#253a44] max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>
    </>
  )
}