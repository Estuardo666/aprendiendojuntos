export function LandingFooter() {
  return (
    <footer className="bg-brand-footer px-6 py-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="font-body text-xs text-white/40">
          &copy; {new Date().getFullYear()} Centro Aprendiendo Juntos. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
