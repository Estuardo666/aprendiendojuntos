'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Heading } from '@/components/atoms/Heading'
import { Icon } from '@/components/atoms/Icon'
import { Text } from '@/components/atoms/Text'
import type {
  ContactoInfoSectionData,
  ContactoSocialLinkData,
  ContactoSocialPlatform,
} from '@/lib/types/contacto.types'
import type { IconName } from '@/lib/icons'

interface ContactoSplitStageProps {
  pretitulo: string
  titulo: string
  descripcion: string
  infoSections: ContactoInfoSectionData[]
  socialPretitulo: string
  socialLinks: ContactoSocialLinkData[]
  latitude: number
  longitude: number
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
} as const

const socialIconMap: Record<ContactoSocialPlatform, IconName> = {
  facebook: 'FacebookIcon',
  instagram: 'InstagramIcon',
  tiktok: 'TiktokIcon',
  youtube: 'YoutubeIcon',
  google: 'GlobeIcon',
}

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const mapStyles = [
  {
    stylers: [
      { hue: '#2c3e50' },
      { saturation: 250 },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      { lightness: 50 },
      { visibility: 'simplified' },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
] as const

type GoogleWindow = Window & typeof globalThis & {
  google?: any
  __googleMapsPromise?: Promise<void>
}

function buildMapsLink(latitude: number, longitude: number) {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
}

export function ContactoSplitStage({
  pretitulo,
  titulo,
  descripcion,
  infoSections,
  socialPretitulo,
  socialLinks,
  latitude,
  longitude,
}: ContactoSplitStageProps) {
  const mapsLink = buildMapsLink(latitude, longitude)
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    const googleWindow = window as GoogleWindow
    let cancelled = false

    async function initMap() {
      if (!mapRef.current || !googleMapsApiKey) return

      if (!googleWindow.__googleMapsPromise) {
        googleWindow.__googleMapsPromise = new Promise<void>((resolve, reject) => {
          const existingScript = document.querySelector('script[data-google-maps="true"]') as HTMLScriptElement | null

          if (existingScript) {
            if (googleWindow.google?.maps) {
              resolve()
              return
            }

            existingScript.addEventListener('load', () => resolve(), { once: true })
            existingScript.addEventListener('error', () => reject(new Error('Google Maps failed to load')), { once: true })
            return
          }

          const script = document.createElement('script')
          script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=weekly`
          script.async = true
          script.defer = true
          script.dataset.googleMaps = 'true'
          script.onload = () => resolve()
          script.onerror = () => reject(new Error('Google Maps failed to load'))
          document.head.appendChild(script)
        })
      }

      await googleWindow.__googleMapsPromise

      if (cancelled || !mapRef.current || !googleWindow.google?.maps) return

      const center = { lat: latitude, lng: longitude }
      const map = new googleWindow.google.maps.Map(mapRef.current, {
        center,
        zoom: 18,
        disableDefaultUI: true,
        clickableIcons: false,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        styles: mapStyles as unknown as any[],
      })

      new googleWindow.google.maps.Marker({
        position: center,
        map,
        icon: {
          url: '/pinmap.svg',
          scaledSize: new googleWindow.google.maps.Size(76, 76),
        },
        title: 'Aprendiendo Juntos',
      })

      setMapReady(true)
    }

    initMap().catch(() => undefined)

    return () => {
      cancelled = true
    }
  }, [latitude, longitude])

  return (
    <section className="bg-brand-crema px-6 py-10 md:px-10 md:py-12 lg:px-16 lg:py-16">
      <div className="mx-auto grid w-[80vw] max-w-none gap-6 lg:grid-cols-[50%_50%] lg:gap-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="rounded-[2.5rem] border border-brand-azul/8 bg-white p-8 md:p-10"
        >
          <span className="inline-flex rounded-full bg-brand-acua/70 px-4 py-2 text-sm font-medium text-brand-azul">
            {pretitulo}
          </span>

          <Heading
            as="h1"
            variant="display"
            color="azul"
            className="mt-5 max-w-[16ch] text-[3em] leading-[0.92] tracking-[-0.06em]"
          >
            {titulo}
          </Heading>

          <Text variant="lead" className="mt-6 w-full max-w-none text-brand-texto/88 leading-[1.34]">
            {descripcion}
          </Text>

          <div className="mt-10 space-y-8">
            {infoSections.map((section) => (
              <div key={section.pretitulo}>
                <span className="inline-flex rounded-full bg-[#0056a4] px-3.5 py-[0.42rem] text-[clamp(0.86rem,1.45vw,0.90rem)] font-medium leading-none text-brand-blanco">
                  {section.pretitulo}
                </span>

                <div
                  className={section.pretitulo.toLowerCase().includes('tel')
                    ? 'mt-4 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2'
                    : 'mt-4 space-y-4'}
                >
                  {section.items.map((item, index) => {
                    const rowContent = (
                      <div className="flex items-start gap-3.5">
                        <span className="relative mt-1 flex h-7 w-7 shrink-0 items-center justify-center md:h-8 md:w-8">
                          <Image
                            src={item.iconoSrc}
                            alt=""
                            fill
                            sizes="32px"
                            className="object-contain"
                          />
                        </span>

                        <div className="min-w-0">
                          <Text
                            as="span"
                            className="block text-[1rem] font-medium leading-[1.15] text-brand-texto"
                          >
                            {item.valor}
                          </Text>
                          {item.descripcion && (
                            <Text
                              variant="small"
                              className="mt-1 block text-[0.8rem] uppercase tracking-[0.01em] leading-[1.05] text-brand-celeste"
                            >
                              {item.descripcion}
                            </Text>
                          )}
                        </div>
                      </div>
                    )

                    if (item.href) {
                      return (
                        <a
                          key={`${section.pretitulo}-${index}`}
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="block transition-transform duration-200 hover:translate-x-1"
                        >
                          {rowContent}
                        </a>
                      )
                    }

                    return <div key={`${section.pretitulo}-${index}`}>{rowContent}</div>
                  })}
                </div>
              </div>
            ))}

            <div>
              <span className="inline-flex rounded-full bg-[#0056a4] px-3.5 py-[0.42rem] text-[clamp(0.86rem,1.45vw,0.90rem)] font-medium leading-none text-brand-blanco">
                {socialPretitulo}
              </span>

              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={`${social.plataforma}-${social.href}`}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.nombre}
                    title={social.nombre}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-celeste text-white transition-all duration-200 hover:-translate-y-1 hover:bg-brand-azul"
                  >
                    <Icon name={socialIconMap[social.plataforma]} size="lg" color="blanco" className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.18 }}
          className="relative min-h-[420px] overflow-hidden rounded-[2.5rem] border border-brand-azul/8 bg-white md:min-h-[520px]"
        >
          <div className="relative h-full min-h-[394px] overflow-hidden rounded-[2rem] bg-white md:min-h-[494px]">
            <div ref={mapRef} className="absolute inset-0 h-full w-full" />

            {!mapReady && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(154,204,234,0.6),transparent_22%),radial-gradient(circle_at_78%_78%,rgba(249,181,11,0.22),transparent_24%),linear-gradient(180deg,#ffffff_0%,#f7f3e8_100%)]" />
            )}

            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 left-6 z-20 inline-flex items-center rounded-full bg-white/92 px-4 py-2 text-sm font-medium text-brand-azul transition-transform duration-200 hover:-translate-y-0.5"
            >
              Abrir en Google Maps
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}