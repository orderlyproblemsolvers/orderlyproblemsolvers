export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  if (to.path === '/admin/login') return

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // 🧠 Wait until user is available
  if (!user.value) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      return navigateTo('/admin/login')
    }
    user.value = session.user
  }

  // 🕒 Still null? (rare edge case)
  if (!user.value?.id) {
    console.warn('User not yet available, retrying...')
    await new Promise((r) => setTimeout(r, 300))
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return navigateTo('/admin/login')
    user.value = session.user
  }

  // ✅ Now safe to query
  const { data: adminData, error } = await supabase
    .from('admins')
    .select('*')
    .eq('user_id', user.value.id)
    .eq('is_active', true)
    .single()

  if (error || !adminData) {
    await supabase.auth.signOut()
    return navigateTo('/admin/login')
  }
})
