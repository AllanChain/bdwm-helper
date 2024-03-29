import { isDesktop } from '../is-mobile'
import { addBlockedUser, blockedUsers } from '../stores/blocked'

function blockUser(event: MouseEvent) {
  const blockBtn = event.target as HTMLAnchorElement
  const username = blockBtn.dataset.username
  if (!username) {
    return
  }
  addBlockedUser(username)
  blockBtn.parentNode!.removeChild(blockBtn)
}

function getUsernameAndElement(postCard: HTMLDivElement) {
  if (isDesktop) {
    const usernameElement = postCard.querySelector<HTMLAnchorElement>('.username a')
    return { username: usernameElement?.innerText, usernameElement }
  }
  const usernameElement = postCard.querySelector<HTMLSpanElement>('.author .name')
  return { username: usernameElement?.firstChild?.textContent, usernameElement }
}

function cleanOtherUserInfo(postCard: HTMLDivElement) {
  if (isDesktop) {
    const usernameContainer = postCard.querySelector<HTMLAnchorElement>('.username')
    while (usernameContainer?.nextElementSibling) {
      usernameContainer.nextElementSibling.remove()
    }
  }
}

function getPostContentElement(postCard: HTMLDivElement) {
  return postCard.querySelector<HTMLDivElement>('.body')
}

function getOtherPostElements(postCard: HTMLDivElement) {
  return [
    postCard.querySelector<HTMLDivElement>('.signature'),
    postCard.querySelector<HTMLDivElement>('.attachment'),
  ]
}

function getAvatarElement(postCard: HTMLDivElement) {
  return isDesktop
    ? postCard.querySelector<HTMLImageElement>('img.portrait')
    : postCard.querySelector<HTMLImageElement>('.avatar>img')
}

function getQuoteNameAndElement(postCard: HTMLDivElement) {
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

function addBlockBtn(postCard: HTMLDivElement, username: string) {
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
export function blockPostCard() {
  const postCards = document.querySelectorAll<HTMLDivElement>('div.post-card')
  for (const postCard of postCards) {
    const { username, usernameElement } = getUsernameAndElement(postCard)
    if (!username) {
      continue
    }

    if (blockedUsers.value.includes(username)) {
      // BLOCK CONTENT
      const postContent = getPostContentElement(postCard)
      if (postContent) {
        const toggleBlockBtn = document.createElement('a')
        const paraElement = document.createElement('p')
        toggleBlockBtn.style.color = '#47907b'
        paraElement.appendChild(toggleBlockBtn)

        const blockPost = () => {
          for (const child of postContent.children as HTMLCollectionOf<HTMLElement>) {
            if (child !== paraElement) {
              child.style.display = 'none'
            }
          }
          toggleBlockBtn.dataset.hidden = 'true'
          toggleBlockBtn.innerText = '[bdwm-helper] 点击显示屏蔽用户的发言'
          for (const otherElement of getOtherPostElements(postCard)) {
            if (otherElement) {
              otherElement.style.display = 'none'
            }
          }
        }
        const unblockPost = () => {
          for (const child of postContent.children as HTMLCollectionOf<HTMLElement>) {
            child.style.display = ''
          }
          toggleBlockBtn.dataset.hidden = 'false'
          toggleBlockBtn.innerText = '[bdwm-helper] 点击隐藏屏蔽用户的发言'
          for (const otherElement of getOtherPostElements(postCard)) {
            if (otherElement) {
              otherElement.style.display = ''
            }
          }
        }
        toggleBlockBtn.addEventListener('click', () => {
          toggleBlockBtn.dataset.hidden === 'true' ? unblockPost() : blockPost()
        })

        postContent.prepend(paraElement)
        blockPost()
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
