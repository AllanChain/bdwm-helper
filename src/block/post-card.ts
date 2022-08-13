import { isDesktop } from '../is-mobile'
import { addBlockedUser, blockedUsers } from '../stores/blocked'

const blockUser = (event: MouseEvent) => {
  const blockBtn = event.target as HTMLAnchorElement
  const username = blockBtn.dataset.username
  if (!username) {
    return
  }
  addBlockedUser(username)
  blockBtn.parentNode!.removeChild(blockBtn)
}

const getUsernameAndElement = (postCard: HTMLDivElement) => {
  if (isDesktop) {
    const usernameElement = postCard.querySelector('.username a') as HTMLAnchorElement
    return { username: usernameElement.innerText, usernameElement }
  }
  const usernameElement = postCard.querySelector('.author .name') as HTMLSpanElement
  return { username: usernameElement.firstChild?.textContent, usernameElement }
}

const cleanOtherUserInfo = (postCard: HTMLDivElement) => {
  if (isDesktop) {
    const usernameContainer = postCard.querySelector('.username') as HTMLAnchorElement
    while (usernameContainer.nextElementSibling) {
      usernameContainer.nextElementSibling.remove()
    }
  }
}

const getPostContentElement = (postCard: HTMLDivElement) => {
  return postCard.querySelector('.body') as HTMLDivElement
}

const getAvatarElement = (postCard: HTMLDivElement) => {
  return isDesktop
    ? (postCard.querySelector('img.portrait') as HTMLImageElement)
    : (postCard.querySelector('.avatar>img') as HTMLImageElement)
}

const addBlockBtn = (postCard: HTMLDivElement, username: string) => {
  const blockBtn = document.createElement('a')
  blockBtn.className = 'block'
  blockBtn.innerText = '屏蔽'
  blockBtn.dataset.username = username
  blockBtn.addEventListener('click', blockUser)

  if (isDesktop) {
    const funcElement = postCard.querySelector('.functions .line.wide-btn')
    if (funcElement && !funcElement.querySelector('.block')) {
      funcElement.appendChild(blockBtn)
    }
  }
  else {
    if (!postCard.querySelector('.block')) {
      blockBtn.style.position = 'absolute'
      blockBtn.style.top = '32px'
      blockBtn.style.right = '15px'
      blockBtn.style.color = '#E17819'
      blockBtn.style.fontSize = '12px'
      blockBtn.style.cursor = 'pointer'
      postCard.appendChild(blockBtn)
    }
  }
}

/**
 * 屏蔽用户发言
 */
export const blockPostCard = () => {
  const postCards = document.getElementsByClassName('post-card') as HTMLCollectionOf<HTMLDivElement>
  for (const postCard of postCards) {
    const { username, usernameElement } = getUsernameAndElement(postCard)
    if (!username) {
      continue
    }
    if (blockedUsers.value.includes(username)) {
      // BLOCK CONTENT
      const postContent = getPostContentElement(postCard)
      const paraElement = document.createElement('p')
      paraElement.innerText = '屏蔽用户的发言'
      paraElement.style.color = 'red'
      postContent.replaceChildren(paraElement)
      // BLOCK USERNAME
      if (usernameElement) {
        usernameElement.innerText = '屏蔽用户'
      }
      const portraitElement = getAvatarElement(postCard)
      portraitElement.src = 'https://bbs.pku.edu.cn/v2/images/user/portrait-neu.png'
      cleanOtherUserInfo(postCard)
    }
    else if (username !== '屏蔽用户') {
      addBlockBtn(postCard, username)
    }
  }
}
