import { block100Boards, blockHomepageBoards } from './home-boards'
import { blockPostCard } from './post-card'
import { blockTopicItem } from './topic-item'

export function initBlock() {
  console.log('BDWM_BLOCK by motaguoke Version: 2.0')
  new MutationObserver(() => {
    blockHomepageBoards()
    block100Boards()
    blockPostCard()
    blockTopicItem()
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
}
