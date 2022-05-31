<template>
  <div class="mt-2 px-2 py-4 border-b border-gray-200 text-gray-900">
    <p>
      <span v-if="isOnFire" class="text-shadow shadow-orange-200 text-orange-500/80 bg-clip-text
        bg-bottom bg-[url('/fire.gif')]" :title="`${post.poster.username} is on a ${post.poster.streak} day streak!`">
        {{ post.poster.username }}
        🔥
      </span>
      <span v-else class="text-gray-900">
        {{ post.poster.username }}
      </span>

      <span class="text-sm"> at {{ time }}</span>
    </p>
    <p class="mt-2 font-serif">{{ post.text }}</p>
  </div>
</template>

<script setup>
const { post } = defineProps(["post"]);

const isOnFire = post.poster.streak > 1;
const time = new Date(post.created_at).toLocaleTimeString()
</script>
