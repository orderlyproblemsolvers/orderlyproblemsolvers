export default defineNuxtPlugin((nuxtApp) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // Listen for login/logout
  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      user.value = session.user
    } else {
      user.value = null
    }
  })
})
