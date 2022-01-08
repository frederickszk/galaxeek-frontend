# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```


# Notes

## 框架相关
- 自动登录逻辑 (`currentUser.mock.ts`).

原模板并未实现自动登录相关，只是简单的保存了一个全局变量`access`，以此判定是否需要登录。

- 菜单栏逻辑

左边的navigator在antdesign-prolayout框架下由`route.ts`中给页面设定`name`和`icon`可自动生成。`icon`选择可参考[antd-icon](https://ant.design/components/icon-cn/).
> 注意命名直接使用实体部分小写，比如皇冠标志类名为`CrownOutlined`，则写`crown`.

## 地图接入相关
- 使用的框架：[Leaflet](https://leafletjs.com/download.html)
- 接入方式

在线引入不好用，因为全局的 `index.html`不方便直接控制。所以最好还是直接利用`npm install leaflet`安装。

安装完毕后在页面文件中引入：
```Typescript
import L from 'leaflet';
import "leaflet/dist/leaflet.css"
```
之后可按照教程进行其它操作。注意第二行的样式文件很重要，不引入可能导致地图加载不正常，会变成一块一块的小方格。

- 动态调整地图高度

由于Leaflet地图引入的特性，必须先放置一个有命名（如`map`）的块，然后才能用JS代码进行地图图层加载等操作，因此需要在React的生命周期函数中进行初始化等一系列处理。因此state中的map变量存在为空值的可能性，增加了代码处理的复杂度。

为实现地图高度动态调整（宽度默认100%），页面挂载及变化时用`document.getElementById()`直接调整`<div>`的高度。注意为了避免`null`报错可使用下述断言操作符`!`：
```Typescript
document.getElementById('test')!.xxx.xxx
```
> 参考教程：[Blog1](https://blog.csdn.net/weixin_30645617/article/details/96842586), [Blog2](https://blog.csdn.net/m0_37697423/article/details/106100922)
