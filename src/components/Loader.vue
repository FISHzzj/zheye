<template>
  <teleport to="#back">
    <div
      class="d-flex justify-content-center align-items-center h-100 loading"
      :style="{backgroundColor:background || ''}"
    >
      <div class="loading-content" >
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{text || 'Loading...'}}</span>
        </div>
        <p v-if="text" class="text-primary small">{{text}}</p>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
export default defineComponent({
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup () {
    const node = document.createElement('div')
    node.id = 'back'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>
<style scoped>
.loading-content{
  background: rgba(255, 255, 255, 0.5);
  z-index: 500;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
