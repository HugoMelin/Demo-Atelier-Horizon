<script setup lang="ts">
import { motion } from 'motion-v'

</script>


<template>
  <motion.div
    :variants="{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }"
    :transition="{
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98]
    }"
  >
    <slot />
  </motion.div>
</template>
