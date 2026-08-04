<script setup lang="ts">
import { motion } from 'motion-v'

const props = withDefaults(
  defineProps<{
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right'
  }>(),
  {
    delay: 0,
    direction: 'up'
  },
)

const directions = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 }
};
</script>

<template>
  <motion.div
    :initial="{ opacity: 0, ...directions[props.direction] }"
    :whileInView="{ opacity: 1, x: 0, y: 0 }"
    :viewport="{ once: true, margin: '-100px' }"
    :transition="{
      duration: 0.6,
      delay: props.delay,
      ease: [0.21, 0.47, 0.32, 0.98]
    }"
  >
    <slot />
  </motion.div>
</template>
