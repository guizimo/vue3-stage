import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue3源码解读",
  description: "细读Vue3源码",
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
        text: '源码解读',
        items: [
          { text: '响应式系统', link: '/reactivity' },
          { text: '虚拟 DOM', link: '/vdom' },
          { text: '组件系统', link: '/components' },
          { text: '编译器', link: '/compiler' }
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
