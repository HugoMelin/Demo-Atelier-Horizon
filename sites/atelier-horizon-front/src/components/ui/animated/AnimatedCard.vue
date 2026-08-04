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
      :initial="{ opacity: 0, y: 20 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :viewport="{ once: true, margin: '-50px' }"
      :transition="{
        duration: 0.5,
        delay: props.delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }"
      :whileHover="{ y: -5, transition: { duration: 0.2 } }"
    >
      <slot />
    </motion.div>
</template>
