import { isDesktop } from '../is-mobile'
import { blockedUsers } from '../stores/blocked'

/**
 * 屏蔽版面界面显示的用户发帖
 */
export function blockTopicItem() {
  if (isDesktop) {
    blockTopicItemDesktop()
  }
  else {
    blockTopicItemMobile()
  }
}

export function blockTopicItemMobile() {
  for (const topicItem of document.querySelectorAll<HTMLElement>('.thread-item')) {
    const authorElement = topicItem.querySelector<HTMLElement>('.author')
    if (authorElement === null) {
      continue
    }
    const authorName = authorElement?.innerText
    if (blockedUsers.value.includes(authorName)) {
      authorElement.innerText = '屏蔽用户'
      const titleElement = topicItem.querySelector<HTMLElement>('.row.head .title')
      if (titleElement) {
        titleElement.innerText = '屏蔽用户的话题'
      }
      topicItem.querySelector('a')!.href = 'javascript:void(0)'
    }
  }
}

export function blockTopicItemDesktop() {
  for (const topicItem of document.getElementsByClassName('list-item-topic')) {
    for (const authorElement of topicItem.getElementsByClassName('author')) {
      const authorNameElement = authorElement.getElementsByClassName('name')[0] as HTMLAnchorElement
      const authorName = authorNameElement.innerText
      const previousElement = authorElement.previousElementSibling
      if (
        blockedUsers.value.includes(authorName)
        // 是楼主而不是最后发言
        && Array.from(previousElement!.classList).includes('avatar')
      ) {
        authorNameElement.innerText = '屏蔽用户'
        const titleElement = topicItem.querySelector<HTMLElement>('.title-cont .title')
        if (titleElement) {
          titleElement.innerText = '屏蔽用户的话题'
        }
        topicItem.querySelector('a')!.href = 'javascript:void(0)'
        previousElement!.querySelector('img')!.src
          = 'https://bbs.pku.edu.cn/v2/images/user/portrait-neu.png'
      }
    }
  }
}
