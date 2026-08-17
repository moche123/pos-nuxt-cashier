export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()
  const publicPages = ['/login', '/register']

  if (!auth.token && !publicPages.includes(to.path)) {
    return navigateTo('/login')
  }

  if (auth.token && publicPages.includes(to.path)) {
    return navigateTo('/')
  }
})
