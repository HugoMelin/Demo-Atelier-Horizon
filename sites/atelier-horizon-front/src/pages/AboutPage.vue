<script setup lang="ts">
import { computed } from 'vue'
import { Award } from '@lucide/vue'
import { storeToRefs } from 'pinia'
import { motion } from 'motion-v'
import { useRouter } from 'vue-router'

import IconBlock from '@/components/blocks/IconBlock.vue'
import RichTextBlock from '@/components/blocks/RichTextBlock.vue'
import {
  AnimatedSection,
  AnimatedCard,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from '@/components/ui/animated'

import { useAboutStore, useJourneyStore } from '@/stores'

const { items: aboutResponse } = storeToRefs(useAboutStore())
const { items: journeyResponse } = storeToRefs(useJourneyStore())

const router = useRouter()

const values = computed(() =>
  [...(aboutResponse.value?.data ?? [])].sort((a, b) => a.Order - b.Order),
)
const journey = computed(() =>
  [...(journeyResponse.value?.data ?? [])].sort((a, b) => (a.Ordre ?? 0) - (b.Ordre ?? 0)),
)

const navigateToContact = () => router.push('/contact')
</script>

<template>
  <div class="min-h-screen bg-[#FAFAFA]">
    <!-- Hero Section -->
    <section class="bg-white py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Image -->
          <FadeIn direction="left" class="order-2 lg:order-1">
            <motion.img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80"
              alt="Portrait professionnel"
              class="rounded-2xl shadow-xl w-full h-auto"
              :while-hover="{ scale: 1.02 }"
              :transition="{ duration: 0.3 }"
            />
          </FadeIn>

          <!-- Content -->
          <FadeIn direction="right" class="order-1 lg:order-2">
            <motion.h1
              class="text-4xl sm:text-5xl font-bold text-[#0F172A] mb-6"
              :initial="{ opacity: 0, x: 30 }"
              :while-in-view="{ opacity: 1, x: 0 }"
              :viewport="{ once: true }"
              :transition="{ duration: 0.6 }"
            >
              À propos d'Atelier Horizon
            </motion.h1>
            <div class="space-y-4 text-lg text-[#1F2933] leading-relaxed">
              <motion.p
                :initial="{ opacity: 0, y: 20 }"
                :while-in-view="{ opacity: 1, y: 0 }"
                :viewport="{ once: true }"
                :transition="{ duration: 0.5, delay: 0.1 }"
              >
                Bonjour, je suis <span class="font-semibold text-[#6B8E7A]">Thomas Mercier</span>,
                fondateur d'Atelier Horizon.
              </motion.p>
              <motion.p
                :initial="{ opacity: 0, y: 20 }"
                :while-in-view="{ opacity: 1, y: 0 }"
                :viewport="{ once: true }"
                :transition="{ duration: 0.5, delay: 0.2 }"
              >
                Après plus de 10 ans dans le conseil stratégique et la direction d'entreprise, j'ai
                décidé de mettre mon expérience au service des entrepreneurs et dirigeants qui font
                face à des décisions complexes.
              </motion.p>
              <motion.p
                :initial="{ opacity: 0, y: 20 }"
                :while-in-view="{ opacity: 1, y: 0 }"
                :viewport="{ once: true }"
                :transition="{ duration: 0.5, delay: 0.3 }"
              >
                Ma conviction :
                <span class="font-semibold">la stratégie ne doit pas être compliquée</span>. Elle
                doit être claire, pragmatique et alignée avec vos valeurs et vos ambitions.
              </motion.p>
              <motion.p
                :initial="{ opacity: 0, y: 20 }"
                :while-in-view="{ opacity: 1, y: 0 }"
                :viewport="{ once: true }"
                :transition="{ duration: 0.5, delay: 0.4 }"
              >
                Mon approche combine rigueur méthodologique et écoute attentive pour vous aider à
                structurer votre développement et à prendre les bonnes décisions au bon moment.
              </motion.p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    <!-- Vision Section -->
    <section class="py-16 sm:py-24 bg-[#F5F3EE]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 class="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-6">Ma vision</h2>
          <p class="text-xl text-[#1F2933] leading-relaxed mb-8">
            Je crois que chaque entrepreneur mérite un accompagnement de qualité, accessible et
            humain. Mon objectif n'est pas de créer une dépendance, mais de vous donner les outils
            et la confiance nécessaires pour devenir autonome dans vos décisions stratégiques.
          </p>
          <motion.blockquote
            class="text-2xl font-medium text-[#6B8E7A] italic"
            :initial="{ opacity: 0, scale: 0.9 }"
            :while-in-view="{ opacity: 1, scale: 1 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.6, delay: 0.3 }"
          >
            "Le meilleur conseil est celui qui vous rend autonome."
          </motion.blockquote>
        </AnimatedSection>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 sm:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection class="text-center mb-12 sm:mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">Mes valeurs</h2>
          <p class="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Les principes qui guident chacune de mes interventions
          </p>
        </AnimatedSection>

        <StaggerContainer class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StaggerItem v-for="value in values" :key="value.documentId">
            <AnimatedCard
              class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow h-full"
            >
              <motion.div
                class="w-14 h-14 bg-[#F5F3EE] rounded-lg flex items-center justify-center mb-6"
                :while-hover="{ rotate: 360, scale: 1.1 }"
                :transition="{ duration: 0.5 }"
              >
                <IconBlock v-if="value.Icon" :icon="value.Icon" class="w-7 h-7 text-[#6B8E7A]" />
                <Award v-else class="w-7 h-7 text-[#6B8E7A]" aria-hidden="true" />
              </motion.div>
              <h3 class="text-xl font-semibold text-[#0F172A] mb-3">
                {{ value.Title }}
              </h3>
              <RichTextBlock :richtext="value.Description" class="text-[#6B7280] leading-relaxed" />
            </AnimatedCard>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    <!-- Journey Section -->
    <section class="py-16 sm:py-24 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection class="text-center mb-12 sm:mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-4">Mon parcours</h2>
          <p class="text-lg text-[#6B7280]">
            Une expérience diversifiée au service de votre projet
          </p>
        </AnimatedSection>

        <div class="space-y-8">
          <motion.div
            v-for="(step, index) in journey"
            :key="step.documentId"
            class="relative pl-8 sm:pl-12 border-l-2 border-[#6B8E7A] pb-8 last:pb-0"
            :initial="{ opacity: 0, x: -30 }"
            :while-in-view="{ opacity: 1, x: 0 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.5, delay: index * 0.1 }"
          >
            <motion.div
              class="absolute left-0 top-0 w-4 h-4 bg-[#6B8E7A] rounded-full -translate-x-[9px]"
              :initial="{ scale: 0 }"
              :while-in-view="{ scale: 1 }"
              :viewport="{ once: true }"
              :transition="{ duration: 0.4, delay: index * 0.1 }"
            />
            <motion.div
              class="bg-[#F5F3EE] p-6 rounded-lg"
              :while-hover="{ x: 5 }"
              :transition="{ duration: 0.2 }"
            >
              <div class="text-sm font-semibold text-[#6B8E7A] mb-2">
                {{ step.Annee }}
              </div>
              <h3 class="text-xl font-semibold text-[#0F172A] mb-2">
                {{ step.Titre }}
              </h3>
              <RichTextBlock :richtext="step.Description" class="text-[#6B7280] leading-relaxed" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 sm:py-24 bg-gradient-to-br from-[#0F172A] to-[#1e293b]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Travaillons ensemble</h2>
          <p class="text-xl text-gray-300 mb-8">
            Discutons de vos enjeux et voyons comment je peux vous accompagner
          </p>
          <motion.button
            type="button"
            @click="navigateToContact"
            class="px-8 py-4 bg-[#6B8E7A] text-white rounded-lg hover:bg-[#5a7768] transition-colors text-lg font-medium"
            :while-hover="{ scale: 1.05 }"
            :while-tap="{ scale: 0.95 }"
          >
            Prendre rendez-vous
          </motion.button>
        </FadeIn>
      </div>
    </section>
  </div>
</template>
