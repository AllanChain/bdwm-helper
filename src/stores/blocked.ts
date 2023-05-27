import { ref } from 'vue'

function loadBlockedUsers(): string[] {
  const blockedUsers = localStorage.getItem('block-user-list')
  return blockedUsers ? JSON.parse(blockedUsers) : []
}

export const blockedUsers = ref(loadBlockedUsers())

export function writeBlockedUsers() {
  localStorage.setItem('block-user-list', JSON.stringify(blockedUsers.value))
}

export function addBlockedUser(userId: string) {
  if (!blockedUsers.value.includes(userId)) {
    blockedUsers.value.push(userId)
    writeBlockedUsers()
  }
}

export function unblockUser(userId: string) {
  blockedUsers.value = blockedUsers.value.filter(user => user !== userId)
  writeBlockedUsers()
}

function loadBlockedBoards(): string[] {
  const blockedBoards = localStorage.getItem('block-board-list')
  return blockedBoards ? JSON.parse(blockedBoards) : []
}

export const blockedBoards = ref(loadBlockedBoards())

export function writeBlockedBoards() {
  localStorage.setItem('block-board-list', JSON.stringify(blockedBoards.value))
}

export function addBlockedBoard(boardId: string) {
  if (!blockedBoards.value.includes(boardId)) {
    blockedBoards.value.push(boardId)
    writeBlockedBoards()
  }
}

export function unblockBoard(boardId: string) {
  blockedBoards.value = blockedBoards.value.filter(board => board !== boardId)
  writeBlockedBoards()
}

export function toggleBlockedBoard(boardId: string) {
  if (blockedBoards.value.includes(boardId)) {
    unblockBoard(boardId)
  }
  else {
    addBlockedBoard(boardId)
  }
}
