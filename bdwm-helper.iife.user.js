/*!
// ==UserScript==
// @name              未名 BBS 屏蔽助手
// @version           2.0.0
// @description       BDWM Block
// @author            motaguoke & Allan Chain
// @require           https://unpkg.com/vue@3.2.33
// @source            https://github.com/AllanChain/bdwm-helper
// @icon              https://bbs.pku.edu.cn/favicon.ico
// @updateURL         https://allanchain.github.io/bdwm-helper/bdwm-helper.iife.user.js
// @supportURL        https://github.com/AllanChain/bdwm-helper/issues
// @match             http://bbs.pku.edu.cn/*
// @match             https://bbs.pku.edu.cn/*
// @match             http://*.bdwm.net/*
// @match             https://*.bdwm.net/*
// @run-at            document-body
// @grant             GM_addStyle
// ==/UserScript==
*/
(function(vue) {
  "use strict";
  GM_addStyle(".i-carbon-close{--un-icon:url(\"data:image/svg+xml;utf8,%3Csvg preserveAspectRatio='xMidYMid meet' viewBox='0 0 32 32' width='1em' height='1em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z'/%3E%3C/svg%3E\");mask:var(--un-icon) no-repeat;mask-size:100% 100%;-webkit-mask:var(--un-icon) no-repeat;-webkit-mask-size:100% 100%;background-color:currentColor;width:1em;height:1em;}[un-position~=\"absolute\"]{position:absolute;}[un-position~=\"fixed\"]{position:fixed;}[un-position~=\"left-1\\/2\"]{left:50%;}[un-position~=\"right-2\"]{right:0.5rem;}[un-position~=\"top-1\\/2\"]{top:50%;}[un-position~=\"top-2\"]{top:0.5rem;}[un-z-200=\"\"]{z-index:200;}[un-m~=\"x-1\"]{margin-left:0.25rem;margin-right:0.25rem;}[un-m~=\"x-4\"]{margin-left:1rem;margin-right:1rem;}[un-m~=\"y-1\"]{margin-top:0.25rem;margin-bottom:0.25rem;}[un-m~=\"y-2\"]{margin-top:0.5rem;margin-bottom:0.5rem;}[un-display~=\"block\"]{display:block;}[un-display~=\"flex\"],[un-flex=\"\"]{display:flex;}[un-h-60=\"\"]{height:15rem;}[un-max-w~=\"\\31 1\\/12\"]{max-width:91.6666666667%;}[un-w-200=\"\"]{width:50rem;}[un-w~=\"\\34 \"]{width:1rem;}[un-flex-wrap=\"\"]{flex-wrap:wrap;}[un-transform~=\"translate-x--1\\/2\"],[un-transform~=\"translate-y--1\\/2\"]{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-transform:translateX(var(--un-translate-x)) translateY(var(--un-translate-y)) translateZ(var(--un-translate-z)) rotate(var(--un-rotate)) rotateX(var(--un-rotate-x)) rotateY(var(--un-rotate-y)) rotateZ(var(--un-rotate-z)) skewX(var(--un-skew-x)) skewY(var(--un-skew-y)) scaleX(var(--un-scale-x)) scaleY(var(--un-scale-y)) scaleZ(var(--un-scale-z));}[un-transform~=\"translate-x--1\\/2\"]{--un-translate-x:-50%;transform:var(--un-transform);}[un-transform~=\"translate-y--1\\/2\"]{--un-translate-y:-50%;transform:var(--un-transform);}[un-cursor~=\"pointer\"]{cursor:pointer;}[un-items-center=\"\"]{align-items:center;}[un-overflow~=\"hidden\"]{overflow:hidden;}[un-overflow~=\"y-auto\"]{overflow-y:auto;}[un-border~=\"t-10\"]{border-top-width:10px;border-top-style:solid;}[un-border~=\"orange-400\"]{--un-border-opacity:1;border-color:rgba(251,146,60,var(--un-border-opacity));}[un-border~=\"rounded-full\"]{border-radius:9999px;}[un-border~=\"rounded-lg\"]{border-radius:0.5rem;}[un-bg~=\"gray-100\\/90\"]{background-color:rgba(243,244,246,0.9);}[un-bg~=\"orange-200\"]{--un-bg-opacity:1;background-color:rgba(254,215,170,var(--un-bg-opacity));}[un-bg~=\"red-300\"]{--un-bg-opacity:1;background-color:rgba(252,165,165,var(--un-bg-opacity));}[un-p~=\"y-0\\.5\"]{padding-top:0.125rem;padding-bottom:0.125rem;}[un-p~=\"l-2\"]{padding-left:0.5rem;}[un-p~=\"r-1\"]{padding-right:0.25rem;}[un-text~=\"base\"]{font-size:1rem;line-height:1.5rem;}[un-text~=\"sm\"]{font-size:0.875rem;line-height:1.25rem;}[un-font~=\"bold\"]{font-weight:700;}[un-text~=\"gray-600\"]{--un-text-opacity:1;color:rgba(75,85,99,var(--un-text-opacity));}[un-text~=\"white\"]{--un-text-opacity:1;color:rgba(255,255,255,var(--un-text-opacity));}");
  const showSettings = vue.ref(false);
  const toggleSettings = () => {
    showSettings.value = !showSettings.value;
  };
  const loadBlockedUsers = () => {
    const blockedUsers2 = localStorage.getItem("block-user-list");
    return blockedUsers2 ? JSON.parse(blockedUsers2) : [];
  };
  const blockedUsers = vue.ref(loadBlockedUsers());
  const writeBlockedUsers = () => {
    localStorage.setItem("block-user-list", JSON.stringify(blockedUsers.value));
  };
  const addBlockedUser = (userId) => {
    if (!blockedUsers.value.includes(userId)) {
      blockedUsers.value.push(userId);
      writeBlockedUsers();
    }
  };
  const unblockUser = (userId) => {
    blockedUsers.value = blockedUsers.value.filter((user) => user !== userId);
    writeBlockedUsers();
  };
  const loadBlockedBoards = () => {
    const blockedBoards2 = localStorage.getItem("block-board-list");
    return blockedBoards2 ? JSON.parse(blockedBoards2) : [];
  };
  const blockedBoards = vue.ref(loadBlockedBoards());
  const writeBlockedBoards = () => {
    localStorage.setItem("block-board-list", JSON.stringify(blockedBoards.value));
  };
  const addBlockedBoard = (boardId) => {
    if (!blockedBoards.value.includes(boardId)) {
      blockedBoards.value.push(boardId);
      writeBlockedBoards();
    }
  };
  const unblockBoard = (boardId) => {
    blockedBoards.value = blockedBoards.value.filter((board) => board !== boardId);
    writeBlockedBoards();
  };
  const toggleBlockedBoard = (boardId) => {
    if (blockedBoards.value.includes(boardId)) {
      unblockBoard(boardId);
    } else {
      addBlockedBoard(boardId);
    }
  };
  const _hoisted_1$1 = {
    "un-display": "flex",
    "un-border": "rounded-full",
    "un-bg": "orange-200",
    "un-m": "x-1 y-1",
    "un-overflow": "hidden"
  };
  const _hoisted_2$1 = { "un-p": "l-2 r-1 y-0.5" };
  const _hoisted_3$1 = /* @__PURE__ */ vue.createElementVNode("i", {
    "un-display": "block",
    class: "i-carbon-close"
  }, null, -1);
  const _hoisted_4$1 = [
    _hoisted_3$1
  ];
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    props: {
      name: null
    },
    emits: ["click"],
    setup(__props, { emit }) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
          vue.createElementVNode("div", _hoisted_2$1, vue.toDisplayString(__props.name), 1),
          vue.createElementVNode("div", {
            "un-w": "4",
            "un-p": "r-1",
            "un-bg": "red-300",
            "un-text": "white",
            "un-cursor": "pointer",
            "un-display": "flex",
            "un-items-center": "",
            onClick: _cache[0] || (_cache[0] = ($event) => emit("click", __props.name))
          }, _hoisted_4$1)
        ]);
      };
    }
  });
  const _hoisted_1 = {
    key: 0,
    "un-position": "fixed top-1/2 left-1/2",
    "un-transform": "translate-y--1/2 translate-x--1/2",
    "un-w-200": "",
    "un-h-60": "",
    "un-z-200": "",
    "un-max-w": "11/12",
    "un-border": "rounded-lg t-10 orange-400",
    "un-overflow": "y-auto",
    "un-bg": "gray-100/90",
    "un-text": "sm"
  };
  const _hoisted_2 = /* @__PURE__ */ vue.createElementVNode("i", {
    "un-display": "block",
    class: "i-carbon-close"
  }, null, -1);
  const _hoisted_3 = [
    _hoisted_2
  ];
  const _hoisted_4 = {
    "un-m": "x-4",
    "un-overflow": "y-auto"
  };
  const _hoisted_5 = /* @__PURE__ */ vue.createElementVNode("span", {
    "un-text": "base",
    "un-font": "bold",
    "un-m": "y-2"
  }, " \u5DF2\u5C4F\u853D\u7684\u7528\u6237 ", -1);
  const _hoisted_6 = {
    "un-flex": "",
    "un-flex-wrap": ""
  };
  const _hoisted_7 = /* @__PURE__ */ vue.createElementVNode("span", {
    "un-text": "base",
    "un-font": "bold",
    "un-m": "y-2"
  }, " \u5DF2\u5C4F\u853D\u7684\u7248\u9762 ", -1);
  const _hoisted_8 = {
    "un-flex": "",
    "un-flex-wrap": ""
  };
  const _hoisted_9 = /* @__PURE__ */ vue.createElementVNode("p", { "un-text": "sm gray-600" }, " \u53D6\u6D88\u5C4F\u853D\u540E\u9700\u8981\u5237\u65B0\u9875\u9762\u624D\u80FD\u751F\u6548 ", -1);
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.unref(showSettings) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          vue.createElementVNode("div", {
            "un-position": "absolute top-2 right-2",
            onClick: _cache[0] || (_cache[0] = ($event) => showSettings.value = false)
          }, _hoisted_3),
          vue.createElementVNode("div", _hoisted_4, [
            _hoisted_5,
            vue.createElementVNode("div", _hoisted_6, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(blockedUsers), (blockedUser) => {
                return vue.openBlock(), vue.createBlock(_sfc_main$1, {
                  key: blockedUser,
                  name: blockedUser,
                  onClick: ($event) => vue.unref(unblockUser)(blockedUser)
                }, null, 8, ["name", "onClick"]);
              }), 128))
            ]),
            _hoisted_7,
            vue.createElementVNode("div", _hoisted_8, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(blockedBoards), (blockedBoard) => {
                return vue.openBlock(), vue.createBlock(_sfc_main$1, {
                  key: blockedBoard,
                  name: blockedBoard,
                  onClick: ($event) => vue.unref(unblockBoard)(blockedBoard)
                }, null, 8, ["name", "onClick"]);
              }), 128))
            ]),
            _hoisted_9
          ])
        ])) : vue.createCommentVNode("", true);
      };
    }
  });
  const isMobile = location.href.includes("/mobile/");
  const isDesktop = !isMobile;
  const addBlockBoardBtn = () => {
    var _a;
    if (isDesktop) {
      const boardHead = document.querySelector("#board-head");
      if (!boardHead || (boardHead == null ? void 0 : boardHead.querySelector(".block"))) {
        return;
      }
      const boardTitle = (_a = boardHead.querySelector(".title-text.black")) == null ? void 0 : _a.innerHTML;
      if (!boardTitle) {
        return;
      }
      const blockHint = "\u5C4F\u853D\u6B64\u7248\u9762\u7684\u70ED\u5E16";
      const unblockHint = "\u53D6\u6D88\u5C4F\u853D\u6B64\u7248\u9762\u7684\u70ED\u5E16";
      const blockBtn = document.createElement("div");
      const assignBlockHint = () => {
        if (blockedBoards.value.includes(boardTitle)) {
          blockBtn.innerText = unblockHint;
        } else {
          blockBtn.innerText = blockHint;
        }
      };
      assignBlockHint();
      blockBtn.addEventListener("click", () => {
        toggleBlockedBoard(boardTitle);
        assignBlockHint();
      });
      blockBtn.className = "block";
      Object.assign(blockBtn.style, {
        cursor: "pointer",
        position: "absolute",
        top: "60px",
        right: "40px",
        color: "#E17819"
      });
      boardHead.appendChild(blockBtn);
    }
  };
  const blockHomepageBoards = () => {
    var _a, _b, _c;
    if (isDesktop) {
      const links = document.getElementsByClassName("topic-link");
      for (const homepageBoardLink of links) {
        const boardTitle = homepageBoardLink.innerText.slice(1, -1);
        if (blockedBoards.value.includes(boardTitle)) {
          homepageBoardLink.innerText = "[\u5DF2\u5C4F\u853D\u7248\u9762]";
          homepageBoardLink.href = "javascript:void(0)";
          const bordTopicLink = homepageBoardLink.nextSibling;
          bordTopicLink.href = "javascript:void(0)";
          bordTopicLink.innerText = "\u5C4F\u853D\u7248\u9762\u7684\u8BDD\u9898";
        }
      }
    } else {
      for (const boardInfoElement of document.querySelectorAll("a.post-info")) {
        const boardTitle = (_b = (_a = boardInfoElement.firstChild) == null ? void 0 : _a.textContent) == null ? void 0 : _b.trim();
        console.log(boardTitle);
        if (boardTitle && blockedBoards.value.includes(boardTitle)) {
          boardInfoElement.innerHTML = "\u5DF2\u5C4F\u853D\u7248\u9762";
          boardInfoElement.previousElementSibling.innerHTML = "\u5C4F\u853D\u7248\u9762\u7684\u8BDD\u9898";
          const postLinkElement = (_c = boardInfoElement.parentElement) == null ? void 0 : _c.querySelector("a.post-link");
          if (postLinkElement) {
            postLinkElement.href = "javascript:void(0)";
          }
        }
      }
    }
    addBlockBoardBtn();
  };
  const blockUser = (event) => {
    const blockBtn = event.target;
    const username = blockBtn.dataset.username;
    if (!username) {
      return;
    }
    addBlockedUser(username);
    blockBtn.parentNode.removeChild(blockBtn);
  };
  const getUsernameAndElement = (postCard) => {
    var _a;
    if (isDesktop) {
      const usernameElement2 = postCard.querySelector(".username a");
      return { username: usernameElement2.innerText, usernameElement: usernameElement2 };
    }
    const usernameElement = postCard.querySelector(".author .name");
    return { username: (_a = usernameElement.firstChild) == null ? void 0 : _a.textContent, usernameElement };
  };
  const getPostContentElement = (postCard) => {
    return postCard.querySelector(".body");
  };
  const getAvatarElement = (postCard) => {
    return isDesktop ? postCard.querySelector("img.portrait") : postCard.querySelector("img.avatar");
  };
  const addBlockBtn = (postCard, username) => {
    const blockBtn = document.createElement("a");
    blockBtn.className = "block";
    blockBtn.innerText = "\u5C4F\u853D";
    blockBtn.dataset.username = username;
    blockBtn.addEventListener("click", blockUser);
    if (isDesktop) {
      const funcElement = postCard.querySelector(".functions .line.wide-btn");
      if (funcElement && !funcElement.querySelector(".block")) {
        funcElement.appendChild(blockBtn);
      }
    } else {
      if (!postCard.querySelector(".block")) {
        blockBtn.style.position = "absolute";
        blockBtn.style.top = "32px";
        blockBtn.style.right = "15px";
        blockBtn.style.color = "#E17819";
        blockBtn.style.fontSize = "12px";
        blockBtn.style.cursor = "pointer";
        postCard.appendChild(blockBtn);
      }
    }
  };
  const blockPostCard = () => {
    const postCards = document.getElementsByClassName("post-card");
    for (const postCard of postCards) {
      const { username, usernameElement } = getUsernameAndElement(postCard);
      if (!username) {
        continue;
      }
      if (blockedUsers.value.includes(username)) {
        const postContent = getPostContentElement(postCard);
        const paraElement = document.createElement("p");
        paraElement.innerText = "\u5C4F\u853D\u7528\u6237\u7684\u53D1\u8A00";
        paraElement.style.color = "red";
        postContent.replaceChildren(paraElement);
        if (usernameElement) {
          usernameElement.innerText = "\u5C4F\u853D\u7528\u6237";
        }
        const portraitElement = getAvatarElement(postCard);
        portraitElement.src = "https://bbs.pku.edu.cn/v2/images/user/portrait-neu.png";
        if (isDesktop) {
          const funcBar = postCard.querySelector(".functions");
          if (funcBar) {
            funcBar.parentNode.removeChild(funcBar);
          }
        }
      } else if (username !== "\u5C4F\u853D\u7528\u6237") {
        addBlockBtn(postCard, username);
      }
    }
  };
  const blockTopicItem = () => {
    for (const topicItem of document.getElementsByClassName("list-item-topic")) {
      for (const authorElement of topicItem.getElementsByClassName("author")) {
        const authorNameElement = authorElement.getElementsByClassName("name")[0];
        const authorName = authorNameElement.innerText;
        if (blockedUsers.value.includes(authorName)) {
          authorNameElement.innerText = "\u5C4F\u853D\u7528\u6237";
          const tilteElement = topicItem.querySelector(".title-cont .title");
          tilteElement.innerText = "\u5C4F\u853D\u7528\u6237\u7684\u8BDD\u9898";
          topicItem.querySelector("a").href = "javascript:void(0)";
          const previousElement = authorElement.previousElementSibling;
          if (Array.from(previousElement.classList).includes("avatar")) {
            previousElement.querySelector("img").src = "https://bbs.pku.edu.cn/v2/images/user/portrait-neu.png";
          }
        }
      }
    }
  };
  const initBlock = () => {
    console.log("BDWM_BLOCK by motaguoke Version: 2.0");
    new MutationObserver(() => {
      blockHomepageBoards();
      blockPostCard();
      blockTopicItem();
    }).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  };
  const createSettingsBtn = () => {
    var _a;
    if (isMobile) {
      const friendMenu = (_a = document.querySelector('a[href*="mode=reject"]')) == null ? void 0 : _a.parentElement;
      if (!friendMenu) {
        throw new Error("Unable to register settings button");
      }
      const settingBtn = document.createElement("li");
      settingBtn.innerHTML = '<img width="10" src="images/user/portrait-neu.png"> \u5C4F\u853D\u8BBE\u7F6E';
      settingBtn.style.cursor = "pointer";
      settingBtn.addEventListener("click", toggleSettings);
      friendMenu.parentElement.appendChild(settingBtn);
    } else {
      const settingParent = document.querySelector(".right-icons");
      if (!settingParent) {
        throw new Error("Unable to register settings button");
      }
      const settingBtn = document.createElement("span");
      settingBtn.innerHTML = '<img width="20" src="images/user/portrait-neu.png">';
      settingBtn.addEventListener("click", toggleSettings);
      settingParent.appendChild(settingBtn);
    }
  };
  var __uno = "";
  initBlock();
  createSettingsBtn();
  const anchorDiv = document.createElement("div");
  document.body.appendChild(anchorDiv);
  vue.createApp(_sfc_main).mount(anchorDiv);
})(Vue);
