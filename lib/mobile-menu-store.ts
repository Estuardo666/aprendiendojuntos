type Listener = () => void

let isOpen = false
const listeners = new Set<Listener>()

function emit() {
  listeners.forEach(l => l())
}

export const mobileMenuStore = {
  setOpen(value: boolean) {
    if (isOpen !== value) {
      isOpen = value
      emit()
    }
  },
  subscribe(listener: Listener) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  getSnapshot() {
    return isOpen
  },
  getServerSnapshot() {
    return false
  },
}
