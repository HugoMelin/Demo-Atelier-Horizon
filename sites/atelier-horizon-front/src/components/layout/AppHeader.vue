<script setup lang="ts">
import { Menu, X } from '@lucide/vue';
import { ref } from 'vue';

import { useNavigation } from '@/composables/useNavigation';

const { menuItems } = useNavigation();

const props = defineProps<{
  currentPage: string
  onNavigate: (page: string) => void
}>();

const mobileMenuOpen = ref(false);

</script>

<template>
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <button
          @click="onNavigate('/')"
          class="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div class="w-10 h-10 bg-[#0F172A] rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">AH</span>
          </div>
          <span class="text-xl font-semibold text-[#0F172A]">Atelier Horizon</span>
        </button>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
            <button
              v-for="item, key in menuItems"
              :key="key"
              @click="onNavigate(item.href)"
              class="text-sm font-medium transition-colors"
              :class="(props.currentPage === item.href
                ? ' text-[#0F172A]'
                : ' text-[#6B7280] hover:text-[#0F172A]')"

            >
              {{ item.name }}
            </button>
          <button
            @click="onNavigate('/contact')"
            class="px-6 py-2 bg-[#6B8E7A] text-white rounded-lg hover:bg-[#5a7768] transition-colors"
          >
            Prendre RDV
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
            <X v-if="mobileMenuOpen" class="w-6 h-6 text-[#0F172A]" />
            <Menu v-else class="w-6 h-6 text-[#0F172A]" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-100">
        <nav class="flex flex-col space-y-4">
          <button
            v-for="item, key in menuItems"
            :key="key"
            @click="() => {
              onNavigate(item.href);
              mobileMenuOpen = false;
            }"
            class="text-left px-4 py-2 rounded-lg transition-colors"
            :class="props.currentPage === item.href
              ? 'bg-[#F5F3EE] text-[#0F172A]'
              : 'text-[#6B7280] hover:bg-gray-50'"
          >
            {{ item.name }}
          </button>
          <button
            @click="() => {
              onNavigate('contact');
              mobileMenuOpen = false;
            }"
            class="mx-4 px-6 py-2 bg-[#6B8E7A] text-white rounded-lg hover:bg-[#5a7768] transition-colors text-center"
          >
            Prendre RDV
          </button>
        </nav>
      </div>
    </div>
  </header>
</template>
