<template>
  <ul>
    <li v-for="post in posts" :key="post.id">
      {{ post.title }}
    </li>
  </ul>
</template>

<script>
import { getPosts } from '../api/posts.js'

export default {
  async asyncData() {
    const posts = await getPosts()
    return { posts: posts }
  }
}
</script>
