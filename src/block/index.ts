import { blockHomepageBoards } from './home-boards'
import { blockPostCard } from './post-card'
import { blockTopicItem } from './topic-item'

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
