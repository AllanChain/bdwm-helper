import { toggleSettings } from './stores/switch'
import { isMobile } from './is-mobile'

export const createSettingsBtn = () => {
  if (isMobile) {
    const friendMenu = document.querySelector('a[href*="mode=reject"]')?.parentElement
    if (!friendMenu) {
      throw new Error('Unable to register settings button')
    }
    const settingBtn = document.createElement('li')
    settingBtn.innerHTML = '<img width="10" src="images/user/portrait-neu.png"> 屏蔽设置'
    settingBtn.style.cursor = 'pointer'
    settingBtn.addEventListener('click', toggleSettings)
    friendMenu.parentElement!.appendChild(settingBtn)
  }
  else {
    const settingParent = document.querySelector('.right-icons')
    if (!settingParent) {
      throw new Error('Unable to register settings button')
    }
    const settingBtn = document.createElement('span')
    settingBtn.innerHTML = '<img width="20" src="images/user/portrait-neu.png">'
    settingBtn.addEventListener('click', toggleSettings)
    settingParent.appendChild(settingBtn)
  }
}
