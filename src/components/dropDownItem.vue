<template>
  <li
    class="dropdown-option"
    :class="{'is-disable':  disabled}"
  >
    <slot></slot>
  </li>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: true
    }
  }

})
</script>
<style scoped>
.dropdown-option .is-disable{
  color: red;
  pointer-events: none;
  background: transparent;
}
</style>
