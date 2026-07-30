<script setup lang="ts">
import { useTrustReason } from '@/composables/useTrustReason';

const { fetchAllTrustReasons } = useTrustReason();

const fetchData = async () => {
  try {
    const trustReasonData = await fetchAllTrustReasons();
    console.log('Fetched Trust Reasons:', trustReasonData);
  } catch (error) {
    console.error('Error fetching Trust Reasons:', error);
  }
};

fetchData();
</script>

<template>
  <div class="text-sage px-4">Index.vue</div>
</template>
