<template>
  <div class="max-w-4xl mx-auto text-white">
    <NuxtLink
      to="/writer/posts"
      class="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-ibm-plex-mono font-bold mb-6"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back to All Posts
    </NuxtLink>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      <p class="mt-4 text-gray-400 font-ibm-plex-mono">Loading post...</p>
    </div>

    <div
      v-else-if="errorMsg"
      class="text-red-400 bg-red-900/50 border border-red-800 rounded-lg p-6"
    >
      <h3 class="font-heading text-xl mb-2">Error</h3>
      <p>{{ errorMsg }}</p>
    </div>

    <article v-else-if="post" class="prose prose-invert prose-lg max-w-none">
      <div class="border-b border-gray-800 pb-4 mb-8">
        <p
          class="font-ibm-plex-mono font-bold text-yellow-400 uppercase text-sm"
        >
          {{ post.tag }}
        </p>
        <h1 class="font-heading text-4xl md:text-5xl text-white mt-2 mb-4">
          {{ post.title }}
        </h1>
        <div class="flex items-center gap-4 text-gray-400 text-sm">
          <p>
            By
            <span class="text-white">{{ post.writers?.name || "Writer" }}</span>
          </p>
          <span>•</span>
          <p>{{ new Date(post.created_at).toLocaleDateString() }}</p>
          <span>•</span>
          <p class="flex items-center gap-1">
            <span 
              class="inline-block w-2 h-2 rounded-full"
              :class="post.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'"
            ></span>
            {{ post.status === 'published' ? 'Published' : 'Draft' }}
          </p>
        </div>
      </div>

      <img
        v-if="post.image_url"
        :src="post.image_url"
        alt="Post image"
        class="rounded-lg w-full object-cover max-h-[500px] mb-8"
      />
      
      <div class="text-gray-300 font-serif" v-html="post.content"></div>
      
      <div class="mt-12 pt-8 border-t border-gray-800 flex items-center justify-between">
        <NuxtLink
          :to="`/writer/edit/${post.id}`"
          class="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg font-ibm-plex-mono font-bold text-sm hover:bg-yellow-300 transition-colors duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
          </svg>
          Edit Post
        </NuxtLink>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

definePageMeta({
  layout: "writer",
});

const supabase = useSupabaseClient();
const route = useRoute();
const { isReady, waitForAuth, getWriterId } = useWriterAuth();

const post = ref(null);
const loading = ref(true);
const errorMsg = ref(null);

const fetchPost = async () => {
  if (!route.params.slug) {
    errorMsg.value = "No post slug provided.";
    loading.value = false;
    return;
  }

  loading.value = true;
  errorMsg.value = null;
  
  try {
    const writerId = getWriterId();
    if (!writerId) {
      throw new Error("Could not find writer profile.");
    }

    // Fetch the post
    // RLS policy allows writers to see their own posts (published or draft)
    const { data, error } = await supabase
      .from("posts")
      .select("*, writers ( name )")
      .eq("slug", route.params.slug)
      .eq("author_id", writerId) // Ensure writer can only view their own posts
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error("Post not found or you don't have permission to view it.");
      }
      throw error;
    }
    
    if (!data) {
      throw new Error("Post not found.");
    }

    post.value = data;
  } catch (err) {
    errorMsg.value = err.message;
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await waitForAuth();
  
  if (isReady.value) {
    await fetchPost();
  } else {
    errorMsg.value = "Authentication failed. Please refresh the page.";
    loading.value = false;
  }
});
</script>

<style lang="postcss">
.prose {
  color: theme("colors.gray.300");
}
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: theme("colors.white");
}
.prose a {
  color: theme("colors.yellow.400");
}
.prose a:hover {
  color: theme("colors.yellow.300");
}
.prose strong {
  color: theme("colors.white");
}
.prose blockquote {
  color: theme("colors.gray.400");
  border-left-color: theme("colors.gray.700");
}
.prose code {
  color: theme("colors.gray.200");
  background-color: theme("colors.gray.800");
  padding: 0.2em 0.4em;
  border-radius: 6px;
  font-size: 0.875em;
}
.prose pre {
  background-color: theme("colors.slate.900");
  border: 1px solid theme("colors.gray.800");
  border-radius: 0.5rem;
}
.prose pre code {
  background-color: transparent;
  padding: 0;
}
.prose ul,
.prose ol {
  color: theme("colors.gray.300");
}
.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style>