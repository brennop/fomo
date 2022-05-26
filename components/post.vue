<template>
  <div class="mt-2 px-2 py-4 border-b border-gray-100 text-gray-900">
    <p>{{ post.poster.username }}

    <div class="select-none text-sm animate-bounce inline-block" v-if="isOnFire"
      :title="post.poster.username + ' is on a ' + post.poster.streak + ' day streak'">🔥
    </div>
    <span class="text-sm"> at {{ time }}</span>
    </p>
    <p class="mt-2">{{ post.text }}</p>
  </div>
</template>

<script setup>
const { post } = defineProps(["post"]);

const isOnFire = post.poster.streak > 0;
const time = new Date(post.created_at).toLocaleTimeString()
</script>
