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

    <div v-if="loading" class="text-center text-gray-400">Loading post...</div>

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
        <p class="text-gray-400">
          By
          <span class="text-white">{{ post.writers.name || "Writer" }}</span> on
          {{ new Date(post.created_at).toLocaleDateString() }}
        </p>
      </div>

      <img
        v-if="post.image_url"
        :src="post.image_url"
        alt="Post image"
        class="rounded-lg w-full object-cover max-h-[500px]"
      />
      <div class="text-gray-300 font-serif" v-html="post.content"></div>
    </article>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

definePageMeta({
  layout: "writer",
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const route = useRoute();

const post = ref(null);
const loading = ref(true);
const errorMsg = ref(null);

const fetchPost = async () => {
  if (!route.params.slug) return;

  loading.value = true;
  errorMsg.value = null;
  try {
    // RLS policy ensures only published posts are public,
    // but the writer's own RLS policy allows them to read their own drafts too.
    const { data, error } = await supabase
      .from("posts")
      .select("*, writers ( name )") // Fetch post and author name
      .eq("slug", route.params.slug)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Post not found.");

    post.value = data;
  } catch (err) {
    errorMsg.value = err.message;
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Watch for user to be loaded before fetching
// This ensures RLS policies are in effect
watch(
  user,
  (currentUser) => {
    if (currentUser) {
      fetchPost();
    }
  },
  { immediate: true }
);
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
}
.prose pre {
  background-color: theme("colors.slate.900");
  border: 1px solid theme("colors.gray.800");
}
</style>
