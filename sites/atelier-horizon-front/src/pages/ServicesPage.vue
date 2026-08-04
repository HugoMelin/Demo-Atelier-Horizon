<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { ArrowRight, CheckCircle, Clock, Users } from '@lucide/vue'
import { useRouter } from 'vue-router'

import RichTextBlock from '@/components/blocks/RichTextBlock.vue'
import { Button } from '@/components/ui/button'
import { AnimatedSection, FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animated'
import { useServiceStore } from '@/stores'

const router = useRouter()

const { items: serviceResponse } = storeToRefs(useServiceStore())

const services = computed(() =>
  [...(serviceResponse.value?.data ?? [])].sort((a, b) => (a.Ordre ?? 0) - (b.Ordre ?? 0)),
)

const navigateTo = (path: string) => router.push(path)
</script>

<template>
  <div class="min-h-screen bg-[#FAFAFA]">
    <!-- Hero -->
    <section class="bg-gradient-to-br from-[#0F172A] to-[#1e293b] py-16 text-white sm:py-24">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <h1 class="mb-6 text-4xl font-bold sm:text-5xl">
            Choisissez l'accompagnement qui vous correspond
          </h1>
        </FadeIn>
        <FadeIn :delay="0.15">
          <p class="text-xl leading-relaxed text-gray-300">
            Trois formules pensées pour répondre à vos besoins spécifiques, quel que soit votre
            niveau de maturité ou vos objectifs.
          </p>
        </FadeIn>
      </div>
    </section>

    <!-- Services -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="space-y-12">
          <AnimatedSection
            v-for="(service, index) in services"
            :key="service.documentId"
            :delay="index * 0.1"
          >
            <article
              class="overflow-hidden rounded-2xl bg-white shadow-lg"
              :class="{ 'ring-2 ring-[#6B8E7A]': service.Mis_en_avant }"
            >
              <div
                v-if="service.Mis_en_avant"
                class="bg-[#6B8E7A] px-4 py-2 text-center text-sm font-medium text-white"
              >
                <span aria-hidden="true">⭐</span> Le plus populaire
              </div>

              <div class="p-8 sm:p-12">
                <div class="mb-8">
                  <h2 class="mb-2 text-3xl font-bold text-[#0F172A]">
                    {{ service.Titre }}
                  </h2>
                  <p v-if="service.Sous_titre" class="mb-4 text-lg text-[#6B8E7A]">
                    {{ service.Sous_titre }}
                  </p>
                  <div class="flex flex-wrap items-center gap-4 text-[#6B7280]">
                    <span class="text-2xl font-semibold text-[#0F172A]">
                      {{ service.Prix }}
                    </span>
                    <div v-if="service.Duree" class="flex items-center gap-2">
                      <Clock class="size-5" aria-hidden="true" />
                      <span>{{ service.Duree }}</span>
                    </div>
                  </div>
                </div>

                <div class="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <div class="space-y-6">
                    <div
                      v-if="service.Probleme"
                      class="rounded-lg border-l-4 border-[#F59E0B] bg-[#FEF3C7] p-6"
                    >
                      <p class="font-medium text-[#92400E]">
                        {{ service.Probleme }}
                      </p>
                    </div>

                    <RichTextBlock
                      :richtext="service.Description"
                      class="leading-relaxed text-[#1F2933]"
                    />

                    <div v-if="service.Benefits.length">
                      <h3 class="mb-3 flex items-center font-semibold text-[#0F172A]">
                        <CheckCircle class="mr-2 size-5 text-[#6B8E7A]" aria-hidden="true" />
                        Ce qui est inclus
                      </h3>
                      <ul class="space-y-2">
                        <li
                          v-for="benefit in service.Benefits"
                          :key="benefit.id"
                          class="flex items-start gap-2"
                        >
                          <span class="mt-1.5 text-[#6B8E7A]" aria-hidden="true">•</span>
                          <span class="text-[#6B7280]">{{ benefit.Valeur }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="space-y-6">
                    <div v-if="service.Format.length">
                      <h3 class="mb-3 flex items-center font-semibold text-[#0F172A]">
                        <Users class="mr-2 size-5 text-[#6B8E7A]" aria-hidden="true" />
                        Le déroulé
                      </h3>
                      <div class="space-y-3 rounded-lg bg-[#F5F3EE] p-6">
                        <div
                          v-for="(step, stepIndex) in service.Format"
                          :key="step.id"
                          class="flex items-start gap-3"
                        >
                          <span
                            class="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#6B8E7A] text-sm font-medium text-white"
                          >
                            {{ stepIndex + 1 }}
                          </span>
                          <span class="text-[#1F2933]">{{ step.Valeur }}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      v-if="service.Pour_qui"
                      class="rounded-lg border-l-4 border-[#6B8E7A] bg-[#E0F2F1] p-6"
                    >
                      <h3 class="mb-2 font-semibold text-[#0F172A]">Pour qui ?</h3>
                      <p class="text-[#1F2933]">{{ service.Pour_qui }}</p>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row">
                  <Button
                    :variant="service.Mis_en_avant ? 'secondary' : 'primary'"
                    size="lg"
                    class="flex-1 sm:flex-none"
                    @click="navigateTo('/contact')"
                  >
                    Réserver un appel découverte
                    <ArrowRight class="ml-2 size-5" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    class="flex-1 sm:flex-none"
                    @click="navigateTo('/method')"
                  >
                    Découvrir la méthode
                  </Button>
                </div>
              </div>
            </article>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-white py-16 sm:py-24">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection class="mb-8 text-center">
          <h2 class="text-3xl font-bold text-[#0F172A]">Questions fréquentes</h2>
        </AnimatedSection>
        <StaggerContainer class="space-y-6">
          <StaggerItem>
            <div class="rounded-lg bg-[#F5F3EE] p-6">
              <h3 class="mb-2 font-semibold text-[#0F172A]">Comment choisir la bonne formule ?</h3>
              <p class="text-[#6B7280]">
                Je vous recommande de commencer par un appel découverte gratuit. Nous discuterons de
                vos enjeux et je vous orienterai vers la formule la plus adaptée à votre situation.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div class="rounded-lg bg-[#F5F3EE] p-6">
              <h3 class="mb-2 font-semibold text-[#0F172A]">
                Les séances se déroulent en présentiel ou en visio ?
              </h3>
              <p class="text-[#6B7280]">
                Les deux formats sont possibles. La plupart de mes clients préfèrent la visio pour
                plus de flexibilité, mais je me déplace volontiers en Île-de-France pour des
                sessions en présentiel.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div class="rounded-lg bg-[#F5F3EE] p-6">
              <h3 class="mb-2 font-semibold text-[#0F172A]">
                Puis-je changer de formule en cours de route ?
              </h3>
              <p class="text-[#6B7280]">
                Absolument. Si vous commencez par un diagnostic ou du mentorat ponctuel et souhaitez
                ensuite un accompagnement plus régulier, nous pouvons ajuster sans problème.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>

    <!-- Call to action -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedSection
          class="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1e293b] p-12 shadow-xl sm:p-16"
        >
          <h2 class="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Une question sur les offres ?
          </h2>
          <p class="mb-8 text-xl text-gray-300">
            Discutons de vos besoins lors d'un appel découverte gratuit
          </p>
          <Button size="lg" variant="secondary" @click="navigateTo('/contact')">
            Réserver un appel découverte
            <ArrowRight class="ml-2 size-5" aria-hidden="true" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  </div>
</template>
