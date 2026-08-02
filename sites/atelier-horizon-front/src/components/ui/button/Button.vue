<script setup lang="ts">
const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
});

const baseStyles = "inline-flex items-center justify-center rounded-lg transition-all duration-200 font-medium";

const variants = {
  primary: "bg-[#0F172A] text-white hover:bg-[#1e293b] shadow-sm",
  secondary: "bg-[#6B8E7A] text-white hover:bg-[#5a7768] shadow-sm",
  outline: "border-2 border-[#0F172A] text-[#0F172A] hover:bg-[#0F172A] hover:text-white"
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg"
};
</script>

<template>
  <button
    :class="[
      baseStyles,
      variants[props.variant] || variants.primary,
      sizes[props.size] || sizes.md,
      { 'opacity-50 cursor-not-allowed': props.disabled }
    ]"
    :disabled="props.disabled"
    @click="props.onClick"
  >
    <slot />
  </button>
</template>
