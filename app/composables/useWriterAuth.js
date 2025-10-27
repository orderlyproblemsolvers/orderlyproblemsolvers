// composables/useWriterAuth.js

export const useWriterAuth = () => {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  
  const writerData = useState('writerData', () => null)
  
  const isReady = computed(() => {
    return !!(user.value?.id && writerData.value?.id)
  })
  
  const waitForAuth = () => {
    return new Promise((resolve) => {
      if (isReady.value) {
        resolve(true)
        return
      }
      
      const unwatch = watch(isReady, (ready) => {
        if (ready) {
          unwatch()
          resolve(true)
        }
      })
      
      // Timeout after 5 seconds
      setTimeout(() => {
        unwatch()
        resolve(false)
      }, 5000)
    })
  }
  
  const getWriterId = () => {
    return writerData.value?.id || null
  }
  
  const getUserId = () => {
    // --- THIS IS THE FIX ---
    
    // The 'user.value' from useSupabaseUser() can be volatile
    // during client-side hydration.
    //
    // The 'writerData.value' state, however, was set by your
    // global middleware, which *already verified* the user and
    // stored the writer profile (which includes the 'user_id').
    //
    // We trust the 'user_id' from the writerData first, as it's
    // a stable value guaranteed by the middleware.
    
    return writerData.value?.user_id || user.value?.id || null
  }
  
  return {
    user,
    writerData,
    isReady,
    waitForAuth,
    getWriterId,
    getUserId
  }
}