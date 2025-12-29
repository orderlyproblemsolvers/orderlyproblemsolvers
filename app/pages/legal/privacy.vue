<script setup lang="ts">
// LAST UPDATED
const lastUpdated = 'October 24, 2025'
const docId = 'OPS-LEGAL-001'

// NAVIGATION LINKS (Anchor links)
const sections = [
  { id: 'introduction', label: '01. Introduction' },
  { id: 'data-collection', label: '02. Data Collection' },
  { id: 'usage', label: '03. Usage Protocols' },
  { id: 'sharing', label: '04. Third-Party Sharing' },
  { id: 'security', label: '05. Security Measures' },
  { id: 'rights', label: '06. User Rights' },
  { id: 'contact', label: '07. Official Contact' }
]
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-serif text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div class="border-b-2 border-[#051C2C] dark:border-white pt-32 pb-12 bg-gray-50 dark:bg-[#0A253A]">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
           <div class="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 space-y-1">
             <p>Doc_ID: <span class="text-[#051C2C] dark:text-white">{{ docId }}</span></p>
             <p>Status: <span class="bg-[#00A9F4] text-white px-1">Effective</span></p>
             <p>Date: {{ lastUpdated }}</p>
           </div>
           
           <div class="hidden md:block h-px flex-grow bg-gray-300 dark:bg-gray-600 mx-8 mb-1"></div>
           
           <div class="font-bold text-xs uppercase tracking-[0.2em] text-[#051C2C] dark:text-white">
             OPS Legal Division
           </div>
        </div>

        <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-none text-[#051C2C] dark:text-white uppercase">
          Privacy Policy<span class="text-[#00A9F4]">.</span>
        </h1>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 min-h-screen border-l border-r border-[#051C2C]/10 dark:border-white/10">
        
        <div class="lg:col-span-3 border-r border-[#051C2C]/10 dark:border-white/10 hidden lg:block">
           <div class="sticky top-32 py-12 pr-8">
              <span class="block font-mono text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Index</span>
              <nav>
                <ul class="space-y-4">
                  <li v-for="section in sections" :key="section.id">
                    <a 
                      :href="`#${section.id}`" 
                      class="block font-sans text-sm font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400 hover:text-[#00A9F4] hover:translate-x-1 transition-all"
                    >
                      {{ section.label }}
                    </a>
                  </li>
                </ul>
              </nav>
           </div>
        </div>

        <div class="lg:col-span-9 py-16 lg:pl-16">
           <div class="prose prose-lg dark:prose-invert prose-headings:font-sans prose-headings:font-black prose-headings:uppercase prose-p:font-serif prose-p:leading-loose max-w-3xl">
              
              <section id="introduction" class="mb-20 scroll-mt-40 border-b border-gray-100 dark:border-gray-800 pb-12">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">01</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">Introduction</h2>
                <p>
                  Orderly Problem Solvers ("OPS", "we", "us", or "our") operates the OPS Platform, Directory, and Studio. We are committed to protecting your personal information and your right to privacy.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit a profile to our directory, or engage our studio services. By using our platform, you consent to the data practices described in this statement.
                </p>
              </section>

              <section id="data-collection" class="mb-20 scroll-mt-40 border-b border-gray-100 dark:border-gray-800 pb-12">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">02</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">Data Collection</h2>
                <p>We collect information that you voluntarily provide to us. This includes data generated when you:</p>
                <ul class="font-sans text-sm font-bold uppercase tracking-wider list-disc pl-5 space-y-2 mb-8 text-gray-600 dark:text-gray-300">
                  <li>Register on the OPS Platform</li>
                  <li>Submit a Solution, Company, or Personal Profile</li>
                  <li>Subscribe to the OPS Journal</li>
                  <li>Engage OPS Studio Services</li>
                </ul>
                
                <div class="bg-gray-50 dark:bg-[#0A253A] border-l-4 border-[#00A9F4] p-6 my-8">
                  <h3 class="font-sans text-sm font-bold uppercase mb-2 text-[#051C2C] dark:text-white">Publicly Visible Data Warning</h3>
                  <p class="text-sm m-0">
                    If you submit a profile to the <strong>OPS Directory</strong>, the information you provide (Name, Role, Bio, Tech Stack, Social Links) is intended for public consumption. Do not submit confidential data in public profile fields.
                  </p>
                </div>
              </section>

              <section id="usage" class="mb-20 scroll-mt-40 border-b border-gray-100 dark:border-gray-800 pb-12">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">03</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">How We Use Data</h2>
                <p>We use the information we collect or receive for specific operational purposes:</p>
                <ul class="font-sans text-sm list-decimal pl-5 space-y-3 text-gray-600 dark:text-gray-300">
                  <li>To facilitate account creation and authentication processes.</li>
                  <li>To verify the authenticity of "Solvers" listed in our directory.</li>
                  <li>To send you editorial updates (if subscribed).</li>
                  <li>To connect you with potential partners or investors (only with explicit consent).</li>
                  <li>To improve the UX/UI of our platform through aggregated analytics.</li>
                </ul>
              </section>

              <section id="sharing" class="mb-20 scroll-mt-40 border-b border-gray-100 dark:border-gray-800 pb-12">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">04</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">Data Sharing</h2>
                <p>
                  We do not sell your personal data. We may share information in specific legal or business situations, such as:
                </p>
                <div class="mt-6 border border-gray-200 dark:border-gray-700 p-6">
                   <p class="font-sans font-bold text-xs uppercase tracking-widest mb-2 text-[#00A9F4]">Business Transfers</p>
                   <p class="text-sm m-0">
                     We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                   </p>
                </div>
              </section>

              <section id="security" class="mb-20 scroll-mt-40 border-b border-gray-100 dark:border-gray-800 pb-12">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">05</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">Security Protocols</h2>
                <p>
                  We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                </p>
              </section>

              <section id="rights" class="mb-20 scroll-mt-40 border-b border-gray-100 dark:border-gray-800 pb-12">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">06</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">Your Rights</h2>
                <p>
                  Depending on your location (e.g., GDPR for Europe, NDPR for Nigeria), you may have the right to access, correct, or delete the personal information we collect.
                </p>
                <p>
                  To request a deletion of your Directory Profile, please execute the deletion protocol via email.
                </p>
              </section>

              <section id="contact" class="scroll-mt-40">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">07</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">Official Contact</h2>
                <p class="mb-8">
                  If you have questions or comments about this policy, you may contact the OPS Legal Division.
                </p>
                
                <div class="flex flex-col md:flex-row gap-6">
                   <a href="mailto:orderlyproblemsolvers@gmail.com" class="flex-1 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] p-6 text-center font-sans font-bold uppercase text-xs tracking-widest hover:opacity-90">
                     Email Legal Team
                   </a>
                   <div class="flex-1 border border-gray-200 dark:border-gray-700 p-6 text-center">
                     <p class="font-sans font-bold text-xs uppercase tracking-widest mb-1 text-gray-500">Mailing Address</p>
                     <p class="font-serif font-bold">Abuja, Nigeria</p>
                   </div>
                </div>
              </section>

           </div>
        </div>

      </div>
    </div>
  </div>
</template>