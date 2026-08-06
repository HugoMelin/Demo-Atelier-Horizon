<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { ArrowUpRight, Check, Info, X } from '@lucide/vue'

const isOpen = ref(false)
const closeButton = ref<HTMLButtonElement | null>(null)
const COOKIE_NAME = 'torefi_demo_notice_seen'
const COOKIE_DURATION_SECONDS = 60 * 60 * 24
let previousOverflow = ''

const hasSeenModal = () =>
  document.cookie
    .split('; ')
    .some((cookie) => cookie.startsWith(`${encodeURIComponent(COOKIE_NAME)}=`))

const rememberModalWasSeen = () => {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''

  document.cookie = `${encodeURIComponent(COOKIE_NAME)}=true; Max-Age=${COOKIE_DURATION_SECONDS}; Path=/; SameSite=Lax${secure}`
}

const closeModal = () => {
  rememberModalWasSeen()
  isOpen.value = false
  document.body.style.overflow = previousOverflow
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) closeModal()
}

onMounted(async () => {
  if (hasSeenModal()) return

  previousOverflow = document.body.style.overflow
  isOpen.value = true
  document.body.style.overflow = 'hidden'
  document.addEventListener('keydown', handleKeydown)

  await nextTick()
  closeButton.value?.focus()
})

onBeforeUnmount(() => {
  document.body.style.overflow = previousOverflow
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="demo-modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#0F172A]/70 px-4 py-8 backdrop-blur-sm"
        role="presentation"
        @click.self="closeModal"
      >
        <section
          class="relative w-full max-w-xl overflow-hidden rounded-3xl bg-[#FAFAFA] shadow-2xl shadow-black/30"
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
          aria-describedby="demo-modal-description"
        >
          <div class="h-1.5 bg-[#6B8E7A]" />

          <button
            ref="closeButton"
            type="button"
            class="absolute right-4 top-5 flex h-10 w-10 items-center justify-center rounded-full text-[#6B7280] transition-colors hover:bg-[#0F172A]/5 hover:text-[#0F172A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B8E7A]"
            aria-label="Fermer la fenêtre d'information"
            @click="closeModal"
          >
            <X class="h-5 w-5" aria-hidden="true" />
          </button>

          <div class="px-6 pb-7 pt-8 sm:px-9 sm:pb-9 sm:pt-10">
            <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6B8E7A]/15 text-[#557262]">
              <Info class="h-6 w-6" aria-hidden="true" />
            </div>

            <p class="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6B8E7A]">
              Bienvenue
            </p>
            <h2 id="demo-modal-title" class="pr-10 text-2xl text-[#0F172A] sm:text-3xl">
              Ce site est une démonstration
            </h2>
            <p id="demo-modal-description" class="mt-4 leading-relaxed text-[#6B7280]">
              Cette vitrine a été créée à des fins de démonstration. L’entreprise, les personnes,
              les témoignages et l’ensemble des données présentées sont entièrement fictifs.
            </p>

            <a
              href="https://www.torefi.fr"
              target="_blank"
              rel="noopener noreferrer"
              class="group mt-7 flex items-center gap-4 rounded-2xl border border-[#0F172A]/10 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#6B8E7A]/60 hover:shadow-lg hover:shadow-[#0F172A]/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B8E7A] sm:p-5"
              aria-label="Découvrir l'agence Toréfi (nouvel onglet)"
            >
              <div class="flex h-24 w-24 shrink-0 items-center justify-center tracking-wide">
                <img src="/logoTexte1024x1024.png" alt="Toréfi">
              </div>
              <div class="min-w-0 flex-1">
                <span class="block text-xs font-semibold uppercase tracking-[0.16em] text-[#6B8E7A]">
                  Imaginé &amp; réalisé par
                </span>
                <span class="mt-0.5 block text-lg font-semibold text-[#0F172A]">Toréfi</span>
                <span class="block text-sm text-[#6B7280]">Agence web &amp; digitale</span>
              </div>
              <ArrowUpRight
                class="h-5 w-5 shrink-0 text-[#6B8E7A] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0F172A] px-5 py-3.5 font-semibold text-white transition-colors hover:bg-[#1E293B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B8E7A]"
              @click="closeModal"
            >
              <Check class="h-5 w-5" aria-hidden="true" />
              J’ai compris, découvrir le site
            </button>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.demo-modal-enter-active,
.demo-modal-leave-active {
  transition: opacity 220ms ease;
}

.demo-modal-enter-active section,
.demo-modal-leave-active section {
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}

.demo-modal-enter-from,
.demo-modal-leave-to {
  opacity: 0;
}

.demo-modal-enter-from section,
.demo-modal-leave-to section {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .demo-modal-enter-active,
  .demo-modal-leave-active,
  .demo-modal-enter-active section,
  .demo-modal-leave-active section {
    transition: none;
  }
}
</style>
