<script setup lang="ts">
import type { ShallowRef } from 'vue'
// @ts-ignore - useRenderLoop is a named export in v5 but IDE might be confused
import { useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'

const props = defineProps<{
  color?: string
  count?: number
}>()

// Refs
const pointsRef = ref(null)
const bufferRef = ref<THREE.BufferGeometry | null>(null)

// Config
const count = props.count || 5000
const size = 60 // Area size

// Generate positions
const positions = new Float32Array(count * 3)
const originalY = new Float32Array(count)

for (let i = 0; i < count; i++) {
  const i3 = i * 3
  const x = (Math.random() - 0.5) * size
  const z = (Math.random() - 0.5) * size * 3 // Longer in Z for travel
  const y = (Math.random() - 0.5) * 2 // Height variation

  positions[i3] = x
  positions[i3 + 1] = y
  positions[i3 + 2] = z
  
  originalY[i] = y
}

// Animation loop
const { onLoop } = useRenderLoop()

onLoop(({ elapsed }: { elapsed: number }) => {
  if (!bufferRef.value) return
  
  const positionAttribute = bufferRef.value.attributes.position
  if (!positionAttribute) return

  const array = positionAttribute.array as Float32Array
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    const x = array[i3]
    const y = originalY[i]
    
    if (x === undefined || y === undefined) continue
    
    // Wave effect
    array[i3 + 1] = y + Math.sin(elapsed + x * 0.5) * 0.5
  }
  
  positionAttribute.needsUpdate = true
})
</script>

<template>
  <TresPoints ref="pointsRef">
    <TresBufferGeometry ref="bufferRef">
      <TresBufferAttribute
        :usage="THREE.DynamicDrawUsage"
        :array="positions"
        :item-size="3"
        :count="count"
        name="position"
      />
    </TresBufferGeometry>
    <TresPointsMaterial
      :size="0.15"
      :color="props.color || '#1A1A1A'"
      :size-attenuation="true"
      transparent
      :opacity="0.8"
    />
  </TresPoints>
</template>
