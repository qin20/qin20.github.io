# 老项目中使用单页面技术实现前后端分离示例说明

### 概览
- 本示例中使用vue和iview框架进行开发，react框架原理类似
- 本示例中不影响之前前端的代码和架构，之前的代码不需要做任何修改
- 本示例中后端不需要做任何修改
- 本示例技术栈：
  - webpack
  - vue
  - iview
  - es6
  - less

### 新代码目录说明
本示例主要在`/static/project/`目录下，增加一个新目录`es6`用来放置新的代码，目录主要结构说明如下：

```bash
  /staitc/project
  ├── js # 旧目录
  ├── images # 旧目录
  ├── css # 旧目录
  ├── es6 # <---------------------- 新目录
  │   ├── scripts # 脚手架工具
  │   ├── dist # 正式环境代码
  │   ├── src # 开发环境代码
  │   │   ├── assets # 放置icon，图片等
  │   │   ├── views # (!重要)这个下面每一个文件夹就是一个模块
  │   │   |   ├── example # 模块名称
  │   │   |   |   ├── index.js # (!重要)，每个模块有且只有一个入口文件，命名为`index.js`，目前脚手架只识别这个名字
  │   │   |   |   ├── a.vue # 其他代码
  │   │   |   |   |
  │   ├── package.json

```

### 开发流程说明

*为了可以更好的理解，现在使用jelly项目做示例，示例分支`feat/es6`。*

假设现在需要开发新模块`es6_example`，用新框架需要做以下步骤。

1。 首先，后端新增路由`/es6_example/*`，在`templates`文件夹下面新建`es6_example.html`作为后端渲染的模版，`es6_example.html`写法和老项目一样，但是继承自`es6_base.html`，这个base进行了少许优化，去掉不需要的逻辑和代码。

2。 第二，在上面说到的`es6`文件下，找到模块目录`src/views`，新建文件夹`es6_example`，然后新建入口文件`index.js`

3。 第三，进入到`es6`文件夹下，安装项目依赖：

   ```base
   npm i
   ```
4。 然后启动前端开发服务器，端口：`9999`：

   ```bash
   npm run dev
   ```

   启动后台服务器，端口：`7171`：

   ```bash
   env=dev ./run.py
   ````

   在`es6_example.html`里面引入开发环境js进行热加载开发调试

   ```html
   <script src="http://localhost:9999/es6_example.js"></script>
   ```

   开发环境准备完毕，可以进行代码的开发了。

   在浏览器输入: `http://localhost:7171/es6_example`，就可以看到页面啦。

5。 代码开发完毕，需要提测、上线，运行打包命令：

   ```bash
   npm run build
   ```

   等待代码打包完毕，手动替换`es_example.html`中上面提到的js文件路径为打包后的路径：

> 这个暂时没有实现自动化，后面会实现


   ```html
    <script src="/static/project/es6/dist/es6_example.51dca684.js"></script>
   ```

   提交代码，完成开发。

### 总结
本示例已经实现了雪碧图的打包，但是不是开发流程主要内容，所以没有提及。其实本示例中有很多东西还可以完善，但是基本的开发已经可以跑通，之后的优化可以按照需求来增加，比如服务器渲染等。
