import { isDesktop } from '../is-mobile'
import { blockedBoards, toggleBlockedBoard } from '../stores/blocked'

const addBlockBoardBtn = () => {
  const boardHead = document.querySelector(isDesktop ? '#board-head' : '.board-head')
  if (!boardHead || boardHead?.querySelector('.block')) {
    return
  }
  const boardTitle = boardHead.querySelector(
    isDesktop ? '.title-text.black' : '.title > .cn',
  )?.innerHTML
  if (!boardTitle) {
    return
  }
  const blockHint = '屏蔽此版面的热帖'
  const unblockHint = '取消屏蔽此版面的热帖'
  const blockBtn = document.createElement('div')
  const assignBlockHint = () => {
    if (blockedBoards.value.includes(boardTitle)) {
      blockBtn.innerText = unblockHint
    }
    else {
      blockBtn.innerText = blockHint
    }
  }
  assignBlockHint()
  blockBtn.addEventListener('click', () => {
    toggleBlockedBoard(boardTitle)
    assignBlockHint()
  })
  blockBtn.className = 'block'
  if (isDesktop) {
    Object.assign(blockBtn.style, {
      cursor: 'pointer',
      position: 'absolute',
      top: '60px',
      right: '40px',
      color: '#E17819',
    } as CSSStyleDeclaration)
  }
  else {
    Object.assign(blockBtn.style, {
      cursor: 'pointer',
      position: 'absolute',
      top: '50px',
      right: '15px',
      color: '#E17819',
      fontSize: '12px',
    } as CSSStyleDeclaration)
  }
  boardHead.appendChild(blockBtn)
}

/**
 * 屏蔽首页上不想看的版面
 */
export const blockHomepageBoards = () => {
  if (isDesktop) {
    const links = document.getElementsByClassName(
      'topic-link',
    ) as HTMLCollectionOf<HTMLAnchorElement>
    for (const homepageBoardLink of links) {
      const boardTitle = homepageBoardLink.innerText.slice(1, -1)
      if (blockedBoards.value.includes(boardTitle)) {
        homepageBoardLink.innerText = '[已屏蔽版面]'
        homepageBoardLink.href = 'javascript:void(0)'
        const bordTopicLink = homepageBoardLink.nextSibling as HTMLAnchorElement
        bordTopicLink.href = 'javascript:void(0)'
        bordTopicLink.innerText = '屏蔽版面的话题'
      }
    }
  }
  else {
    for (const boardInfoElement of document.querySelectorAll('a.post-info')) {
      const boardTitle = boardInfoElement.firstChild?.textContent?.trim()
      console.log(boardTitle)
      if (boardTitle && blockedBoards.value.includes(boardTitle)) {
        boardInfoElement.innerHTML = '已屏蔽版面'
        boardInfoElement.previousElementSibling!.innerHTML = '屏蔽版面的话题'
        const postLinkElement = boardInfoElement.parentElement?.querySelector(
          'a.post-link',
        ) as HTMLAnchorElement
        if (postLinkElement) {
          postLinkElement.href = 'javascript:void(0)'
        }
      }
    }
  }
  addBlockBoardBtn()
}
