export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/writer')) return
  if (to.path === '/writer/login') return

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // 🔄 Robust session check with retries
  let retries = 0
  const maxRetries = 5
  
  while ((!user.value || !user.value.id) && retries < maxRetries) {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) {
      return navigateTo('/writer/login')
    }
    
    user.value = session.user
    
    if (!user.value.id) {
      await new Promise((r) => setTimeout(r, 100 * (retries + 1))) // Progressive delay
      retries++
    }
  }

  // ❌ Final check - if still no user ID, redirect
  if (!user.value?.id) {
    console.error('Failed to load user session after retries')
    await supabase.auth.signOut()
    return navigateTo('/writer/login')
  }

  // ✅ Verify writer status
  const { data: writerData, error } = await supabase
    .from('writers')
    .select('*')
    .eq('user_id', user.value.id)
    .eq('is_active', true)
    .single()

  if (error || !writerData) {
    await supabase.auth.signOut()
    return navigateTo('/writer/login')
  }

  // 🎯 Store writer data in a global state for components to use
  useState('writerData', () => writerData)
})