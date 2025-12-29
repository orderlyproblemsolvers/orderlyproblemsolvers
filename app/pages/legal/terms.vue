<script setup lang="ts">
// DOCUMENT METADATA
const lastUpdated = 'October 24, 2025'
const docId = 'OPS-LEGAL-002'

// NAVIGATION LINKS
const sections = [
  { id: 'acceptance', label: '01. Acceptance' },
  { id: 'directory', label: '02. Directory Rules' },
  { id: 'content', label: '03. User Content' },
  { id: 'ip', label: '04. Intellectual Property' },
  { id: 'studio', label: '05. OPS Studio' },
  { id: 'termination', label: '06. Termination' },
  { id: 'liability', label: '07. Liability' }
]
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-serif text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div class="border-b-2 border-[#051C2C] dark:border-white pt-32 pb-12 bg-gray-50 dark:bg-[#0A253A]">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
           <div class="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 space-y-1">
             <p>Doc_ID: <span class="text-[#051C2C] dark:text-white">{{ docId }}</span></p>
             <p>Status: <span class="bg-[#00A9F4] text-white px-1">Enforceable</span></p>
             <p>Date: {{ lastUpdated }}</p>
           </div>
           
           <div class="hidden md:block h-px flex-grow bg-gray-300 dark:bg-gray-600 mx-8 mb-1"></div>
           
           <div class="font-bold text-xs uppercase tracking-[0.2em] text-[#051C2C] dark:text-white">
             OPS Legal Division
           </div>
        </div>

        <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-none text-[#051C2C] dark:text-white uppercase">
          Terms of Service<span class="text-[#00A9F4]">.</span>
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
              
              <section id="acceptance" class="mb-20 scroll-mt-40 border-b border-gray-100 dark:border-gray-800 pb-12">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">01</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">Acceptance of Terms</h2>
                <p>
                  By accessing and using the Orderly Problem Solvers ("OPS") website, directory, or services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </p>
              </section>

              <section id="directory" class="mb-20 scroll-mt-40 border-b border-gray-100 dark:border-gray-800 pb-12">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">02</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">Directory Listing Rules</h2>
                <p>
                  OPS aims to maintain a high-quality index of verified problem solvers. By submitting your profile or company to the directory, you agree to the following covenants:
                </p>
                <ul class="font-sans text-sm font-bold uppercase tracking-wider list-disc pl-5 space-y-3 text-gray-600 dark:text-gray-300">
                  <li>All information provided is accurate, current, and not misleading.</li>
                  <li>You have the authority to represent the company or entity you are listing.</li>
                  <li>You will not use the directory for spam, harassment, or illegal activities.</li>
                </ul>
                
                <div class="mt-8 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10 p-6">
                   <p class="font-sans font-bold text-xs uppercase tracking-widest mb-2 text-red-600 dark:text-red-400">Moderation Notice</p>
                   <p class="text-sm m-0 text-[#051C2C] dark:text-white">
                     We reserve the right to reject, edit, or remove any listing at our sole discretion if it violates our quality standards or these terms.
                   </p>
                </div>
              </section>

              <section id="content" class="mb-20 scroll-mt-40 border-b border-gray-100 dark:border-gray-800 pb-12">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">03</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">User Generated Content</h2>
                <p>
                  You retain ownership of the content you submit (e.g., bios, logos, project descriptions). However, by submitting content to OPS, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with the OPS Platform.
                </p>
              </section>

              <section id="ip" class="mb-20 scroll-mt-40 border-b border-gray-100 dark:border-gray-800 pb-12">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">04</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">Intellectual Property</h2>
                <p>
                  The OPS brand, logo, website design, "The Journal" editorial content, and the underlying code of the platform are the exclusive property of Orderly Problem Solvers. You agree not to copy, distribute, or create derivative works from our intellectual property without explicit permission.
                </p>
              </section>

              <section id="studio" class="mb-20 scroll-mt-40 border-b border-gray-100 dark:border-gray-800 pb-12">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">05</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">OPS Studio Services</h2>
                <p>
                  Engagements with <strong>OPS Studio</strong> (our design and development agency) are governed by separate Master Services Agreements (MSA) and Statements of Work (SOW). These Terms of Service apply primarily to the use of the public platform and directory.
                </p>
              </section>

              <section id="termination" class="mb-20 scroll-mt-40 border-b border-gray-100 dark:border-gray-800 pb-12">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">06</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">Termination</h2>
                <p>
                  We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              <section id="liability" class="scroll-mt-40">
                <span class="font-mono text-xs font-bold text-[#00A9F4] mb-2 block">07</span>
                <h2 class="text-3xl mb-6 text-[#051C2C] dark:text-white">Limitation of Liability</h2>
                <p>
                  In no event shall OPS, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
              </section>

           </div>
        </div>

      </div>
    </div>
  </div>
</template>