type Listener = () => void

let isVisible = false
const listeners = new Set<Listener>()

function emit() {
  listeners.forEach(l => l())
}

export const adminBarStore = {
  setVisible(value: boolean) {
    if (isVisible !== value) {
      isVisible = value
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
    return isVisible
  },
  getServerSnapshot() {
    return false
  },
}
