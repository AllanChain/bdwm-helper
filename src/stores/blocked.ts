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

const loadBlockedBoards = (): string[] => {
  const blockedBoards = localStorage.getItem('block-board-list')
  return blockedBoards ? JSON.parse(blockedBoards) : []
}

export const blockedBoards = ref(loadBlockedBoards())

export const writeBlockedBoards = () => {
  localStorage.setItem('block-board-list', JSON.stringify(blockedBoards.value))
}

export const addBlockedBoard = (boardId: string) => {
  if (!blockedBoards.value.includes(boardId)) {
    blockedBoards.value.push(boardId)
    writeBlockedBoards()
  }
}

export const unblockBoard = (boardId: string) => {
  blockedBoards.value = blockedBoards.value.filter(board => board !== boardId)
  writeBlockedBoards()
}

export const toggleBlockedBoard = (boardId: string) => {
  if (blockedBoards.value.includes(boardId)) {
    unblockBoard(boardId)
  }
  else {
    addBlockedBoard(boardId)
  }
}
