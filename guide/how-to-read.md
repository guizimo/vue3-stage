

# 如何阅读源码

## 1、为什么要学习源码

- **阅读优秀的代码是为了让我们也能够写出优秀的代码**，让我们的代码将来有一天也成为优秀的源码，让他人学习。
- **深入理解框架原理**，优化和扩展能力。
- **走出舒适圈**，让自己积累一定的技术壁垒，提升竞争力。

## 2、怎么去阅读源码

> **带有功利性的阅读源码！！！**
>
> 如果你只是为了阅读源码而去学习源码，那么将很难学习下去。一定要带有**功利性**，你学习了源码了之后，就一定要有回报（听前辈所言）。这个回报可能是让你深刻理解了某个优秀的设计解决了一个关键问题，又或者是助你顺利的拿下了面试。

而阅读源码一般有两种方式：**单点突破**和**系统掌握**。（当然还有另外一种：漫无目的）

### 2.1、单点突破

**单点突破**是一种聚焦于特定问题或模块的阅读源码方法，适合在短时间内解决实际问题或深入理解某个具体功能。

一般这种情况是在做需求中遇到了某个问题，或者是突然对某个技术点感兴趣，想了解它的前世今生，从而对单个模块进行死缠烂打。

### 2.2、系统掌握

**系统掌握**是一种全面、系统地阅读源码的方法，适合对整个项目或框架有深入理解的需求。

这种情况，大多是在面临技术瓶颈的时候，希望突破自己。或者就是要面试了，需要给自己增增肥。

## 3、前期准备

**基础知识**

- JavaScript（ES6+）
- TypeScript
- Vue.js 框架基础
- Node.js 和 npm/yarn/pnpm
- monorepo、lerna

**工具准备**

- 安装 Node.js 和 npm/yarn/pnpm
- 安装代码编辑器（如 VS Code/ Webstorm）
- 熟悉 Git 和 GitHub

## 4、了解 Vue 3 项目结构

### 4.1、拉取 Vue 3 代码

**克隆 Vue 3 仓库**

```shell
git clone https://github.com/vuejs/core.git
```

> 笔者写作时，`Vue3`源码版本为：**3.4.31**

**安装依赖**

```shell
pnpm i
```

### 4.2、Vue 3 源码结构

相比 `Vue 2` 中，所有的源码都存在 `src` 目录下：

<img src="https://guizimo.oss-cn-shanghai.aliyuncs.com/img/image-20240627215007691.png" alt="image-20240627215007691" style="zoom: 33%;" />

`Vue 3` 相对于 `Vue 2` 使用 `monorepo` 的方式**进行包管理**，使用 `monorepo` 的管理方式，使得 `Vue 3` 源码模块职责显得特别地清晰明了，每个包独立负责一块核心功能的实现，方便开发和测试。

<img src="https://guizimo.oss-cn-shanghai.aliyuncs.com/img/image-20240627214805953.png" alt="image-20240627214805953" style="zoom:33%;" />

模块核心职责清晰明了，提高了整体程序运行的健壮性！

**项目结构概览**

进入源码目录执行 `tree -aI ".git*|.vscode|.idea" -C -L 1` 获取整个目录结构。

> `tree`是一个获取目录结构的命令行工具，若你的电脑未安装的话，需要提前安装

```json
├── .prettierignore
├── .prettierrc // 代码格式化 prettier 的配置文件
├── BACKERS.md
├── CHANGELOG.md
├── FUNDING.json
├── LICENSE
├── README.md
├── SECURITY.md
├── changelogs // 更新日志
├── eslint.config.js
├── netlify.toml
├── node_modules
├── package.json
├── packages     // Vue源代码目录
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── rollup.config.js   // 模块打包器 rollup 的配置文件
├── rollup.dts.config.js
├── scripts // 构建和发布脚本
├── temp
├── tsconfig.build-browser.json
├── tsconfig.build-node.json
├── tsconfig.json // TypeScript 配置文件
├── vitest.config.ts
├── vitest.e2e.config.ts
└── vitest.unit.config.ts
```

这里主要关注packages目录，这里放置了Vue 3的核心逻辑，整个结构如下：

```json
├── compiler-core  // 核心编译器逻辑
├── compiler-dom  // Dom的实现
├── compiler-sfc // 单文件组件编译逻辑
├── compiler-ssr 
├── dts-built-test
├── dts-test
├── global.d.ts
├── reactivity // 响应式系统
├── runtime-core // 核心运行时逻辑
├── runtime-dom  // 针对 DOM 的运行时逻辑
├── runtime-test
├── server-renderer // 服务端渲染实现
├── sfc-playground
├── shared  // 共享的工具函数和类型
├── template-explorer
├── vue
└── vue-compat
```

在上面的目录中，最主要的就是三大模块：`compiler`、`runtime`和`reactivity`。

## 5、本地调试Vue 3源码

在之前`clone`到本地的`Vue3`项目中，进入到`package.json`文件，修改配置，在`build`脚本末尾添加`-s`开启`sourcemap`，方便我们调试代码。

```json
"build": "node scripts/build.js -s"
```

重新构建打包生成新的 `vue`静态资源。

```shell
npm run build
```

**创建学习目录**

可以在`packages/vue/examples`目录下创建`learning`文件夹。在其中可以创建测试的代码，方便调试时查看`Vue`源码的数据流向，例如下面的例子：

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
<script src="../../dist/vue.global.js"></script>

<div id="app"></div>
<script>
  const { reactive, effect } = Vue

  const obj = reactive({
    name: 'jc'
  })

  effect(() => {
    document.querySelector('#app').innerHTML = obj.name
  })

  setTimeout(() => {
    obj.name = 'cc'
  }, 2000)
</script>

</body>
</html>
```

**调试**

在浏览器中，找到对应模块的源码，可以使用**断点调试**。

![image-20240904111901121](https://guizimo.oss-cn-shanghai.aliyuncs.com/img/image-20240904111901121.png)

当然也可以在源码处通过**console大法**调试，不过需要频繁重新构建哈。

## 6、学习建议

- 一定要动手调试代码
- 时刻有个大纲在心里，目前正处于大纲的哪一部分
- 利用好单元测试（顺便就多学个技能了）
- 学会跳一跳（某个一时半会无法理解的点，先跳过，只要不忘记大纲，发现它会在后面等你）
- 带着疑问来阅读，给自己答复
