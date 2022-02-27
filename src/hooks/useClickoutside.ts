import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickoutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickoutside = ref(false)
  const hander = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickoutside.value = true
      } else {
        isClickoutside.value = false
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', hander)
  })
  onUnmounted(() => {
    document.removeEventListener('click', hander)
  })
  return isClickoutside
}

export default useClickoutside
