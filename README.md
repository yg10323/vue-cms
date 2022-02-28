# vue-front-cms
外卖点餐的后台管理系统, 对应的前台点餐系统: [uniapp-order](https://github.com/yg10323/uniapp-order) 和 后端接口: [koa-apis](https://github.com/yg10323/koa-apis)

## 安装依赖
```
npm install
```
## 运行
```
npm start
```
## 项目的一些介绍
### 一. 扫码登陆
扫码功能需配合 [uni-app的前台点餐项目](https://github.com/yg10323/uniapp-order) 使用
二维码由node后台生成, 扫码登陆功能自己实现, 由socket.io、redis、BroadcastChannel配合完成

![image](https://user-images.githubusercontent.com/48284901/155941081-b598cf04-4308-4d34-b498-167f6aeb208e.png)
### 二. 卖家相关的功能
#### 2.1 总览
![image](https://user-images.githubusercontent.com/48284901/155941920-f5f264a9-588e-4223-8a4a-aa2a80eadaf5.png)
#### 2.2 店铺管理
店铺管理包括: 注册店铺、店铺信息查看编辑、店铺流水以及店铺评价
##### 2.2.1 注册店铺
一个卖家账号只允许注册一个店铺, 并且在注册店铺之前要进行实名登记(在个人中心中)
(gif图像加载慢, 请耐心等待)

![注册店铺](https://user-images.githubusercontent.com/48284901/155942923-2b4f9e96-6d23-4cbe-9013-3096d9da722c.gif)
##### 2.2.2 店铺信息管理
![店铺信息](https://user-images.githubusercontent.com/48284901/155943328-62b9a574-eeac-4a3b-bedc-b2ab212018d7.gif)
##### 2.2.3 店铺流水
使用echarts做的图表展示

![image](https://user-images.githubusercontent.com/48284901/155943503-e282cd83-2b44-424f-b05d-f8614c598f3b.png)
##### 2.2.4 评价管理
卖家可对买家的评价进行评价

![image](https://user-images.githubusercontent.com/48284901/155943676-bb15889d-b1d1-4c70-b9b1-5e5652cabbd6.png)
#### 2.3 食品管理
食品管理包括: 新增食品信息和食品信息查看、编辑
##### 2.3.1新增食品
![image](https://user-images.githubusercontent.com/48284901/155944057-8021c886-3b8b-45ee-84c7-a6ee1be811aa.png)
##### 2.3.2 食品信息管理
![食品信息管理](https://user-images.githubusercontent.com/48284901/155944383-3d64f8c5-bf92-4a14-be5f-028472398018.gif)
#### 2.4 订单管理
订单管理包括: 今日订单和往日订单
因为数据的展示是一样的, 只是订单生成的日期不同, 所以下面图片只展示一个

![image](https://user-images.githubusercontent.com/48284901/155944547-f0bb782d-a83b-4b56-92c6-5f81f6b8590b.png)
#### 2.5 个人中心
个人中心包括: 个人信息、工单反馈、个人工单
##### 2.5.1 个人信息
账号刚注册成功之后, 是需要实名认证以后才能注册店铺

![image](https://user-images.githubusercontent.com/48284901/155944814-510cac57-b1da-4909-ac2c-b66c97c53808.png)
##### 2.5.2 工单反馈
![image](https://user-images.githubusercontent.com/48284901/155944908-f9e1370f-4e00-40ae-90de-0799a54442bb.png)
##### 2.5.3 我的工单
可以与管理员端进行互相的信息反馈

![image](https://user-images.githubusercontent.com/48284901/155944965-9d878669-ec97-4fbc-93c8-9a6ca77acf5c.png)
### 3. 管理员相关的功能
管理员主要有四大功能: 用户管理、店铺管理、订单管理、工单管理
#### 3.1 用户管理
![用户管理](https://user-images.githubusercontent.com/48284901/155985001-ae62e03c-e79e-41cf-b1fd-65032b838e09.gif)
#### 3.2 店铺管理
![image](https://user-images.githubusercontent.com/48284901/155945739-35c6403e-e35f-4b74-ad50-03308bdb24bd.png)
#### 3.3 订单管理
![image](https://user-images.githubusercontent.com/48284901/155945769-f6e274c0-a867-40ba-8ee3-c9a03b6c916b.png)
#### 3.4 工单管理
![工单管理](https://user-images.githubusercontent.com/48284901/155945881-280dbb71-a952-49d7-9792-731a629c70df.gif)


