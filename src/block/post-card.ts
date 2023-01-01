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
    const usernameElement = postCard.querySelector<HTMLAnchorElement>('.username a')
    return { username: usernameElement?.innerText, usernameElement }
  }
  const usernameElement = postCard.querySelector<HTMLSpanElement>('.author .name')
  return { username: usernameElement?.firstChild?.textContent, usernameElement }
}

const cleanOtherUserInfo = (postCard: HTMLDivElement) => {
  if (isDesktop) {
    const usernameContainer = postCard.querySelector<HTMLAnchorElement>('.username')
    while (usernameContainer?.nextElementSibling) {
      usernameContainer.nextElementSibling.remove()
    }
  }
}

const getPostContentElement = (postCard: HTMLDivElement) => {
  return postCard.querySelector<HTMLDivElement>('.body')
}

const getPostSigElement = (postCard: HTMLDivElement) => {
  return postCard.querySelector<HTMLDivElement>('.signature')
}

const getAvatarElement = (postCard: HTMLDivElement) => {
  return isDesktop
    ? postCard.querySelector<HTMLImageElement>('img.portrait')
    : postCard.querySelector<HTMLImageElement>('.avatar>img')
}

const getQuoteNameAndElement = (postCard: HTMLDivElement) => {
  const quoteHead = postCard.querySelector<HTMLParagraphElement>('p.quotehead[data-username]')
  const quoteUsername = quoteHead?.getAttribute('data-username')
  if (isDesktop) {
    const quoteElements = postCard.querySelectorAll('p.blockquote')
    return { quoteHead, quoteUsername, quoteElements }
  }
  else {
    const quoteElements = quoteHead?.parentElement?.querySelectorAll('p.blockquote, .quote-expand')
    return { quoteHead, quoteUsername, quoteElements }
  }
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
  const postCards = document.querySelectorAll<HTMLDivElement>('div.post-card')
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
      paraElement.style.color = '#47907b'
      if (postContent) {
        postContent.replaceChildren(paraElement)
      }
      const signature = getPostSigElement(postCard)
      if (signature) {
        signature.hidden = true
      }
      // BLOCK USERNAME
      if (usernameElement) {
        usernameElement.innerText = '屏蔽用户'
      }
      const portraitElement = getAvatarElement(postCard)
      if (portraitElement) {
        portraitElement.src = 'https://bbs.pku.edu.cn/v2/images/user/portrait-neu.png'
      }
      cleanOtherUserInfo(postCard)
    }
    else if (username !== '屏蔽用户') {
      addBlockBtn(postCard, username)
    }

    const { quoteHead, quoteUsername, quoteElements } = getQuoteNameAndElement(postCard)
    if (quoteUsername && quoteHead && quoteElements) {
      if (blockedUsers.value.includes(quoteUsername)) {
        quoteHead.innerText = '屏蔽用户的发言'
        quoteHead.removeAttribute('data-username')
        console.log(quoteElements)
        for (const quoteElement of quoteElements) {
          quoteElement.remove()
        }
      }
    }
  }
}
