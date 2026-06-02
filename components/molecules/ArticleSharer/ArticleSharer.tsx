'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@/components/atoms/Icon'
import { cn } from '@/lib/utils/cn'
import type { ArticleSharerProps } from './ArticleSharer.types'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
}

interface SharePlatform {
  name: string
  iconName: 'FacebookIcon' | 'WhatsappIcon' | 'LinkedinIcon' | 'InstagramIcon' | 'LinkIcon'
  getUrl: (url: string, title: string, description?: string) => string
}

const platforms: SharePlatform[] = [
  {
    name: 'Facebook',
    iconName: 'FacebookIcon',
    getUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: 'WhatsApp',
    iconName: 'WhatsappIcon',
    getUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    name: 'LinkedIn',
    iconName: 'LinkedinIcon',
    getUrl: (url) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: 'Instagram',
    iconName: 'InstagramIcon',
    getUrl: () => 'https://instagram.com/aprendiendojuntos.ec',
  },
]

export function ArticleSharer({ title, description }: ArticleSharerProps) {
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const [hasNativeShare, setHasNativeShare] = useState(false)

  useEffect(() => {
    setCurrentUrl(window.location.href)
    setHasNativeShare(!!navigator.share)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = currentUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url: currentUrl })
      } catch {
        // Usuario canceló o error
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Web Share API button */}
      {hasNativeShare && (
        <motion.button
          type="button"
          onClick={handleNativeShare}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mb-2 inline-flex items-center gap-2 rounded-full bg-brand-azul px-6 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-brand-celeste"
        >
          <Icon name="GlobeIcon" size="sm" className="h-4 w-4" />
          Compartir artículo
        </motion.button>
      )}

      {/* Platform buttons */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center gap-3"
      >
        {platforms.map((platform) => (
          <motion.div key={platform.name} variants={itemVariants}>
            <a
              href={currentUrl ? platform.getUrl(currentUrl, title, description) : '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Compartir en ${platform.name}`}
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-full',
                'bg-brand-azul/10 text-brand-azul',
                'transition-all duration-200 hover:bg-brand-azul hover:text-white',
              )}
            >
              <Icon name={platform.iconName} size="sm" className="h-5 w-5" />
            </a>
          </motion.div>
        ))}

        {/* Copy link button */}
        <motion.div variants={itemVariants}>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? 'Enlace copiado' : 'Copiar enlace'}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full',
              'transition-all duration-200',
              copied
                ? 'bg-green-500 text-white'
                : 'bg-brand-azul/10 text-brand-azul hover:bg-brand-azul hover:text-white',
            )}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex h-5 w-5 items-center justify-center"
                >
                  <Icon name="CheckIcon" size="sm" className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="link"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="flex h-5 w-5 items-center justify-center"
                >
                  <Icon name="LinkIcon" size="sm" className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </motion.div>

      {/* Copied feedback text */}
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="font-body text-xs font-medium text-green-600"
          >
            ¡Enlace copiado!
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
