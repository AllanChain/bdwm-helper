<script setup lang="ts">
import { showSettings } from './stores/switch'
import { blockedUsers, unblockUser } from './stores/blocked'
</script>

<template>
  <div
    v-if="showSettings"
    un-position="fixed top-1/2 left-1/2"
    un-transform="translate-y--1/2 translate-x--1/2"
    un-w-200 un-h-60 un-z-200
    un-max-w="11/12"
    un-border="rounded-lg t-10 orange-400"
    un-overflow="y-auto"
    un-bg="gray-100/90"
    un-text="sm"
  >
    <div
      un-position="absolute top-2 right-2"
      @click="showSettings = false"
    >
      <i un-display="block" class="i-carbon-close" />
    </div>
    <div un-m="x-4" un-overflow="y-auto">
      <div un-text="base" un-font="bold" un-m="y-2">
        已屏蔽的用户
      </div>
      <p un-text="sm gray-600">
        取消屏蔽后需要刷新页面才能生效
      </p>
      <div un-flex un-flex-wrap>
        <div
          v-for="blockedUser in blockedUsers"
          :key="blockedUser"
          un-display="flex"
          un-border="rounded-full"
          un-bg="orange-200"
          un-m="x-1 y-1"
          un-overflow="hidden"
        >
          <div
            un-p="l-2 r-1 y-0.5"
          >
            {{ blockedUser }}
          </div>
          <div
            un-w="4"
            un-p="r-1"
            un-bg="red-300"
            un-text="white"
            un-cursor="pointer"
            un-display="flex"
            un-items-center
            @click="unblockUser(blockedUser)"
          >
            <i un-display="block" class="i-carbon-close" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>
