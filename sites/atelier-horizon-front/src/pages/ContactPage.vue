<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { CheckCircle, Send } from '@lucide/vue'
import { motion } from 'motion-v'

import IconBlock from '@/components/blocks/IconBlock.vue'
import RichTextBlock from '@/components/blocks/RichTextBlock.vue'
import { AnimatedSection, FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { Button } from '@/components/ui/button'
import { useFaqStore, useInfoStore } from '@/stores'

const { items: faqResponse } = storeToRefs(useFaqStore())
const { items: infoResponse } = storeToRefs(useInfoStore())

const submitted = ref(false)
const formData = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
})

const contactInfo = computed(() =>
  [...(infoResponse.value?.data ?? [])].sort((a, b) => (a.Ordre ?? 0) - (b.Ordre ?? 0)),
)
const faqs = computed(() => faqResponse.value?.data?.Question ?? [])

const trustItems = [
  {
    emoji: '🤝',
    title: 'Confidentiel',
    text: 'Vos informations restent confidentielles',
  },
  { emoji: '💡', title: 'Sans engagement', text: 'Aucune obligation de suite' },
  { emoji: '⚡', title: 'Rapide', text: '30 minutes pour faire le point' },
]

const handleSubmit = () => {
  submitted.value = true
}
</script>

