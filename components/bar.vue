<template>
  <header class="p-2 border-b border-gray-900 grid grid-cols-3">
    <div />
    <h1 class="text-center font-serif">fomo</h1>
    <button 
      v-if="user"
      class="justify-self-end text-xs" @click="signOut">
      Sign Out
    </button>
  </header>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser()

const loading = ref(true)

async function signOut() {
  try {
    loading.value = true
    let { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>
