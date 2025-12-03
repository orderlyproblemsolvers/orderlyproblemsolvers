<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

definePageMeta({
  layout: "admin",
  middleware: "admin",
});

const router = useRouter();
const route = useRoute();
const id = route.params.id as string;
const isLoading = ref(false);

// 1. FETCH EXISTING DATA
const { data: existingData, pending } = await useFetch(
  `/api/admin/companies/${id}`
);

// 2. INIT FORM
const form = ref({
  name: "",
  slug: "",
  headline: "",
  description: "",
  industry: "FinTech",
  location: "",
  website: "",
  stage: "Seed",
  logo: "",
  featured: false,
  status: "approved",
  stack: [] as string[],
  stackInput: "",
});

// Populate form once data arrives
watch(
  existingData,
  (newData) => {
    if (newData) {
      form.value = {
        ...form.value, // Keep defaults
        ...newData, // Overwrite with DB data
        stackInput: "", // Reset input buffer
      };
    }
  },
  { immediate: true }
);

// TAGGING LOGIC
const addTag = () => {
  const val = form.value.stackInput.trim();
  if (val && !form.value.stack.includes(val)) {
    form.value.stack.push(val);
  }
  form.value.stackInput = "";
};

const removeTag = (index: number) => {
  form.value.stack.splice(index, 1);
};

const handleUpdate = async () => {
  isLoading.value = true;
  try {
    await $fetch(`/api/admin/companies/${id}`, {
      method: "PUT",
      body: form.value,
    });
    alert("Company Updated!");
    router.push("/admin/companies");
  } catch (e: any) {
    alert(e.data?.statusMessage || "Error updating company");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-black text-gray-900">Edit Company</h1>
      <div class="flex gap-3">
        <NuxtLink
          to="/admin/companies"
          class="px-4 py-2 text-sm font-bold text-gray-500 hover:text-black"
          >Cancel</NuxtLink
        >
        <button
          @click="handleUpdate"
          :disabled="isLoading"
          class="px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {{ isLoading ? "Saving..." : "Save Changes" }}
        </button>
      </div>
    </div>

    <div v-if="pending" class="py-20 text-center">
      <div
        class="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin mx-auto"
      ></div>
    </div>

    <form
      v-else
      @submit.prevent="handleUpdate"
      class="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
    >
      <!-- Name & Slug -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1"
            >Company Name</label
          >
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors"
          />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1"
            >Slug (URL)</label
          >
          <input
            v-model="form.slug"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none bg-gray-50"
          />
        </div>
      </div>

      <!-- LOGO UPLOAD -->
      <div>
        <ImageUpload v-model="form.logo" label="Company Logo" />
      </div>

      <!-- Headline -->
      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-1"
          >Headline</label
        >
        <input
          v-model="form.headline"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors"
        />
      </div>

      <!-- Industry & Stage -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1"
            >Industry</label
          >
          <select
            v-model="form.industry"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none bg-white"
          >
            <option>FinTech</option>
            <option>HealthTech</option>
            <option>AgriTech</option>
            <option>Logistics</option>
            <option>EdTech</option>
            <option>Clean Energy</option>
            <option>E-Commerce</option>
            <option>Real Estate</option>
            <option>Manufacturing</option>
            <option>Telecommunications</option>
            <option>Media & Entertainment</option>
            <option>Retail</option>
            <option>Transportation</option>
            <option>Hospitality</option>
            <option>Cybersecurity</option>
            <option>Artificial Intelligence</option>
            <option>Software Development</option>
            <option>Cloud Computing</option>
            <option>Gaming</option>
            <option>Fashion & Apparel</option>
            <option>Food & Beverage</option>
            <option>Automotive</option>
            <option>Aerospace & Defense</option>
            <option>Pharmaceuticals</option>
            <option>Insurance</option>
            <option>Banking</option>
            <option>Construction</option>
            <option>Mining</option>
            <option>Oil & Gas</option>
            <option>Utilities</option>
            <option>Tourism</option>
            <option>Sports & Recreation</option>
            <option>Beauty & Wellness</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1"
            >Stage</label
          >
          <select
            v-model="form.stage"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none bg-white"
          >
            <option>Bootstrapped</option>
            <option>Pre-Seed</option>
            <option>Seed</option>
            <option>Series A</option>
            <option>Series B+</option>
            <option>Series B</option>
            <option>Series C</option>
            <option>Series D</option>
            <option>Series E</option>
            <option>Series F+</option>
            <option>Growth Stage</option>
            <option>Late Stage</option>
            <option>Pre-IPO</option>
            <option>IPO</option>
            <option>Private Equity</option>
            <option>Acquisition</option>
            <option>Grant Funding</option>
            <option>Angel Investment</option>
            <option>Venture Capital</option>
            <option>Crowdfunding</option>
            <option>Debt Financing</option>
          </select>
        </div>
      </div>

      <!-- Location & Website -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1"
            >Location</label
          >
          <input
            v-model="form.location"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors"
          />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1"
            >Website</label
          >
          <input
            v-model="form.website"
            type="url"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors"
          />
        </div>
      </div>

      <!-- TECH STACK INPUT -->
      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-2"
          >Tech Stack</label
        >
        <div
          class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white flex flex-wrap gap-2 items-center focus-within:border-black transition-all min-h-[46px]"
        >
          <span
            v-for="(tag, i) in form.stack"
            :key="tag"
            class="bg-black text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1"
          >
            {{ tag }}
            <button
              @click="removeTag(i)"
              type="button"
              class="hover:text-gray-300"
            >
              &times;
            </button>
          </span>
          <input
            v-model="form.stackInput"
            @keydown.enter.prevent="addTag"
            @keydown.backspace="form.stackInput === '' && form.stack.pop()"
            type="text"
            class="outline-none text-sm flex-grow min-w-[100px] bg-transparent"
            placeholder="Type & Enter..."
          />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-1"
          >Full Description</label
        >
        <RichEditor v-model="form.description" />
      </div>

      <!-- Meta Toggles -->
      <div class="border-t border-gray-100 pt-4 space-y-3">
        <div class="flex items-center gap-3">
          <input
            v-model="form.featured"
            type="checkbox"
            id="feat"
            class="w-4 h-4 text-black rounded border-gray-300 focus:ring-black accent-black"
          />
          <label
            for="feat"
            class="text-sm font-bold text-gray-900 cursor-pointer"
            >Featured Solver</label
          >
        </div>

        <div class="flex items-center gap-3">
          <label class="text-sm font-bold text-gray-500">Status:</label>
          <select
            v-model="form.status"
            class="px-2 py-1 border border-gray-300 rounded text-xs font-bold uppercase"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
    </form>
  </div>
</template>
