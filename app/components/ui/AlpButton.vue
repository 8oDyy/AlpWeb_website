<script setup lang="ts">
/**
 * AlpButton - Bouton premium sur-mesure
 * Style Apple-like avec animations GSAP
 */

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  href?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Computed classes
const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out cursor-pointer select-none'

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-4 py-2 text-sm'
    case 'md': return 'px-6 py-3 text-base'
    case 'lg': return 'px-8 py-4 text-base'
    case 'xl': return 'px-10 py-5 text-lg'
    default: return 'px-6 py-3 text-base'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-alp-black text-cream hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20 active:scale-[0.98]'
    case 'secondary':
      return 'bg-cream-dark text-alp-black border border-black/10 hover:bg-cream hover:scale-[1.02] active:scale-[0.98]'
    case 'ghost':
      return 'bg-transparent text-alp-black hover:bg-black/5 active:bg-black/10'
    default:
      return ''
  }
})

const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none'

const classes = computed(() => [
  baseClasses,
  sizeClasses.value,
  variantClasses.value,
  props.disabled ? disabledClasses : '',
])

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :disabled="disabled"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </component>
</template>
