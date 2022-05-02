import { toggleSettings } from './stores/switch'

export const createSettingsBtn = () => {
  const settingBtn = document.createElement('span')
  settingBtn.innerHTML = '<img width="20" src="images/user/portrait-neu.png">'
  settingBtn.addEventListener('click', toggleSettings)
  const settingParent = document.querySelector('.right-icons')
  if (!settingParent) {
    throw new Error('Unable to register settings button')
  }
  settingParent.appendChild(settingBtn)
  return settingBtn
}
