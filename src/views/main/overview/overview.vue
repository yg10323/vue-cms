<template>
  <div class="overview">
    <el-descriptions
      class="margin-top"
      title="项目主要技术栈"
      :column="3"
      border
    >
      <el-descriptions-item>
        <template slot="label">
          <i class="iconfont icon-xiangmu"></i>
          项目名
        </template>
        外卖猫后台管理系统
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="iconfont icon-kaifa"></i>
          前端
        </template>
        Vue.js
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="iconfont icon-kaifa"></i>
          后端
        </template>
        Node.js (Koa)
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="iconfont icon-odbc"></i>
          数据库
        </template>
        Mysql、Redis
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="iconfont icon-icon_website_huabanfuben"></i>
          其他
        </template>
        Element-UI、Axios、Socket、uni-app
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="iconfont icon-github1"></i>
          github
        </template>
        <el-link type="primary">https://github.com/yg10323</el-link>
      </el-descriptions-item>
    </el-descriptions>

    <el-divider content-position="center">主要介绍</el-divider>
    <div class="desc-cards-top">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>动态路由</span>
            </div>
            <div>1. 根据登录用户的角色向后端请求不同的菜单数据</div>
            <div>2. 前端拿到菜单数据后跟本地的路由配置进行匹配</div>
            <div>3. 匹配到的路由配置信息添加到main的子路由中</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>axios封装</span>
            </div>
            <div>
              1.
              通过webpack的require.context函数遍历出views目录下的*-apis.js文件
            </div>
            <div>
              2. 对文件名进行转驼峰后,作为key 将文件中默认导出的对象作为value
            </div>
            <div>3. 对value进行遍历,对value中的每个item赋值为axios实例</div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>扫码登录</span>
            </div>
            <div>1. uniapp + socket.io + redis + broadcast-channel</div>
            <div>2. socket.io : 负责二维码发送、扫码状态鉴别等</div>
            <div>3. redis : 负责控制二维码过期时间</div>
            <div>4. broadcast-channel : 在后端进行信息广播</div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-divider content-position="center">次要介绍</el-divider>
    <div class="desc-cards-bottom">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>未做的</span>
            </div>
            <div>1. 前后端性能优化</div>
            <div>2. 数据库性能优化</div>
            <div>3. 网络延迟导致的页面闪烁</div>
            <div>4. 手机端点餐系统</div>
            <div>5. 手机端点餐系统</div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>安全方面</span>
            </div>
            <div>1. 使用jwt做token管理, token非对称加密</div>
            <div>ps. 还是使用session管理登录状态比较好😷</div>
            <div>2. 密码使用md5进行加密</div>
            <div>3. vue全局导航守卫, axios请求拦截</div>
            <div>4. 后端多重中间件验证判断角色、账号状态等信息</div>
          </el-card>
        </el-col>

        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>其他</span>
            </div>
            <div>1.自己封装的一些小工具函数</div>
            <div>2. 项目属于毕业设计</div>
            <div>3. 没有技术, 全是BUG~</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
};
</script>

<style scoped lang="scss">
.el-divider--horizontal {
  margin: 50px 0;
}
</style>