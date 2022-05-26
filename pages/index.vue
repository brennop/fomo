<template>
  <template v-if="!posted">
    <marquee>Check-in first to see what others are up to!</marquee>
    <form class="mt-2" @submit.prevent="submitPost">
      <textarea class="border border-gray-900 w-full p-1" v-model="text" />
      <input type="submit" class="w-full border border-gray-900 px-4 py-2 mt-2"
        :value="loading ? 'Loading ...' : 'check-in'" :disabled="loading" />
    </form>
  </template>

  <post v-for="post in posts" :post="post" :key="post.id" />
</template>

<script setup>
import { store } from "../lib/store"

const supabase = useSupabaseClient();

const loading = ref(false)
const posted = ref(false)
const text = ref("")
const posts = ref([])

async function submitPost() {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from("posts")
      .insert([{ text: text.value }], { returning: "minimal" });

    window.location.reload();
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const { data } = await supabase.from("posts")
    .select("*, poster:poster_id(*)");
  posts.value = data;
})

onMounted(() => {
  store.user = supabase.auth.user()
  supabase.rpc("has_posted", { _user_id: store.user.id })
    .then(({ data }) => {
      posted.value = data
    })
})
</script>
