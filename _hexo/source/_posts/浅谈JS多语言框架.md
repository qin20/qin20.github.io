---
title: 浅谈JS多语言框架
date: 2019-03-04 17:40:52
categories: Javascript
tags:
    - js框架
    - locales
    - 国际化
    - 多语言
---
## 一、Locales
我们经常在网上看到的一些支持多语言的网站或者插件 (例如`jquery-ui`)，设置多语言的都会看到例如`en`、 `en_US`、`zh_CN`等。 这些其实就是描述一种语言具体信息的集合, 用下划线`_`或者断线`-`分割, 最前面部分通常是指语言, 比如英语、 中文、日语等。第二部分通常是指国家或者地区，比如美国英语(`en-US`)、阿根廷英语(`es-AR`)。一般只用到这两个信息就够了，当然后面还可以写更多描述的信息，具体描述信息请参考 [BCP 47](https://tools.ietf.org/html/bcp47)。
虽然全世界语言有很多种，但是大部分网站其实只需要实现其中少数的几种就可以了。

## 二、判断用户需要什么语言
- 在浏览器让用户明确选择语言的类型，再根据用户选择跳转到相应语言的页面`（推荐）`
- 服务器通过http请求头`Accept-Language`来判断用户语言类型
- 客户端通过`navigator.language`或`navigator.browserLanguage`来判断用户语言类型


## 三、框架

### 1. format.js and window.intl
[formatjs](https://formatjs.io/)，好像是`window.intl`的polyfill，如果没有`window.intl`才会加载，使用示例：

```js
// 静态字符串
"Hello everyone"
// 带参数的字符串
"Hello {who}"
// 带参数类型的字符串
"I have {numCats, number} cats."
// 带参数类型的类型的字符串
"Almost {pctBlack, number, percent} of them are black."
// 自定义参数类型
formats = {
    number: {
        usd: { style: 'currency', currency: 'USD' }
    }
};
// 带自定义类型的字符串
"Your total is {total, number, usd}"
// 有多种情况的字符串(select，根据条件)
`{gender, select,
    male {He}
    female {She}
    other {They}
} will respond shortly.`
// 有多种情况的字符串(plural，根据数量)
`Cart: {itemCount} {itemCount, plural,
    one {item}
    other {items}
}`
// 有多种情况的字符串(selectordinal，根据顺序)
`It's my cat's {year, selectordinal,
    one {#st}
    two {#nd}
    few {#rd}
    other {#th}
} birthday!`
```
在`react`中使用:
```js
import {IntlProvider, FormattedMessage} from 'react-intl';
...

render() {
    ...

    return (
        <IntlProvider locale="en">
            <p>
                <FormattedMessage
                    id="welcome"
                    defaultMessage={`Hello {name}, you have {unreadCount, number} {unreadCount, plural,
                      one {message}
                      other {messages}
                    }`}
                    values={{name: <b>{name}</b>, unreadCount}}
                />
            </p>
        </IntlProvider>
    );
}
```

### 2. jQuery.I18n.js
[jquery.i18n](https://github.com/wikimedia/jquery.i18n)(`i18n: internationalization缩写，中间18个字母`)，配置文件为基于`json`格式的文件，大概如下

#### 单个语言的配置文件：
```json
{
    "@metadata": {
        "authors": [
            "Me"
        ],
        "last-updated": "2016-09-21",
        "locale": "en",
        "message-documentation": "qqq"
    },
    "appname-title": "Example Application",
    "appname-sub-title": "An example application with jquery.i18n"
}
```

#### 多个语言的放在一起的配置文件：
```json
{
    "@metadata": {
        "authors": [
            "Me"
        ],
        "last-updated": "2016-09-21",
        "message-documentation": "qqq"
    },
    "en": {
        "appname-title": "Example Application"
    },
    "ru": {
        "appname-title": "Ð¢ÐµÑÑ‚Ð¾Ð²Ð¾Ðµ Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ðµ"
    },
    "//": "动态加载配置文件（此行为json注释）",
    "en_US": "en_US.yml"
}

```
#### demo：
```html
<!-- 需要指定lang="en" -->
<html lang="en" dir="ltr">
    <head>...</head>
    <body>
        <a href="#" class="lang-switch" data-locale="en">English</a> |
        <a href="#" class="lang-switch" data-locale="ru">Русский</a>
        <h1 data-i18n="welcome"></h1>
        <p id="messages"></p>
        <script>
            jQuery(document).ready(function() {
                var update_texts = function() {
                    $('body').i18n();
                };
                $.i18n().load({
                    'en': {
                        'welcome': 'Welcome!',
                        'message_from': '$1 has send you $2 {{plural:$2|message|messages}}. {{gender:$3|He|She}} is waiting for your response!'
                    },
                    'ru': {
                        'welcome': 'Ð”Ð¾Ð±Ñ€Ð¾ Ð¿Ð¾Ð¶Ð°Ð»Ð¾Ð²Ð°Ñ‚ÑŒ!',
                        'message_from': '$1 {{gender:$3|Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð¸Ð»|Ð¾Ñ‚Ð¿Ñ€Ð°Ð²Ð¸Ð»Ð°}} Ð²Ð°Ð¼ $2 {{plural:$2|ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ðµ|ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ð¹|ÑÐ¾Ð¾Ð±Ñ‰ÐµÐ½Ð¸Ñ}}. {{gender:$3|ÐžÐ½|ÐžÐ½Ð°}} Ð¶Ð´Ñ‘Ñ‚ Ð¾Ñ‚Ð²ÐµÑ‚Ð°!'
                    }
                });
                update_texts();
                // 点击切换语言
                $('.lang-switch').click(function(e) {
                    e.preventDefault();
                    $.i18n().locale = $(this).data('locale');
                    update_texts();
                });
            });
        </script>
    </body>
</html>
```

### 3. Polyglot.js

[polyglot](https://github.com/airbnb/polyglot.js)，体积小，用法如下：

```js
// 设置所有的字符串
polyglot.extend({
    // pluralization
    "num_cars": "%{smart_count} car |||| %{smart_count} cars",
    "hello": "Hello",
    "hello_name": "Hello, %{name}."
    "nav": {
        "sidebar": {
            "welcome": "Welcome"
        }
    }
});
// 取字符串
polyglot.t("hello_name", {name: "John"});
polyglot.t("nav.sidebar.welcome");
polyglot.locale("de");
```
```html
...

<script src="polyglot/polyglot.js"></script>
<script src="polyglot/main-polyglot.js"></script>
<script src="common/jquery.js"></script>
<script src="common/underscore.js"></script>
<script type="text/template" id="main-content">
   <p><%= hello %></p>
   <small><%= unread %></small>
</script>
<script>
 jQuery(document).ready(function() {
    var polyglot = new Polyglot({
        phrases: {
            "hello": "Hello, %{name}!",
            "unread": "You have %{smart_count} unread message |||| You have %{smart_count} unread messages"
        }
    });
    var main_content_temp = _.template($('#main-content').html());
    $('body').prepend(main_content_temp({
        hello: polyglot.t('hello', {name: 'John'}),
        unread: polyglot.t('unread', {smart_count: 2})
    }));
});
</script>

...
```

### 4. Globalize.js
[globalize.js](https://github.com/globalizejs/globalize)，实例如下
```html
...

<body>
    <h1 id="welcome"></h1>
    <p id="earnings"></p>
    <script>
        jQuery(document).ready(function() {
            // step 1
            Globalize.loadMessages({
                "en": {
                    'welcome': 'Welcome, {name}!',
                    'welcome_0': 'Welcome, {0}!',
                    'earned': 'Today is {date} and you\'ve earned {amount}!'
                }
            });
            // step 2
            var globalize = new Globalize("en");
            // step 3
            var welcome_message = globalize.messageFormatter('welcome');
            $('#welcome').text( welcome_message({name: 'John'}) );
            $('#earnings').text(
                globalize.messageFormatter('earned')({
                    amount: globalize.formatCurrency(500.5, 'USD'),
                    date: globalize.formatDate( new Date(), {
                        datetime: "medium"
                    })
                })
            )
        });
    </script>
</body>

 ...
```

## 四、总结
部分库会提供对一些特定类型字符串(`时间日期格式、金钱格式、长度单位等`)进行转换的功能，体积就会大一点，，如`format.js`、`globalize.js`，小一点的库`polyglot.js`、`jquery.i18n`则没有这种功能。根据我们项目的需求，个人还是比较倾向于`globalize.js`，插件功能比较丰富一点，兼容性比较好，功能插件化，用不到不需要引入，用得到时候可以快速拿过来使用。

##### 需要注意的是：
1. 几乎所有的框架使用的字符串模板格式都参考了[ICU Message](http://userguide.icu-project.org/formatparse/messages)语法。
2. 不管你使用哪种库，都需要你事先准备好翻译好的所有文字信息，框架`不会`自动帮你翻译。

##### 参考链接
1. https://marcoscaceres.github.io/jsi18n/
2. https://phraseapp.com/blog/posts/step-step-guide-javascript-localization/
3. https://tools.ietf.org/html/bcp47
