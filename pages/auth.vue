<template>
  <form class="" @submit.prevent="handleLogin">
    <div class="">
      <p class="">Sign in via magic link with your email below</p>
      <div>
        <input class="w-full border border-gray-900 mt-2 px-4 py-2" type="email" placeholder="Your email"
          v-model="email" />
      </div>
      <div>
        <input type="submit" class="w-full border border-gray-900 px-4 py-2 mt-2"
          :value="loading ? 'Loading' : 'Send magic link'" :disabled="loading" />
      </div>
    </div>
  </form>
</template>

<script setup>
const loading = ref(false)
const email = ref("")

const supabase = useSupabaseClient();

onMounted(() => {
  supabase.auth.onAuthStateChange((user) => {
    if (user) {
      router.push("/")
    }
  })
})

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signIn({ email: email.value },
      { redirectTo: window.location.origin + "/" })
    if (error) throw error
    alert("Check your email for the login link!")
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>
