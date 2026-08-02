<script setup lang="ts">
import { useRouter } from 'vue-router';

import { AppHeader, AppFooter } from '@/components/layout';

const router = useRouter();

const handleNavigate = (page: string) => router.push(page);
</script>

<template>
  <AppHeader :current-page="$route.path" :on-navigate="handleNavigate" />
  <main class="">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped></style>
