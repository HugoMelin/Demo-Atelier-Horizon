<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {
  useServiceStore,
  useMethodologyStore,
  useTestimonialStore,
  useTrustReasonStore,
} from '@/stores/';

const { items: services } = storeToRefs(useServiceStore());
const { items: methodologies } = storeToRefs(useMethodologyStore());
const { items: testimonials } = storeToRefs(useTestimonialStore());
const { items: trustReasons } = storeToRefs(useTrustReasonStore());
</script>

<template>
  <div class="text-sage px-4">Index.vue</div>
</template>
