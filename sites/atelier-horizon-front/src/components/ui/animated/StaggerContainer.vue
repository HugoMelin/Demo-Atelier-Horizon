<script setup lang="ts">
import { motion } from 'motion-v'

const variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}
</script>

<template>
  <motion.div
    initial="hidden"
    while-in-view="visible"
    :viewport="{ once: true, margin: '-100px' }"
    :variants="variants"
  >
    <slot />
  </motion.div>
</template>
