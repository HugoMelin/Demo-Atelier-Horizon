<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { ArrowRight, BriefcaseBusiness, CheckCircle } from '@lucide/vue'
import { motion } from 'motion-v'
import { useRouter } from 'vue-router'

import {Button} from '@/components/ui/button'
import IconBlock from '@/components/blocks/IconBlock.vue'
import RichTextBlock from '@/components/blocks/RichTextBlock.vue'
import {
  useMethodologyStore,
  useServiceStore,
  useTestimonialStore,
  useTrustReasonStore,
} from '@/stores'

const router = useRouter()

const { items: serviceResponse } = storeToRefs(useServiceStore())
const { items: methodologyResponse } = storeToRefs(useMethodologyStore())
const { items: testimonialResponse } = storeToRefs(useTestimonialStore())
const { items: trustReasonResponse } = storeToRefs(useTrustReasonStore())

const services = computed(() =>
  [...(serviceResponse.value?.data ?? [])].sort((a, b) => (a.Ordre ?? 0) - (b.Ordre ?? 0)),
)
const methodologies = computed(() =>
  [...(methodologyResponse.value?.data ?? [])].sort(
    (a, b) => (a.Ordre ?? 0) - (b.Ordre ?? 0),
  ),
)
const testimonials = computed(() => testimonialResponse.value?.data ?? [])
const trustReasons = computed(() =>
  [...(trustReasonResponse.value?.data ?? [])].sort((a, b) => a.Ordre - b.Ordre),
)

const navigateTo = (path: string) => router.push(path)

const starFillPercentage = (rating: number, star: number) => {
  const fill = Math.min(1, Math.max(0, rating - (star - 1)))

  return `${fill * 100}%`
}

const starPath =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69z'

const revealTransition = {
  duration: 0.6,
  ease: [0.21, 0.47, 0.32, 0.98],
}
</script>