<template>
  <div class="min-h-screen bg-[#FAFAFA]">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-[#0F172A] to-[#1e293b] py-16 text-white sm:py-24">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 class="mb-6 text-4xl font-bold sm:text-5xl">Parlons de votre projet</h1>
        <p class="text-xl leading-relaxed text-gray-300">
          Un appel découverte gratuit de 30 minutes pour échanger sur vos enjeux et explorer comment
          je peux vous accompagner.
        </p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <!-- Contact Form -->
          <FadeIn direction="up" class="lg:col-span-2">
            <motion.div
              class="rounded-2xl bg-white p-8 shadow-lg sm:p-12"
              :while-hover="{
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }"
              :transition="{ duration: 0.3 }"
            >
              <h2 class="mb-6 text-2xl font-bold text-[#0F172A] sm:text-3xl">
                Envoyez-moi un message
              </h2>

              <motion.div
                v-if="submitted"
                class="mb-6 rounded-lg border-l-4 border-[#6B8E7A] bg-[#E0F2F1] p-6"
                :initial="{ opacity: 0, scale: 0.9 }"
                :animate="{ opacity: 1, scale: 1 }"
                :transition="{ duration: 0.4 }"
                role="status"
              >
                <div class="flex items-center gap-3">
                  <CheckCircle class="size-6 text-[#6B8E7A]" aria-hidden="true" />
                  <div>
                    <h3 class="font-semibold text-[#0F172A]">Message envoyé avec succès !</h3>
                    <p class="text-sm text-[#6B7280]">
                      Je vous répondrai dans les plus brefs délais.
                    </p>
                  </div>
                </div>
              </motion.div>

              <form v-else class="space-y-6" @submit.prevent="handleSubmit">
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <motion.div
                    :initial="{ opacity: 0, x: -20 }"
                    :while-in-view="{ opacity: 1, x: 0 }"
                    :viewport="{ once: true }"
                    :transition="{ duration: 0.4, delay: 0.1 }"
                  >
                    <label for="name" class="mb-2 block text-sm font-medium text-[#1F2933]">
                      Nom complet *
                    </label>
                    <input
                      id="name"
                      v-model="formData.name"
                      name="name"
                      type="text"
                      autocomplete="name"
                      required
                      class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#6B8E7A]"
                      placeholder="Votre nom"
                    />
                  </motion.div>

                  <motion.div
                    :initial="{ opacity: 0, x: 20 }"
                    :while-in-view="{ opacity: 1, x: 0 }"
                    :viewport="{ once: true }"
                    :transition="{ duration: 0.4, delay: 0.2 }"
                  >
                    <label for="email" class="mb-2 block text-sm font-medium text-[#1F2933]">
                      Email *
                    </label>
                    <input
                      id="email"
                      v-model="formData.email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#6B8E7A]"
                      placeholder="votre@email.com"
                    />
                  </motion.div>
                </div>

                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <motion.div
                    :initial="{ opacity: 0, x: -20 }"
                    :while-in-view="{ opacity: 1, x: 0 }"
                    :viewport="{ once: true }"
                    :transition="{ duration: 0.4, delay: 0.3 }"
                  >
                    <label for="phone" class="mb-2 block text-sm font-medium text-[#1F2933]">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      v-model="formData.phone"
                      name="phone"
                      type="tel"
                      autocomplete="tel"
                      class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#6B8E7A]"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </motion.div>

                  <motion.div
                    :initial="{ opacity: 0, x: 20 }"
                    :while-in-view="{ opacity: 1, x: 0 }"
                    :viewport="{ once: true }"
                    :transition="{ duration: 0.4, delay: 0.4 }"
                  >
                    <label for="company" class="mb-2 block text-sm font-medium text-[#1F2933]">
                      Entreprise
                    </label>
                    <input
                      id="company"
                      v-model="formData.company"
                      name="company"
                      type="text"
                      autocomplete="organization"
                      class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#6B8E7A]"
                      placeholder="Votre entreprise"
                    />
                  </motion.div>
                </div>

                <motion.div
                  :initial="{ opacity: 0, y: 20 }"
                  :while-in-view="{ opacity: 1, y: 0 }"
                  :viewport="{ once: true }"
                  :transition="{ duration: 0.4, delay: 0.5 }"
                >
                  <label for="message" class="mb-2 block text-sm font-medium text-[#1F2933]">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    v-model="formData.message"
                    name="message"
                    required
                    :rows="6"
                    class="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#6B8E7A]"
                    placeholder="Parlez-moi de votre projet, vos enjeux, vos objectifs..."
                  />
                </motion.div>

                <motion.div
                  :initial="{ opacity: 0, y: 20 }"
                  :while-in-view="{ opacity: 1, y: 0 }"
                  :viewport="{ once: true }"
                  :transition="{ duration: 0.4, delay: 0.6 }"
                >
                  <Button type="submit" variant="secondary" size="lg" class="w-full sm:w-auto">
                    Envoyer le message
                    <Send class="ml-2 size-5" aria-hidden="true" />
                  </Button>
                </motion.div>

                <p class="text-sm text-[#6B7280]">* Champs obligatoires</p>
              </form>

              <div class="mt-8 border-t border-gray-200 pt-8">
                <motion.div
                  class="rounded-lg bg-[#F5F3EE] p-6"
                  :while-hover="{ scale: 1.02 }"
                  :transition="{ duration: 0.2 }"
                >
                  <h3 class="mb-2 font-semibold text-[#0F172A]">
                    <span aria-hidden="true">📅</span> Préférez réserver directement ?
                  </h3>
                  <p class="mb-4 text-[#6B7280]">
                    Choisissez un créneau qui vous convient pour un appel découverte gratuit de 30
                    minutes.
                  </p>
                  <button type="button" class="font-medium text-[#6B8E7A] hover:underline">
                    Voir les créneaux disponibles →
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </FadeIn>

          <!-- Sidebar -->
          <div class="space-y-8 lg:col-span-1">
            <!-- Contact Info -->
            <FadeIn direction="right" :delay="0.2">
              <div class="rounded-2xl bg-white p-8 shadow-lg">
                <h3 class="mb-6 text-xl font-semibold text-[#0F172A]">Coordonnées</h3>
                <StaggerContainer class="space-y-6">
                  <StaggerItem v-for="info in contactInfo" :key="info.documentId">
                    <motion.div
                      class="flex items-start gap-4"
                      :while-hover="{ x: 5 }"
                      :transition="{ duration: 0.2 }"
                    >
                      <div
                        class="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#F5F3EE]"
                      >
                        <IconBlock :icon="info.Icon" class="size-6 text-[#6B8E7A]" />
                      </div>
                      <div>
                        <div class="mb-1 text-sm text-[#6B7280]">{{ info.Label }}</div>
                        <a
                          v-if="info.Lien"
                          :href="info.Lien"
                          class="font-medium text-[#0F172A] transition-colors hover:text-[#6B8E7A]"
                        >
                          {{ info.Valeur }}
                        </a>
                        <div v-else class="font-medium text-[#0F172A]">{{ info.Valeur }}</div>
                      </div>
                    </motion.div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </FadeIn>

            <!-- Availability -->
            <FadeIn direction="right" :delay="0.3">
              <div class="rounded-2xl bg-[#F5F3EE] p-8">
                <h3 class="mb-4 text-xl font-semibold text-[#0F172A]">Disponibilité</h3>
                <div class="space-y-3 text-[#1F2933]">
                  <div class="flex justify-between">
                    <span class="text-[#6B7280]">Lundi - Vendredi</span>
                    <span class="font-medium">9h - 18h</span>
                  </div>
                  <div class="border-t border-gray-300 pt-3">
                    <p class="text-sm text-[#6B7280]">Je réponds généralement sous 24h ouvrées</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <!-- Quick FAQs -->
            <FadeIn direction="right" :delay="0.4">
              <div class="rounded-2xl bg-white p-8 shadow-lg">
                <h3 class="mb-6 text-xl font-semibold text-[#0F172A]">Questions fréquentes</h3>
                <div class="space-y-4">
                  <motion.div
                    v-for="(faq, index) in faqs"
                    :key="faq.id"
                    :initial="{ opacity: 0 }"
                    :while-in-view="{ opacity: 1 }"
                    :viewport="{ once: true }"
                    :transition="{ duration: 0.4, delay: index * 0.1 }"
                  >
                    <h4 class="mb-2 font-medium text-[#0F172A]">{{ faq.Question }}</h4>
                    <RichTextBlock :richtext="faq.Reponse" class="text-sm text-[#6B7280]" />
                    <div v-if="index < faqs.length - 1" class="mt-4 border-b border-gray-200" />
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="bg-white py-16">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 class="mb-4 text-2xl font-bold text-[#0F172A] sm:text-3xl">
            Un échange sans engagement
          </h2>
          <p class="mb-8 text-lg text-[#6B7280]">
            L'appel découverte est l'occasion de faire connaissance et de voir si nous pouvons
            travailler ensemble. Aucune obligation, juste un échange sincère sur vos enjeux.
          </p>
        </AnimatedSection>
        <StaggerContainer class="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StaggerItem v-for="item in trustItems" :key="item.title">
            <motion.div
              class="rounded-lg bg-[#F5F3EE] p-6 flex flex-col items-center text-center transition-transform h-full"
              :while-hover="{
                y: -5,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }"
              :transition="{ duration: 0.2 }"
            >
              <div class="mb-2 text-3xl" aria-hidden="true">{{ item.emoji }}</div>
              <h3 class="mb-1 font-semibold text-[#0F172A] flex-grow">{{ item.title }}</h3>
              <p class="text-sm text-[#6B7280]">{{ item.text }}</p>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  </div>
</template>
