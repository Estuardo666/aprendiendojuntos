import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-crema">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/logoamarillo.svg"
          alt="Aprendiendo Juntos"
          width={262}
          height={83}
          className="h-auto w-[200px] md:w-[280px]"
          priority
        />
        <p className="font-body text-sm font-medium tracking-wide text-brand-azul/70">
          Sitio en construcción
        </p>
      </div>
    </main>
  )
}
