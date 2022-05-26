export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()

  if (!user.value && to.name !== 'auth') {
    return navigateTo('/auth')
  } else if (user.value && to.name === 'auth') {
    return navigateTo('/')
  }
})
