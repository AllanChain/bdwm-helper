import { ref } from 'vue'

export const showSettings = ref(false)
export const toggleSettings = () => {
  showSettings.value = !showSettings.value
}
