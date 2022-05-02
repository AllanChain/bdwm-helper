import { ref } from 'vue'

const loadBlockedUsers = (): string[] => {
  const blockedUsers = localStorage.getItem('block-user-list')
  return blockedUsers ? JSON.parse(blockedUsers) : []
}

export const blockedUsers = ref(loadBlockedUsers())

export const writeBlockedUsers = () => {
  localStorage.setItem('block-user-list', JSON.stringify(blockedUsers.value))
}

export const addBlockedUser = (userId: string) => {
  if (!blockedUsers.value.includes(userId)) {
    blockedUsers.value.push(userId)
    writeBlockedUsers()
  }
}

export const unblockUser = (userId: string) => {
  blockedUsers.value = blockedUsers.value.filter(user => user !== userId)
  writeBlockedUsers()
}
