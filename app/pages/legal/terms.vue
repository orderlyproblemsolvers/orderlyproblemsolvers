<script setup lang="ts">
const lastUpdated = 'October 24, 2025'

const sections = [
  { id: 'acceptance', label: '1. Acceptance' },
  { id: 'directory', label: '2. Directory Rules' },
  { id: 'content', label: '3. User Content' },
  { id: 'ip', label: '4. Intellectual Property' },
  { id: 'studio', label: '5. OPS Studio' },
  { id: 'termination', label: '6. Termination' },
  { id: 'liability', label: '7. Liability' }
]
</script>

<template>
  <AppHeader/>
  <div class="min-h-screen bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-white transition-colors duration-300">
    
    <!-- HEADER -->
    <div class="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 pt-32 pb-16 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Legal Documentation</p>
        <h1 class="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-gray-900 dark:text-white">Terms of Service.</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm font-mono">Last Updated: {{ lastUpdated }}</p>
      </div>
    </div>

    <!-- CONTENT GRID -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <!-- STICKY SIDEBAR -->
        <div class="hidden lg:block lg:col-span-3 sticky top-32">
          <h4 class="text-xs font-black uppercase tracking-widest mb-6 text-gray-900 dark:text-white">Table of Contents</h4>
          <ul class="space-y-3 border-l-2 border-gray-100 dark:border-slate-800 pl-4 transition-colors duration-300">
            <li v-for="section in sections" :key="section.id">
              <a 
                :href="`#${section.id}`" 
                class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline decoration-gray-300 dark:decoration-slate-700 underline-offset-4 transition-all"
              >
                {{ section.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- MAIN CONTENT -->
        <!-- dark:prose-invert automatically flips text colors for headings, paragraphs, lists, etc. -->
        <div class="lg:col-span-8 lg:col-start-5 prose prose-lg prose-gray dark:prose-invert max-w-none transition-colors duration-300">
          
          <!-- 1. Acceptance -->
          <section id="acceptance" class="mb-16 scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Orderly Problem Solvers ("OPS") website, directory, or services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <!-- 2. Directory Rules -->
          <section id="directory" class="mb-16 scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. Directory Listing Rules</h2>
            <p>
              OPS aims to maintain a high-quality index of verified problem solvers. By submitting your profile or company to the directory, you agree that:
            </p>
            <ul class="list-disc pl-5 space-y-2 mb-4">
              <li>All information provided is accurate, current, and not misleading.</li>
              <li>You have the authority to represent the company or entity you are listing.</li>
              <li>You will not use the directory for spam, harassment, or illegal activities.</li>
            </ul>
            <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg text-red-800 dark:text-red-300 text-sm font-medium">
              <strong>Notice:</strong> We reserve the right to reject, edit, or remove any listing at our sole discretion if it violates our quality standards or these terms.
            </div>
          </section>

          <!-- 3. User Content -->
          <section id="content" class="mb-16 scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. User Generated Content</h2>
            <p>
              You retain ownership of the content you submit (e.g., bios, logos, project descriptions). However, by submitting content to OPS, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with the OPS Platform.
            </p>
          </section>

          <!-- 4. IP -->
          <section id="ip" class="mb-16 scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4. Intellectual Property</h2>
            <p>
              The OPS brand, logo, website design, "The Journal" editorial content, and the underlying code of the platform are the exclusive property of Orderly Problem Solvers. You agree not to copy, distribute, or create derivative works from our intellectual property without explicit permission.
            </p>
          </section>

          <!-- 5. Studio -->
          <section id="studio" class="mb-16 scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">5. OPS Studio Services</h2>
            <p>
              Engagements with <strong>OPS Studio</strong> (our design and development agency) are governed by separate Master Services Agreements (MSA) and Statements of Work (SOW). These Terms of Service apply primarily to the use of the public platform and directory.
            </p>
          </section>

          <!-- 6. Termination -->
          <section id="termination" class="mb-16 scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">6. Termination</h2>
            <p>
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>

          <!-- 7. Liability -->
          <section id="liability" class="scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">7. Limitation of Liability</h2>
            <p>
              In no event shall OPS, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

        </div>

      </div>
    </div>
  </div>
  <AppFooter/>
</template>