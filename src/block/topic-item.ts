import { blockedUsers } from '../stores/blocked'

/**
 * 屏蔽版面界面显示的用户发帖
 */
export const blockTopicItem = () => {
  for (const topicItem of document.getElementsByClassName('list-item-topic')) {
    for (const authorElement of topicItem.getElementsByClassName('author')) {
      const authorNameElement = authorElement.getElementsByClassName('name')[0] as HTMLAnchorElement
      const authorName = authorNameElement.innerText
      if (blockedUsers.value.includes(authorName)) {
        authorNameElement.innerText = '屏蔽用户'
        const titleElement = topicItem.querySelector<HTMLElement>('.title-cont .title')
        if (titleElement) {
          titleElement.innerText = '屏蔽用户的话题'
        }
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
