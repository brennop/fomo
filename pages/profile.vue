<template>
  <form class="p-2" @submit.prevent="updateProfile">
    <div class="mt-1">
      <label class="block" for="email">email</label>
      <input class="w-full border border-gray-900 px-4 py-2" id="email" type="text" :value="store.user.email"
        disabled />
    </div>
    <div class="mt-1">
      <label class="block" for="username">username</label>
      <input class="w-full border border-gray-900 px-4 py-2" id="username" type="text" v-model="username" />
    </div>

    <div>
      <input type="submit" class="w-full border border-gray-900 px-4 py-2 mt-2"
        :value="loading ? 'Loading ...' : 'Update'" :disabled="loading" />
    </div>
  </form>
</template>

<script setup>
import { store } from "../lib/store"

const supabase = useSupabaseClient();

const loading = ref(false)
const username = ref("")
const avatar_url = ref("")

async function updateProfile() {
  try {
    loading.value = true
    store.user = supabase.auth.user()

    const updates = {
      id: store.user.id,
      username: username.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    }

    let { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    })

    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

</script>
