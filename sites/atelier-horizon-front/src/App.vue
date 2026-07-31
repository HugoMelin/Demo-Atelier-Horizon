<script setup lang="ts">
import { useRouter } from 'vue-router';

import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';

const router = useRouter();

const handleNavigate = (page: string) => router.push(page);
</script>

<template>
  <AppHeader :current-page="$route.path" :on-navigate="handleNavigate" />
  <RouterView />
  <AppFooter />
</template>

<style scoped></style>
