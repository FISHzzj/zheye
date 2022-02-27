<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
  <loader v-if="isLoading" text="拼命加载中" background="rgba(0,0,0,0.8)"></loader>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import store from './store'
import Loader from '../src/components/Loader.vue'
export default defineComponent({
  setup () {
    const isLoading = store.state.loading
    return {
      isLoading,
      Loader
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
