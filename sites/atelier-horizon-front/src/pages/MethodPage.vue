<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { CheckCircle, Compass, Wrench } from '@lucide/vue'
import { useRouter } from 'vue-router'

import IconBlock from '@/components/blocks/IconBlock.vue'
import RichTextBlock from '@/components/blocks/RichTextBlock.vue'
import { Button } from '@/components/ui/button'
import {
  AnimatedSection,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animated'
import { useMethodologyStore, usePrincipleStore, useToolStore } from '@/stores'

const router = useRouter()

const { items: methodologyResponse } = storeToRefs(useMethodologyStore())
const { items: principleResponse } = storeToRefs(usePrincipleStore())
const { items: toolResponse } = storeToRefs(useToolStore())

const methodologies = computed(() =>
  [...(methodologyResponse.value?.data ?? [])].sort(
    (a, b) => (a.Ordre ?? 0) - (b.Ordre ?? 0),
  ),
)
const principles = computed(() => principleResponse.value?.data ?? [])
const tools = computed(() => toolResponse.value?.data?.Outils ?? [])

const navigateTo = (path: string) => router.push(path)
</script>

<template>
  <div class="min-h-screen bg-[#FAFAFA]">
    <!-- Hero -->
    <section class="bg-gradient-to-br from-[#0F172A] to-[#1e293b] py-16 text-white sm:py-24">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <h1 class="mb-6 text-4xl font-bold sm:text-5xl">
            Une méthode éprouvée et structurée
          </h1>
        </FadeIn>
        <FadeIn :delay="0.15">
          <p class="text-xl leading-relaxed text-gray-300">
            Un processus en 4 étapes pour vous accompagner de la réflexion stratégique à
            l'atteinte de vos objectifs.
          </p>
        </FadeIn>
      </div>
    </section>

    <!-- Étapes de la méthodologie -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div class="space-y-12 sm:space-y-16">
          <AnimatedSection
            v-for="(step, index) in methodologies"
            :key="step.documentId"
            :delay="index * 0.1"
          >
            <article class="relative">
              <div
                v-if="index < methodologies.length - 1"
                class="absolute top-24 left-12 hidden h-full w-0.5 bg-[#6B8E7A] opacity-20 sm:block"
                aria-hidden="true"
              />

              <div
                class="relative rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl sm:p-12"
              >
                <div class="mb-6 flex items-start gap-6">
                  <div class="relative shrink-0">
                    <div
                      class="flex size-24 items-center justify-center rounded-2xl bg-[#6B8E7A]/15"
                    >
                      <IconBlock
                        v-if="step.Icon"
                        :icon="step.Icon"
                        class="size-12 text-[#6B8E7A]"
                      />
                      <Compass v-else class="size-12 text-[#6B8E7A]" aria-hidden="true" />
                    </div>
                    <div
                      class="absolute -top-2 -right-2 flex size-10 items-center justify-center rounded-full bg-[#6B8E7A] text-lg font-bold text-white shadow-lg"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>

                  <div class="flex-1">
                    <h2 class="mb-2 text-3xl font-bold text-[#0F172A]">
                      {{ step.Titre }}
                    </h2>
                    <p v-if="step.Soustitre" class="text-lg font-medium text-[#6B8E7A]">
                      {{ step.Soustitre }}
                    </p>
                  </div>
                </div>

                <RichTextBlock
                  :richtext="step.Description"
                  class="mb-6 text-lg leading-relaxed text-[#1F2933]"
                />

                <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div v-if="step.Details?.length">
                    <h3 class="mb-4 flex items-center font-semibold text-[#0F172A]">
                      <CheckCircle class="mr-2 size-5 text-[#6B8E7A]" aria-hidden="true" />
                      Ce que nous faisons
                    </h3>
                    <ul class="space-y-2">
                      <li
                        v-for="detail in step.Details"
                        :key="detail.id"
                        class="flex items-start gap-2"
                      >
                        <span class="mt-1.5 text-[#6B8E7A]" aria-hidden="true">•</span>
                        <span class="text-[#6B7280]">{{ detail.Valeur }}</span>
                      </li>
                    </ul>
                  </div>

                  <div v-if="step.Livrable" class="rounded-lg bg-[#F5F3EE] p-6">
                    <h3 class="mb-2 font-semibold text-[#0F172A]">Livrable</h3>
                    <p class="text-[#1F2933]">{{ step.Livrable }}</p>
                  </div>
                </div>
              </div>
            </article>
          </AnimatedSection>
        </div>
      </div>
    </section>

    <!-- Principes -->
    <section class="bg-white py-16 sm:py-24">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div class="mb-12 text-center sm:mb-16">
            <h2 class="mb-4 text-3xl font-bold text-[#0F172A] sm:text-4xl">
              Mes principes d'accompagnement
            </h2>
            <p class="mx-auto max-w-2xl text-lg text-[#6B7280]">
              Les valeurs qui guident chaque intervention
            </p>
          </div>
        </AnimatedSection>

        <StaggerContainer>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StaggerItem v-for="principle in principles" :key="principle.documentId">
              <article
                class="h-full rounded-xl bg-[#F5F3EE] p-6 text-center transition-shadow hover:shadow-lg"
              >
                <div
                  class="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-white shadow-sm"
                >
                  <IconBlock
                    v-if="principle.Icon"
                    :icon="principle.Icon"
                    class="size-7 text-[#6B8E7A]"
                  />
                  <Compass v-else class="size-7 text-[#6B8E7A]" aria-hidden="true" />
                </div>
                <h3 class="mb-2 font-semibold text-[#0F172A]">{{ principle.Titre }}</h3>
                <RichTextBlock
                  :richtext="principle.Description"
                  class="text-sm text-[#6B7280]"
                />
              </article>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </section>

    <!-- Outils -->
    <section class="bg-[#F5F3EE] py-16 sm:py-24">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div class="mb-12 text-center">
            <h2 class="mb-4 text-3xl font-bold text-[#0F172A] sm:text-4xl">
              Outils &amp; frameworks utilisés
            </h2>
            <p class="text-lg text-[#6B7280]">
              Des méthodologies éprouvées adaptées à votre contexte
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection :delay="0.1">
          <div class="rounded-2xl bg-white p-8 shadow-lg sm:p-12">
            <StaggerContainer>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <StaggerItem v-for="tool in tools" :key="tool.id">
                  <article class="flex h-full items-start gap-3 rounded-lg bg-[#F5F3EE] p-4">
                    <IconBlock
                      v-if="tool.Icon"
                      :icon="tool.Icon"
                      class="mt-0.5 size-5 text-[#6B8E7A]"
                    />
                    <Wrench v-else class="mt-0.5 size-5 shrink-0 text-[#6B8E7A]" aria-hidden="true" />
                    <div>
                      <h3 class="font-medium text-[#1F2933]">{{ tool.Titre }}</h3>
                      <p v-if="tool.Description" class="mt-1 text-sm text-[#6B7280]">
                        {{ tool.Description }}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              </div>
            </StaggerContainer>

            <div class="mt-8 border-t border-gray-200 pt-8 text-center">
              <p class="text-[#6B7280]">
                Chaque outil est adapté et personnalisé en fonction de vos besoins spécifiques.
                L'objectif n'est pas d'appliquer une méthode rigide, mais de vous donner les moyens
                de prendre les meilleures décisions.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <!-- Durées -->
    <section class="py-16 sm:py-24">
      <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div
            class="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1e293b] p-8 text-white shadow-xl sm:p-12"
          >
            <h2 class="mb-6 text-center text-3xl font-bold">
              Durée typique d'un accompagnement
            </h2>

            <div class="space-y-6">
              <article class="rounded-lg bg-white/10 p-6">
                <div class="mb-2 flex flex-wrap items-center justify-between gap-3">
                  <h3 class="text-lg font-semibold">Diagnostic stratégique</h3>
                  <span class="rounded-full bg-[#6B8E7A] px-4 py-1 text-sm font-medium">
                    2 semaines
                  </span>
                </div>
                <p class="text-sm text-gray-300">
                  Pour une analyse complète et des recommandations actionnables
                </p>
              </article>

              <article class="rounded-lg bg-white/10 p-6">
                <div class="mb-2 flex flex-wrap items-center justify-between gap-3">
                  <h3 class="text-lg font-semibold">Accompagnement mensuel</h3>
                  <span class="rounded-full bg-[#6B8E7A] px-4 py-1 text-sm font-medium">
                    3-12 mois
                  </span>
                </div>
                <p class="text-sm text-gray-300">
                  Selon vos objectifs et la complexité de votre projet
                </p>
              </article>

              <article class="rounded-lg bg-white/10 p-6">
                <div class="mb-2 flex flex-wrap items-center justify-between gap-3">
                  <h3 class="text-lg font-semibold">Mentorat individuel</h3>
                  <span class="rounded-full bg-[#6B8E7A] px-4 py-1 text-sm font-medium">
                    Ponctuel
                  </span>
                </div>
                <p class="text-sm text-gray-300">
                  Des sessions à la demande, quand vous en avez besoin
                </p>
              </article>
            </div>

            <div class="mt-8 text-center">
              <Button variant="secondary" size="lg" type="button" @click="navigateTo('/contact')">
                Discutons de votre projet
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>

    <!-- Appel à l'action -->
    <section class="bg-white py-16 sm:py-24">
      <div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 class="mb-4 text-3xl font-bold text-[#0F172A] sm:text-4xl">
            Prêt à structurer votre développement ?
          </h2>
          <p class="mb-8 text-xl text-[#6B7280]">
            Parlons de votre projet lors d'un appel découverte gratuit
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="secondary" size="lg" type="button" @click="navigateTo('/contact')">
              Réserver un appel découverte
            </Button>
            <Button variant="outline" size="lg" type="button" @click="navigateTo('/offers')">
              Voir les offres
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
</template>
