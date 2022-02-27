<template>
  <div class="dropdown" ref="dropdownRef">
   <a href="#" class="btn btn-outline-light my-2" @click.prevent="toggleOpen">
      {{title}}
    </a>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style="display: block;" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickoutside from '../hooks/useClickoutside'
// export interface dropdownProp {
//   title: string
// }
export default defineComponent({
  name: 'dropdowns',
  props: {
    title: {
      type: String,
      require: true
    }
  },
  setup () {
    const isOpen = ref(false)
    // console.log(props)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickoutside = useClickoutside(dropdownRef)
    watch(isClickoutside, () => {
      if (isOpen.value && isClickoutside) {
        isOpen.value = false
      }
    })

    // const dropdownRef = ref<null | HTMLElement>(null)
    // const handler = (e: MouseEvent) => {
    //   console.log(dropdownRef)
    //   if (dropdownRef.value) {
    //     if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
    //       isOpen.value = false
    //     }
    //   }
    // }
    // onMounted(() => {
    //   document.addEventListener('click', handler)
    // })
    // onUnmounted(() => {
    //   document.removeEventListener('click', handler)
    // })

    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
