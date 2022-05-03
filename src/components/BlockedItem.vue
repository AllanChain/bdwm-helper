<script setup lang="ts">
defineProps<{
  name: string
}>()

const emit = defineEmits<{
  (e: 'click', name: string): void
}>()
</script>

<template>
  <div
    un-display="flex"
    un-border="rounded-full"
    un-bg="orange-200"
    un-m="x-1 y-1"
    un-overflow="hidden"
  >
    <div
      un-p="l-2 r-1 y-0.5"
    >
      {{ name }}
    </div>
    <div
      un-w="4"
      un-p="r-1"
      un-bg="red-300"
      un-text="white"
      un-cursor="pointer"
      un-display="flex"
      un-items-center
      @click="emit('click', name)"
    >
      <i un-display="block" class="i-carbon-close" />
    </div>
  </div>
</template>
