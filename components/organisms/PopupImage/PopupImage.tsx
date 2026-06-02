'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import type { PopupData } from '@/lib/api/popup';

interface PopupImageProps {
  data: PopupData | null;
}

export function PopupImage({ data }: PopupImageProps) {
  const [show, setShow] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!data?.popupActivo || !data?.popupImagen?.node) return;

    const delay = (data.popupDelay ?? 5) * 1000;
    const timer = setTimeout(() => setShow(true), delay);

    return () => clearTimeout(timer);
  }, [data]);

  if (!data?.popupActivo || !data?.popupImagen?.node) return null;

  const handleClose = () => setShow(false);

  const imagen = data.popupImagen.node;

  const imageElement = (
    <Image
      src={imagen.sourceUrl}
      alt={imagen.altText || 'Popup'}
      width={600}
      height={800}
      className="h-auto max-h-[80vh] w-full rounded-lg object-contain"
    />
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: shouldReduceMotion ? 1 : 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: shouldReduceMotion ? 1 : 0.8, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute -right-2 -top-2 z-10 rounded-full bg-white p-1.5 shadow-lg transition-colors hover:bg-gray-100"
              aria-label="Cerrar popup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-700"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {data.popupUrl ? (
              <a href={data.popupUrl} target="_blank" rel="noopener noreferrer">
                {imageElement}
              </a>
            ) : (
              imageElement
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
