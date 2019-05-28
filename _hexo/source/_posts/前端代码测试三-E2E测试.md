---
title: 前端代码测试三(E2E测试)
date: 2019-05-28 14:46:23
categories: Javascript
tags:
    - Javascript
    - Testing
---

## 端到端测试

在第二部分，我们看到测试的其中一种——单元测试。我们对应用的核心逻辑进行了测试——calculator模块——使用到了mocha框架并编写了测试代码。

在这一部分，我们将看到测试的另一种——E2E测试，我们将会从用户的角度来看待并测试整个应用。

在我们的app中，整个应用就只有前端代码，它不需要也没有后端的支持，所以我们要做的E2E测试就是要在浏览器下打开我们的应用，并且模拟一系列用户使用键盘来计算结果的行为，并且校验计算器显示的结果和我们的预期是否一致。

说到这里，五岁能抬头的小伙伴们肯定都有一个疑问，使用键盘的行为用排列组合来算的话数量非常巨大，我们是否要像单元测试那样，需要覆盖所有的场景和可能性呢？答案是，No！我们在单元测试中已经确保这些。我们在E2E中做的不是单个单元中做的事情，而是多个或者全部单元一起工作的时候是否正常。

## 需要写多少的E2E测试

这里有一个为什么不应该写太多E2E测试的原因——如果我们已经在单元测试和交互测试中测试了，我们可能已经确保了所有的可能性都是正确的。E2E测试需且仅需确保所有的单元一起工作的时候正常就行了。

还有两外两个原因为什么我们不需要太多的E2E测试，第一个就是因为这些测试非常的慢。如果你有上百个这种测试用例，就像你的单元测试或者交互测试中这么多德话，意味着跑完你的测试需要大量的时间，但是别忘记了——测试应该要快。

不需要太多E2E测试的最后一个原因就是这些测试都是不可靠的。不可靠的测试是有时候可以通过，有时候又不可以通过。这在单元测试中是不可能发生的，因为它们很简单，输入——计算——输出，几乎只需要cpu就可以完成。但是一个测试越是与I/O相关（I/O指的是那种不仅仅是CPU或者内存驱动的），它越是不可靠。如何减少测试的不可靠性？对的，就是减少数量到一个你认为可以接受的程度。那我们可以写出完全可靠的E2E测试吗？可能吧，但是我从来没有见过。

## 编写前端的E2E测试

好了，让我们开始编写E2E测试代码吧。我们的测试需要准备做两件事情：1 - 一个浏览器，2 - 一个web服务器用来serve我们的前端页面。

由于我们用了mocha这个框架来做E2E测试，跟我们的单元测试一样，我们首先要打开浏览器和启动web服务器，我们在mocha的before钩子里面去做，然后在after钩子里面关闭浏览器和web服务器。这两个钩子在分别在所有测试之前和之后运行，一般用于初始化一些测试所需的条件。

让我们先来做第一个事情：启动web服务器。

## 在mocha中启动web服务器

一个Nodejs的web服务器？长得帅的人马上就会想到express，所以我就不多废话了，直接上代码：

```js
let server

before((done) => {
    const app = express()
    app.use('/', express.static(path.resolve(__dirname, '../../dist')))
    server = app.listen(8080, done)
})

after(() => {
    server.close()
})
```

在这一步，在before的钩子里，我们创建了一个express应用，然后把它指向目录dist，监听8080端口。最后在after钩子里面关闭这个服务器。

这个dist是什么呢？简单来说就是放置我们js打包后的代码（我们用的webpack打包），然后在把我们的HTML和CSS放进去的目录。你们看一下package.json里面的npm build指令

```json
{
  "name": "frontend-testing",
  "scripts": {
    "build": "webpack && cp public/* dist",
    "test": "mocha 'test/**/test-*.js' && eslint test lib",
...
},
```

这就是说我需要先npm run build，然后在才可以继续e2e的测试。是不是有点不太方便？我们在单元测试的时候并不需要去打包因为单元测试运行在node环境下，不需要编译或者打包。

