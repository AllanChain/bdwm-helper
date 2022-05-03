/** 字符串，首页屏蔽的版面，为了匹配简单，每个版面用方括号括起 */
const BLOCK_BOARDS = '[别问我是谁]'

/**
 * 屏蔽首页上不想看的版面
 */
export const blockHomepageBoards = () => {
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
