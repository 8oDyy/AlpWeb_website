<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, FogExp2 } from 'three'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import ParticlesTerrain from './ParticlesTerrain.vue'

const cameraRef = ref()

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Camera Travel Animation
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1.5,
    onUpdate: (self) => {
      if (cameraRef.value) {
        // Move forward on Z
        // Start at 20, end at -40
        const progress = self.progress
        cameraRef.value.position.z = 20 - (progress * 60)
        
        // Slight Y undulation
        cameraRef.value.position.y = 3 + Math.cos(progress * Math.PI) * 2
        
        // Look slightly ahead
        cameraRef.value.lookAt(0, 0, cameraRef.value.position.z - 10)
      }
    }
  })
})
</script>

<template>
  <div class="fixed inset-0 z-[-1] w-full h-full bg-[#F5F0E8]">
    <TresCanvas
      clear-color="#F5F0E8"
      shadows
      alpha
      window-size
      power-preference="high-performance"
      :output-encoding="SRGBColorSpace"
      :tone-mapping="NoToneMapping"
    >
      <TresPerspectiveCamera
        ref="cameraRef"
        :position="[0, 3, 20]"
        :fov="45"
        :near="0.1"
        :far="100"
      />
      
      <TresFogExp2 :color="'#F5F0E8'" :density="0.02" />

      <Suspense>
        <ParticlesTerrain color="#1A1A1A" :count="8000" />
      </Suspense>
      
      <TresAmbientLight :intensity="2" />
    </TresCanvas>
  </div>
</template>
