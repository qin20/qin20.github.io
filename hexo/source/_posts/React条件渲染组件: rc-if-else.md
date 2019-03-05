---
title: React条件渲染组件:rc-if-else
categories: Javascript
date: 2019-02-28 16:58:22
tags:
    - react
    - conditional-rendering
    - rc-if-else
    - show-hide-element
    - react-component
---

## 前言
在做后台系统的时候，需要进行大量的内容权限控制，涉及到大量内容的显示和隐藏，写了不少的if-else，最后封装了一个条件渲染组件: rc-if-else，使用更简单、灵活，代码更加简洁

## 普通写法
这里只是写个简单的demo以做比较，当然还可以使用for或者其他的封装方式来优化代码，这里暂不讨论
```js
import React from 'react';
...

render() {
    ...
    return (
        <Menu>
            {
                permission1 && permission2 && permission3  && permission4
                    ? (
                        <SubMenu>
                            { permission1
                                ? (
                                    <Menu.Item key="home">
                                        <Icon name='menu1'></Icon>
                                        <span>Menu1</span>
                                    </Menu.Item>
                                ) : null
                            };
                            { permission2
                                ? (
                                    <Menu.Item key="home">
                                        <Icon name='menu2'></Icon>
                                        <span>Menu2</span>
                                    </Menu.Item>
                                ) : null
                            };
                            { permission3
                                ? (
                                    <Menu.Item key="home">
                                        <Icon name='menu3'></Icon>
                                        <span>Menu3</span>
                                    </Menu.Item>
                                ) : null
                            };
                            { permission4
                                ? (
                                    <Menu.Item key="home">
                                        <Icon name='menu4'></Icon>
                                        <span>Menu4</span>
                                    </Menu.Item>
                                ) : null
                            };
                        </SubMenu>
                    ) : null
            }
            ...
        </Menu>
    );
}

```

## 使用rc-if-else的写法
使用[rc-if-else](https://npmjs.org/package/rc-if-else)之后，上面的代码可以这样写
```js
import React from 'react';
import { If } from 'rc-if-else';
...

render() {
    ...
    return (
        <Menu>
            <If condition={permission1 && permission2 && permission3  && permission4}>
                <SubMenu key="React Demo" title={<span><StyledIcon icons={[iconResource, iconResourceHover]} />React Demo</span>}>
                    <If condition={permission1}>
                        <Menu.Item key="home">
                            <Icon name='menu1'></Icon>
                            <span>Menu1</span>
                        </Menu.Item>
                    </If>
                    <If condition={permission2}>
                        <Menu.Item key="home">
                            <Icon name='menu2'></Icon>
                            <span>Menu2</span>
                        </Menu.Item>
                    </If>
                    <If condition={permission3}>
                        <Menu.Item key="home">
                            <Icon name='menu3'></Icon>
                            <span>Menu3</span>
                        </Menu.Item>
                    </If>
                    <If condition={permission4}>
                        <Menu.Item key="home">
                            <Icon name='menu4'></Icon>
                            <span>Menu4</span>
                        </Menu.Item>
                    </If>
                </SubMenu>
            </If>
            ...
        </Menu>
    );
}
```

## 安装
欢迎大家安装使用
```Bash
npm install --save rc-if-else
```

[![](https://nodei.co/npm/rc-if-else.png)](https://npmjs.org/package/rc-if-else)

## 结语
更多使用方法请看：[https://npmjs.org/package/rc-if-else](https://npmjs.org/package/rc-if-else)
如果有更好的实现方式或疑问，欢迎评论留言