<template>
  <div class="min-h-screen bg-[#FAFAFA]">
    <!-- Hero -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-[#0F172A] to-[#1e293b] text-white"
    >
      <div class="absolute inset-0 opacity-10" aria-hidden="true">
        <motion.div
          class="absolute top-20 right-20 h-72 w-72 rounded-full bg-[#6B8E7A] blur-3xl"
          :animate="{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }"
          :transition="{ duration: 8, repeat: Infinity, ease: 'easeInOut' }"
        />
        <motion.div
          class="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-[#6B8E7A] blur-3xl"
          :animate="{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }"
          :transition="{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }"
        />
      </div>

      <div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <div class="max-w-3xl">
          <motion.h1
            class="mb-6 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl"
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ ...revealTransition, duration: 0.8 }"
          >
            Clarifiez votre vision, accélérez votre croissance
          </motion.h1>
          <motion.p
            class="mb-8 text-xl leading-relaxed text-gray-300"
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ ...revealTransition, duration: 0.8, delay: 0.2 }"
          >
            Conseil stratégique pour entrepreneurs et dirigeants qui souhaitent structurer leur
            développement et prendre les bonnes décisions.
          </motion.p>
          <motion.div
            class="flex flex-col gap-4 sm:flex-row"
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ ...revealTransition, duration: 0.8, delay: 0.4 }"
          >
            <Button
              size="lg"
              variant="secondary"
              type="button"
              @click="navigateTo('/contact')"
            >
              Réserver un appel découverte
              <ArrowRight class="ml-2 size-5" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              type="button"
              @click="navigateTo('/services')"
              class="bg-transparent border-white text-white hover:bg-white hover:text-[#0F172A]"
            >
              Découvrir les offres
            </Button>
          </motion.div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          class="mb-12 text-center sm:mb-16"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, amount: 0.3 }"
          :transition="revealTransition"
        >
          <h2 class="mb-4 text-3xl font-bold text-[#0F172A] sm:text-4xl">
            Des accompagnements sur-mesure
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-[#6B7280]">
            Trois formules pensées pour répondre à vos besoins spécifiques
          </p>
        </motion.div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.article
            v-for="(service, index) in services"
            :key="service.documentId"
            class="group h-full rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
            :initial="{ opacity: 0, y: 24 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :while-hover="{ y: -5 }"
            :viewport="{ once: true, amount: 0.2 }"
            :transition="{ ...revealTransition, delay: index * 0.1 }"
          >
            <motion.div
              class="mb-6 flex size-14 items-center justify-center rounded-lg bg-[#F5F3EE] transition-colors group-hover:bg-[#6B8E7A]"
              :while-hover="{ rotate: [0, -10, 10, -10, 0] }"
              :transition="{ duration: 0.5 }"
            >
              <IconBlock
                v-if="service.Icon"
                :icon="service.Icon"
                class="size-7 text-[#0F172A] transition-colors group-hover:text-white"
              />
              <BriefcaseBusiness
                v-else
                class="size-7 text-[#0F172A] transition-colors group-hover:text-white"
                aria-hidden="true"
              />
            </motion.div>
            <h3 class="mb-3 text-xl font-semibold text-[#0F172A]">{{ service.Titre }}</h3>
            <p v-if="service.Sous_titre" class="mb-3 text-sm font-medium text-[#6B8E7A]">
              {{ service.Sous_titre }}
            </p>
            <RichTextBlock
              :richtext="service.Description"
              class="leading-relaxed text-[#6B7280]"
            />
          </motion.article>
        </div>
      </div>
    </section>

    <!-- Méthodologie -->
    <section class="bg-white py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          class="mb-12 text-center sm:mb-16"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, amount: 0.3 }"
          :transition="revealTransition"
        >
          <h2 class="mb-4 text-3xl font-bold text-[#0F172A] sm:text-4xl">
            Une méthode éprouvée
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-[#6B7280]">
            Un processus structuré en 4 étapes pour des résultats concrets
          </p>
        </motion.div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            v-for="(step, index) in methodologies"
            :key="step.documentId"
            class="relative"
            :initial="{ opacity: 0, y: 24 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.2 }"
            :transition="{ ...revealTransition, delay: index * 0.1 }"
          >
            <motion.article
              class="h-full rounded-xl bg-[#F5F3EE] p-8"
              :while-hover="{ y: -5 }"
              :transition="{ duration: 0.2 }"
            >
              <div class="mb-4 flex items-center justify-between">
                <motion.span
                  class="text-5xl font-bold text-[#6B8E7A] opacity-50"
                  :initial="{ scale: 0 }"
                  :while-in-view="{ scale: 1 }"
                  :viewport="{ once: true }"
                  :transition="{ duration: 0.5, delay: index * 0.1 }"
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </motion.span>
              </div>
              <h3 class="mb-3 text-lg font-semibold text-[#0F172A]">{{ step.Titre }}</h3>
              <p v-if="step.Soustitre" class="mb-3 text-sm font-medium text-[#6B8E7A]">
                {{ step.Soustitre }}
              </p>
              <RichTextBlock
                :richtext="step.Description"
                class="text-sm leading-relaxed text-[#6B7280]"
              />
            </motion.article>
          </motion.div>
        </div>
      </div>
    </section>

    <!-- Témoignages -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          class="mb-12 text-center sm:mb-16"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true, amount: 0.3 }"
          :transition="revealTransition"
        >
          <h2 class="mb-4 text-3xl font-bold text-[#0F172A] sm:text-4xl">
            Ils nous font confiance
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-[#6B7280]">
            Des résultats concrets pour nos clients
          </p>
        </motion.div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.article
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.documentId"
            class="h-full rounded-xl border border-gray-100 bg-white p-8 shadow-sm flex flex-col"
            :initial="{ opacity: 0, y: 24 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, amount: 0.2 }"
            :transition="{ ...revealTransition, delay: index * 0.1 }"
          >
            <div
              class="mb-4 flex gap-0.5"
              role="img"
              :aria-label="`${testimonial.Note} étoiles sur 5`"
            >
              <motion.span
                v-for="star in 5"
                :key="star"
                class="relative block size-5"
                aria-hidden="true"
                :initial="{ scale: 0, rotate: -180 }"
                :while-in-view="{ scale: 1, rotate: 0 }"
                :viewport="{ once: true }"
                :transition="{ duration: 0.3, delay: (star - 1) * 0.1 }"
              >
                <svg class="size-5 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                  <path :d="starPath" />
                </svg>
                <span
                  class="absolute inset-y-0 left-0 overflow-hidden"
                  :style="{ width: starFillPercentage(testimonial.Note, star) }"
                >
                  <svg class="size-5 max-w-none text-[#6B8E7A]" fill="currentColor" viewBox="0 0 20 20">
                    <path :d="starPath" />
                  </svg>
                </span>
              </motion.span>
            </div>
            <RichTextBlock
              :richtext="testimonial.Contenu"
              class="mb-6 leading-relaxed text-[#1F2933] italic flex-grow"
            />
            <div class="font-semibold text-[#0F172A]">{{ testimonial.Nom }}</div>
            <div v-if="testimonial.Role" class="text-sm text-[#6B7280]">
              {{ testimonial.Role }}
            </div>
          </motion.article>
        </div>
      </div>
    </section>

    <!-- Confiance -->
    <section class="bg-[#F5F3EE] py-16 sm:py-24">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          class="mb-8 text-3xl font-bold text-[#0F172A] sm:text-4xl"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="revealTransition"
        >
          Pourquoi me faire confiance ?
        </motion.h2>
        <div class="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <motion.div
            v-for="(reason, index) in trustReasons"
            :key="reason.documentId"
            class="flex items-start space-x-3 rounded-lg bg-white p-6 text-left"
            :initial="{ opacity: 0, y: 20 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :while-hover="{ scale: 1.02 }"
            :viewport="{ once: true }"
            :transition="{ duration: 0.3, delay: index * 0.08 }"
          >
            <IconBlock
              v-if="reason.Icon"
              :icon="reason.Icon"
              class="mt-1 size-6 shrink-0 text-[#6B8E7A]"
            />
            <CheckCircle v-else class="mt-1 size-6 shrink-0 text-[#6B8E7A]" aria-hidden="true" />
            <span class="text-[#1F2933]">{{ reason.Description }}</span>
          </motion.div>
        </div>
      </div>
    </section>

    <!-- Appel à l'action -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          class="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1e293b] p-12 shadow-xl sm:p-16"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :while-hover="{ scale: 1.02 }"
          :viewport="{ once: true, amount: 0.3 }"
          :transition="{ duration: 0.3 }"
        >
          <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Prêt à passer à l'action ?
          </h2>
          <p class="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            Réservez un appel découverte gratuit de 30 minutes pour discuter de vos enjeux
          </p>
          <Button
            size="lg"
            variant="secondary"
            type="button"
            @click="navigateTo('/contact')"
          >
            Réserver mon appel découverte
            <ArrowRight class="ml-2 size-5" aria-hidden="true" />
          </Button>
        </motion.div>
      </div>
    </section>
  </div>
</template>
