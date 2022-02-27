<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <h4>{{post.title}}</h4>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-4">
            <img :src="post.image.url" :alt="post.title" class="rounded-lg w-100">
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
// import { PostProps } from '../testData'
import { PostProps } from '../store'
export default defineComponent({
  props: {
    list: {
      require: true,
      type: Array as PropType<PostProps[]>
    }
  },
  setup (props) {
    console.log(props)
    const posts = computed(() => {
      return props.list.map(post => {
        if (post.image) {
          post.image = {
            url: require('@/assets/morentubiao.png')
          }
        } else {
          post.image.url = post.image.url + '?x-oss-process=image/resize,m_pad,h_50,w_50'
        }
        return post
      })
    })
    return {
      posts
    }
  }
})
</script>
