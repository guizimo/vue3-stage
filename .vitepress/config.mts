import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vue3-stage/',
  title: "Vue3源码解读",
  description: "细读Vue3源码",
  head: [['link', { rel: 'icon', href: 'https://vuejs.org/logo.svg' }]],
  themeConfig: {
    // 搜索配置
    search: {
      provider: 'local' // 使用内置的本地搜索
    },

    // 导航栏配置
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about' },
    ],

    // 侧边栏配置
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '简介', link: '/guide/introduction' },
          { text: '如何阅读源码', link: '/guide/how-to-read' },
        ]
      },
      {
        text: '响应式系统',
        items: [
          { text: 'reactive', link: '/reactivity/reactive' },
        ]
      }
    ],

    // 社交链接配置
    socialLinks: [
      { icon: 'github', link: 'https://github.com/guizimo/vue3-stage' }
    ],

    // 页脚配置（可选）
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Guizimo'
    }
  }
})
