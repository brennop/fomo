export default defineNuxtRouteMiddleware(async (to, _from) => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()

  let { data, error, status } = await supabase
    .from("profiles")
    .select(`username, avatar_url`)
    .eq("id", user.value.id)
    .single()

  if (!data) {
    return navigateTo('/profile')
  }
})
