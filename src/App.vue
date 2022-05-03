<script setup lang="ts">
import { showSettings } from './stores/switch'
import { blockedBoards, blockedUsers, unblockBoard, unblockUser } from './stores/blocked'
import BlockedItem from './components/BlockedItem.vue'
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
      <p un-text="sm gray-600">
        取消屏蔽后需要刷新页面才能生效
      </p>
      <div un-text="base" un-font="bold" un-m="y-2">
        已屏蔽的用户
      </div>
      <div un-flex un-flex-wrap>
        <BlockedItem
          v-for="blockedUser in blockedUsers"
          :key="blockedUser"
          :name="blockedUser"
          @click="unblockUser(blockedUser)"
        />
      </div>
      <div un-text="base" un-font="bold" un-m="y-2">
        已屏蔽的版面
      </div>
      <div un-flex un-flex-wrap>
        <BlockedItem
          v-for="blockedBoard in blockedBoards"
          :key="blockedBoard"
          :name="blockedBoard"
          @click="unblockBoard(blockedBoard)"
        />
      </div>
    </div>
  </div>
</template>

<style>
</style>
