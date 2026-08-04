<script setup lang="ts">
import { motion } from 'motion-v'

const props = withDefaults(
  defineProps<{
    delay?: number
  }>(),
  {
    delay: 0,
  },
)
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, y: 30 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :viewport="{ once: true, margin: '-100px' }"
    :transition="{
      duration: 0.6,
      delay: props.delay,
      ease: [0.21, 0.47, 0.32, 0.98],
    }"
  >
    <slot />
  </motion.div>
</template>
