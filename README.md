# vue-front-cms
外卖点餐的后台管理系统, 对应的后台接口以及uni-app写的点餐系统都在仓库中, 自行查看

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
