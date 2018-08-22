# iMovie
![img](https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3880303282,404230604&fm=85&s=7FAC346257B57786A06CC2C60200E0A3)

一个基于react + antd + 全网开放接口聚合而成的轻量级电影信息web app
 
```
  技术栈:
  1.React, Create-React-App, React-Router 4.x
  2.Ant Design
  3.豆瓣api
```
feature:  
#### 搜索页面
  - 近期热门
  - 根据关键词进行搜索
  - 根据tag进行搜索 
#### 随机tag
  - 随机出现几个tag
  - 选中tag之后过滤出具有该tag
-----------------------------
#### 下一版本新功能
1. [bug] loading icon
2. [feature] 点击电影进入详情 (list + new page + 电影条目api)

#### 更新日志
2018-8-16----更新搜索loading以及背景
2018-8-24----更新电影详情页
api: 

https://api.douban.com/v2/movie/search?q=

安装: 
```
cd imovie 

npm install

npm start

```

__________________
#### 未解决的问题
1.react的状态控制
2.多层路由嵌套问题
