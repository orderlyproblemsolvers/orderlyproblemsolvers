<script setup lang="ts">
// LAST UPDATED
const lastUpdated = 'October 24, 2025'

// NAVIGATION LINKS (Anchor links)
const sections = [
  { id: 'introduction', label: '1. Introduction' },
  { id: 'data-collection', label: '2. Data Collection' },
  { id: 'usage', label: '3. How We Use Data' },
  { id: 'sharing', label: '4. Data Sharing' },
  { id: 'security', label: '5. Security' },
  { id: 'rights', label: '6. Your Rights' },
  { id: 'contact', label: '7. Contact Us' }
]
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-white transition-colors duration-300">
    
    <!-- HEADER -->
    <div class="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 pt-32 pb-16 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Legal Documentation</p>
        <h1 class="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-gray-900 dark:text-white">Privacy Policy.</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm font-mono">Last Updated: {{ lastUpdated }}</p>
      </div>
    </div>

    <!-- CONTENT GRID -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <!-- STICKY SIDEBAR (TOC) -->
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
        <div class="lg:col-span-8 lg:col-start-5 prose prose-lg prose-gray dark:prose-invert max-w-none transition-colors duration-300">
          
          <!-- 1. Introduction -->
          <section id="introduction" class="mb-16 scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">1. Introduction</h2>
            <p>
              Orderly Problem Solvers ("OPS", "we", "us", or "our") operates the OPS Platform, Directory, and Studio. We are committed to protecting your personal information and your right to privacy.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit a profile to our directory, or engage our studio services.
            </p>
          </section>

          <!-- 2. Data Collection -->
          <section id="data-collection" class="mb-16 scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">2. Information We Collect</h2>
            <p>We collect information that you voluntarily provide to us when you:</p>
            <ul class="list-disc pl-5 space-y-2 mb-6">
              <li>Register on the OPS Platform.</li>
              <li>Submit a Solution, Company, or Personal Profile.</li>
              <li>Subscribe to the OPS Journal newsletter.</li>
              <li>Contact us regarding OPS Studio services.</li>
            </ul>
            <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-white">Publicly Visible Data</h3>
            <p>
              Please note that if you submit a profile to the <strong>OPS Directory</strong>, the information you provide (Name, Role, Bio, Tech Stack, Social Links) is intended for public consumption and will be visible to all visitors of the site.
            </p>
          </section>

          <!-- 3. Usage -->
          <section id="usage" class="mb-16 scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">3. How We Use Your Information</h2>
            <p>We use the information we collect or receive:</p>
            <ul class="list-disc pl-5 space-y-2">
              <li>To facilitate account creation and logon processes.</li>
              <li>To verify the authenticity of "Solvers" listed in our directory.</li>
              <li>To send you editorial updates (if subscribed).</li>
              <li>To connect you with potential partners or investors (with your consent).</li>
              <li>To improve the UX/UI of our platform through analytics.</li>
            </ul>
          </section>

          <!-- 4. Sharing -->
          <section id="sharing" class="mb-16 scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">4. Sharing Your Information</h2>
            <p>
              We do not sell your personal data. We may share information in specific situations, such as:
            </p>
            <div class="bg-gray-50 dark:bg-slate-900 p-6 rounded-lg border border-gray-200 dark:border-slate-800 my-6 transition-colors duration-300">
              <p class="font-bold text-sm mb-2 text-gray-900 dark:text-white">Business Transfers</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</p>
            </div>
          </section>

          <!-- 5. Security -->
          <section id="security" class="mb-16 scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <!-- 6. Rights -->
          <section id="rights" class="mb-16 scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">6. Your Privacy Rights</h2>
            <p>
              Depending on your location (e.g., GDPR for Europe, NDPR for Nigeria), you may have the right to access, correct, or delete the personal information we collect.
            </p>
            <p>
              To request a deletion of your Directory Profile, please email <a href="mailto:orderlyproblemsolvers@gmail.com" class="text-blue-600 dark:text-blue-400 underline decoration-blue-300 dark:decoration-blue-900">orderlyproblemsolvers@gmail.com</a>.
            </p>
          </section>

          <!-- 7. Contact -->
          <section id="contact" class="scroll-mt-32">
            <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">7. Contact Us</h2>
            <p class="mb-4">
              If you have questions or comments about this policy, you may email us at <a href="mailto:orderlyproblemsolvers@gmail.com" class="text-blue-600 dark:text-blue-400 underline decoration-blue-300 dark:decoration-blue-900">orderlyproblemsolvers@gmail.com</a> or by post to:
            </p>
            <address class="not-italic bg-gray-900 dark:bg-white text-white dark:text-slate-900 p-6 rounded-xl inline-block transition-colors duration-300">
              <strong>Orderly Problem Solvers</strong>,<br>
              Abuja, Nigeria.
            </address>
          </section>

        </div>

      </div>
    </div>
  </div>
</template>