为了更好的理解这个，我们看一下webpack.config.js里面是如何进行打包的：

```js
module.exports = {
  entry: './lib/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  ...
}
```

webpack会先读取我们的app.js文件，然后把这个文件所有的依赖都递归的打包成bundle.js文件，然后放入dist文件夹。

dist文件夹也就是生产环境文件夹，就正如你在E2E测试里所看到的一样。这个非常重要——E2E测试运行的环境与生产环境要尽可能一致。

## Mocha中模拟一个浏览器

现在我们的服务器起好了，我们的代码也可以通过服务器访问了，剩下的事情就是启动一个浏览器然后运行我们的代码了。我们要用什么框架来做浏览器的自动化呢。我用的最多的是selenium-webdriver，因为它比较流行。

首先，在深入了解之前，我们先简单的看一下如果使用这个driver：

```js
const {prepareDriver, cleanupDriver} = require('../utils/browser-automation')

//...
describe('calculator app', function () {
  let driver
  ...
  before(async () => {
    driver = await prepareDriver()
  })
  after(() => cleanupDriver(driver))

  it('should work', async function () {
    await driver.get('http://localhost:8080')
    //...
  })
})
```

在before钩子里，我们初始化好一个driver，在after钩子里面，我们销毁这个driver。初始化一个driver将会打开一个浏览器（Chrome，需要等一会），销毁这个driver浏览器就会被关闭。需要注意的是初始化一个driver是异步的，它返回一个promise对象，我们可以用async/await功能来使我们的代码更加美观。（好消息，自从Node 7.7版本起，Node开始原生支持async/await功能！）

最后，我们在测试用例里面，我们用浏览器打开网址http://localhost:8080，这里依然要使用await，因为driver.get方法也是异步的。

我们来看看的prepareDriver和cleanupDriver的实现：

```js
const webdriver = require('selenium-webdriver')
const chromeDriver = require('chromedriver')
const path = require('path')

const chromeDriverPathAddition = `:${path.dirname(chromeDriver.path)}`

exports.prepareDriver = async () => {
  process.on('beforeExit', () => this.browser && this.browser.quit())
  process.env.PATH += chromeDriverPathAddition

  return await new webdriver.Builder()
    .disableEnvironmentOverrides()
    .forBrowser('chrome')
    .setLoggingPrefs({browser: 'ALL', driver: 'ALL'})
    .build()
}

exports.cleanupDriver = async (driver) => {
  if (driver) {
    driver.quit()
  }
  process.env.PATH = process.env.PATH.replace(chromeDriverPathAddition, '')
}
```

这个代码写出来并不容易（这个代码我只考虑在Unix系统下运行，如果有谁想支持windows，欢迎提pr），我查阅了Google/Stack Overflow/webdriver等的文档，然后经过自己的各种尝试修改，终于运行成功了。

从理论上说，你可以直接复制/粘贴到你的代码里面，不需要理解，但是我们还是要深入解析它的原理。

前两行代码引入了webdriver，相当于浏览器driver。Selenium webdriver的工作原理就是通过一个API可以调用各种各样的浏览器，它依赖于浏览器driver来调用浏览器。我们这里用到的浏览器driver就是chromedriver，可见于代码第二行。

chrome driver不需要你在电脑上打开一个chrome —— 其实它会安装一个Chrome执行命令启动器当你npm install的时候。很惭愧，有一个东西我没有找到原因，就是chromedriver文件夹必须需要添加的path环境变量里（相当于windows的环境变量），我们在第九行代码做了这个件事。当然，我也会在clearup的时候去删除这个path，可见于代码22行。

到这里我们就初始化好了browser driver，接下应该初始化web driver了——可见于11-15行代码。由于这一步是异步的并且返回了一个promise对象，我们使用await来处理。


## 测试~测试~

准备工作完毕——是时候用它们来做一些测试了。

测试的所有代码在这里。但是让我们来一步步深入，因为这些测试有点难以理解。

