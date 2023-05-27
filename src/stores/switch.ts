import { ref } from 'vue'

export const showSettings = ref(false)
export function toggleSettings() {
  showSettings.value = !showSettings.value
}
