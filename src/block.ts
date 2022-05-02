import { addBlockedUser, blockedUsers } from './stores/blocked'

/** 字符串，首页屏蔽的版面，为了匹配简单，每个版面用方括号括起 */
const BLOCK_BOARDS = '[别问我是谁]'

/**
 * 屏蔽首页上不想看的版面
 */
const blockHomepageBoards = () => {
  const links = document.getElementsByClassName('topic-link') as HTMLCollectionOf<HTMLAnchorElement>
  for (const homepageBoardLink of links) {
    if (BLOCK_BOARDS.includes(homepageBoardLink.innerText)) {
      homepageBoardLink.innerText = '[已屏蔽版面]'
      homepageBoardLink.href = 'javascript:void(0)'
      const bordTopicLink = homepageBoardLink.nextSibling as HTMLAnchorElement
      bordTopicLink.href = 'javascript:void(0)'
      bordTopicLink.innerText = '屏蔽版面的话题'
    }
  }
}

const blockUser = (event: MouseEvent) => {
  const blockBtn = event.target as HTMLAnchorElement
  const username = blockBtn.dataset.username
  if (!username) {
    return
  }
  addBlockedUser(username)
  blockBtn.parentNode!.removeChild(blockBtn)
}

/**
 * 屏蔽用户发言
 */
const blockPostCard = () => {
  for (const postCard of document.getElementsByClassName('post-card')) {
    const usernameElement = postCard.getElementsByClassName('username')[0].firstChild as HTMLAnchorElement
    const username = usernameElement.innerText
    if (blockedUsers.value.includes(username)) {
      // BLOCK CONTENT
      const postContent = postCard.getElementsByClassName('body file-read image-click-view')[0] as HTMLDivElement
      postContent.innerText = '[bdwm屏蔽插件] 该用户的发言已被您屏蔽！'
      postContent.style.color = 'red'
      // BLOCK USERNAME
      usernameElement.innerText = '屏蔽用户'
      const portraitElement = postCard.getElementsByClassName('portrait')[0] as HTMLImageElement
      portraitElement.src = 'https://bbs.pku.edu.cn/v2/images/user/portrait-neu.png'
      const funcBar = postCard.querySelector('.functions')
      if (funcBar) {
        funcBar.parentNode!.removeChild(funcBar)
      }
    }
    else if (username !== '屏蔽用户') {
      const funcElement = postCard.querySelector('.functions .line.wide-btn')
      if (funcElement && !funcElement.querySelector('.block')) {
        const blockBtn = document.createElement('a')
        blockBtn.className = 'block'
        blockBtn.innerText = '屏蔽'
        blockBtn.dataset.username = username
        blockBtn.addEventListener('click', blockUser)
        funcElement.appendChild(blockBtn)
      }
    }
  }
}

/**
 * 屏蔽版面界面显示的用户发帖
 */
const blockTopicItem = () => {
  for (const topicItem of document.getElementsByClassName('list-item-topic')) {
    for (const authorElement of topicItem.getElementsByClassName('author')) {
      const authorNameElement = authorElement.getElementsByClassName('name')[0] as HTMLAnchorElement
      const authorName = authorNameElement.innerText
      if (blockedUsers.value.includes(authorName)) {
        authorNameElement.innerText = '屏蔽用户'
        const tilteElement = topicItem.querySelector('.title-cont .title') as HTMLElement
        tilteElement.innerText = '屏蔽用户的话题'
        topicItem.querySelector('a')!.href = 'javascript:void(0)'
        // 如果是楼主而不是最后发言
        const previousElement = authorElement.previousElementSibling
        if (Array.from(previousElement!.classList).includes('avatar')) {
          previousElement!.querySelector('img')!.src
            = 'https://bbs.pku.edu.cn/v2/images/user/portrait-neu.png'
        }
      }
    }
  }
}

export const initBlock = () => {
  console.log('BDWM_BLOCK by motaguoke Version: 2.0')
  new MutationObserver(() => {
    blockHomepageBoards()
    blockPostCard()
    blockTopicItem()
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
}
