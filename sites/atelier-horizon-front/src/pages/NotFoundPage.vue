<script setup lang="ts">
import { ArrowLeft, Compass, Home } from '@lucide/vue'
import { motion } from 'motion-v'
import { useRouter } from 'vue-router'

import { Button } from '@/components/ui/button'

const router = useRouter()

const navigationItems = [
  { label: 'À propos', path: '/about' },
  { label: 'Offres', path: '/offers' },
  { label: 'Méthodologie', path: '/methodology' },
  { label: 'Toréfi.fr', path: 'https://torefi.fr', external: true },
]

const navigateTo = (path: string) => router.push(path)
</script>

<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F5F3EE] px-4 sm:px-6"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        class="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#0F172A] opacity-[0.03]"
        :animate="{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }"
        :transition="{ duration: 14, repeat: Infinity, ease: 'easeInOut' }"
      />
      <motion.div
        class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#6B8E7A] opacity-[0.07]"
        :animate="{ scale: [1, 1.1, 1], rotate: [0, -8, 0] }"
        :transition="{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }"
      />
      <motion.div
        class="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-[#6B8E7A] opacity-30"
        :animate="{ y: [-10, 10, -10] }"
        :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
      />
      <motion.div
        class="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-[#0F172A] opacity-20"
        :animate="{ y: [8, -8, 8] }"
        :transition="{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }"
      />
    </div>

    <div class="relative z-10 max-w-2xl w-full text-center">
      <!-- Compass icon - animated -->
      <motion.div
        class="flex justify-center mb-8"
        :initial="{ opacity: 0, scale: 0.7 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }"
      >
        <div class="relative">
          <div
            class="w-24 h-24 rounded-full bg-[#0F172A] flex items-center justify-center shadow-xl"
          >
            <motion.div
              :animate="{ rotate: [0, 15, -10, 5, 0] }"
              :transition="{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: 'easeInOut',
              }"
            >
              <Compass class="w-11 h-11 text-[#F5F3EE]" aria-hidden="true" />
            </motion.div>
          </div>
          <motion.div
            class="absolute -inset-2 rounded-full border-2 border-[#6B8E7A] opacity-30"
            :animate="{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }"
            :transition="{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }"
          />
        </div>
      </motion.div>

      <!-- 404 number -->
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }"
      >
        <span
          class="block text-[10rem] sm:text-[12rem] font-bold leading-none tracking-tighter text-[#0F172A] opacity-[0.06] select-none"
        >
          404
        </span>
      </motion.div>

      <!-- Main content — overlaps the ghost 404 -->
      <motion.div
        class="-mt-16 sm:-mt-20"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }"
      >
        <h1 class="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">Page introuvable</h1>
        <p class="text-lg text-[#6B7280] leading-relaxed mb-2 max-w-md mx-auto">
          Il semble que vous vous soyez éloigné de la route. Cette page n'existe pas ou a été
          déplacée.
        </p>
        <p class="text-sm text-[#6B8E7A] font-medium mb-10">
          Pas de panique — retrouvons votre cap ensemble.
        </p>

        <!-- Divider -->
        <div class="flex items-center justify-center gap-4 mb-10">
          <div class="h-px w-16 bg-[#0F172A] opacity-10" />
          <div class="w-1.5 h-1.5 rounded-full bg-[#6B8E7A]" />
          <div class="h-px w-16 bg-[#0F172A] opacity-10" />
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="primary" class="group" @click="navigateTo('/')">
            <Home class="mr-2 w-5 h-5" aria-hidden="true" />
            Retour à l'accueil
          </Button>
          <Button size="lg" variant="outline" @click="navigateTo('/contact')">
            <ArrowLeft class="mr-2 w-5 h-5" aria-hidden="true" />
            Nous contacter
          </Button>
        </div>
      </motion.div>

      <!-- Navigation suggestions -->
      <motion.div
        class="mt-16 pt-8 border-t border-[#0F172A]/10"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.6, delay: 0.5 }"
      >
        <p class="text-xs text-[#6B7280] uppercase tracking-widest mb-5 font-medium">
          Pages principales
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <div v-for="item in navigationItems" :key="item.label" class="text-sm font-medium text-[#0F172A] bg-white rounded-lg border border-[#0F172A]/10 hover:border-[#6B8E7A] hover:text-[#6B8E7A] transition-colors duration-200 shadow-sm">
            <a
              v-if="item.external"
              :href="item.path"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 block w-full h-full"
            >
              {{ item.label }}
            </a>
            <button
              v-else
              type="button"
              class="px-4 py-2"
              @click="navigateTo(item.path)"
            >
              {{ item.label }}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</template>