```js
// ...
const retry = require('promise-retry')
// ...

  it('should work', async function () {
    await driver.get('http://localhost:8080')

    await retry(async () => {
      const title = await driver.getTitle()

      expect(title).to.equal('Calculator')
    })
    //...
```

我省略了初始化的代码，这样我们看起来会更加清晰，也更加可以集中在我们的测试代码上。

上面的代码打开了我们的计算器app，并且检测了网页的标题title为“Calculator”，我们一行行讲解：

第一行——我们打开了app网址。别忘记了await。

然后直接看第九行，在这里，我们要求浏览器返回它的title（异步的操作记得await），然后接下来第十行，我们检测标题是否正确。

但是我们为什么要用promise-retry模块呢？原因非常重要，我们在接下来的测试中也会有这个问题——当我们调用浏览器去做某件事情的时候，例如打开一个网页，浏览器会照做，但是是异步的。别让await迷惑了你。我们在等待浏览器回应——这件事我做好了，这样程序就相当于暂停了。

不幸的是，如果你没有在这里retry，程序运行也有可能正常，因为浏览器响应非常快。但是你可以尝试在一个很卡的环境中运行，例如travis，就像我之前尝试的那样，你可能会得到一个错误，因为CI-s一般都会比你的系统慢一点点。

这就是为什么浏览器的E2E测试，我们要retry我们的检查。

## 查找元素

继续我们的测试！

```js
const {By} = require('selenium-webdriver')
  it('should work', async function () {
    await driver.get('http://localhost:8080')
    //...

    await retry(async () => {
      const displayElement = await driver.findElement(By.css('.display'))
      const displayText = await displayElement.getText()

      expect(displayText).to.equal('0')
    })

    //...
```

接下来我们要测试的是，最初的状态，显示的值为“0”。为了去做这个事情，我们要先找到显示这个值的，有一个classname为'display'的元素。在代码第七行，webdriver去查找这个元素。我们也可以通过By.id来查找，或者通过By.css，或者其他的API。我通常使用By.css——它接受一个选择器作为参数的用法非常友好，虽然By.javascript看起来更加友好。

如果你没有注意，我就说一下，By是在第一行引入的。

当我们查找到这个元素，我们使用getText()（你可以使用其他的）方法来获取text，然后检查它是否正确。可见于第十行。别忘记await！
![(Thanks to http://www.memeking.co.il/)](https://cdn-images-1.medium.com/max/800/1*JSF-szgDnH4GiiFBmbEdQQ.png)

## driving the UI

是时候来驱动一下我们的应用了——点击一写数字和运算符，然后检查计算的结果是否正确。

There we go —— 先找到需要点击的元素，可见于行2-4。然后点击他们，行6-7（输入的是"42*2="）

然后retry知道我们的得到正确的计算结果 —— “84”。

## 运行我们的测试用例
我们现在有了E2E测试，单元测试，让我们运行一个npm test命令。
![Running E2E and unit tests together](https://cdn-images-1.medium.com/max/800/1*P8zOYNoxd1m-K29Eu9gJ-Q.png)

恭喜兄弟，你绿了！

## 关于await的一些话

如果你看过很多网上的例子，你会发现他们并没有使用async/await，或者甚至直接使用promise回调。No！他们写的是同步的代码。这是怎么回事？实话说，我不知道，但是看起来在webdriver的使用上非常的奇怪。就像selenium曾经说的那样，这只是一个过渡阶段的解决方案，直到Node支持async和await。

然后现在你懂得。。

## 关于文档的一些话

Selenium的文档真的是。。。够java的。这并不是赞扬。换句话说，还能忍受。你如果去看，你就知道了。

## 下一周

我们又学习了一种新的测试，下一周，我们将会讲解集成测试。

## 总结

这一周知识点

- 我们写了一些粗浅的代码，用来初始化浏览器。幸运的是，我们只需要写一次。
- 我们学习了怎么使用webdriver API去驱动浏览器并获取元素和他们的值。
- 我们使用了async/await，记得所有的webdriver API都是异步的promise。
- 我们讲解了为什么E2E测试需要使用retry。
