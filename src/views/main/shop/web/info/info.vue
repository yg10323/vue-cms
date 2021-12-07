<template>
  <div class="shop-info">
    <div class="show-info" v-if="shopInfo">
      <el-descriptions class="margin-top" title="我的店铺" :column="1" border>
        <template slot="extra">
          <!-- 抽屉组件 -->
          <drawer-form :usable="shopInfo.usable"></drawer-form>
        </template>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            店铺头像
          </template>
          <el-avatar :size="60">
            <img :src="this.shopInfo.shop_avatar_url" />
          </el-avatar>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            店铺名
          </template>
          {{ shopInfo.name }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-finished"></i>
            店铺资质
          </template>
          <el-button @click="showHealthImg">健康证明</el-button>
          <el-button @click="showBusinessImg">营业资格证</el-button>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-time"></i>
            营业时间
          </template>
          {{ shopInfo.start_time }} - {{ shopInfo.end_time }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-price-tag"></i>
            店铺分类
          </template>
          {{ shopInfo.classify.options }} / {{ shopInfo.classify.child }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-brush"></i>
            青山计划
          </template>
          <el-tag size="small">{{
            shopInfo.mountain_plan == 1 ? "已加入" : "未加入"
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            配送形式
          </template>
          <el-tag size="small">{{ shopInfo.delivery }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            店铺地址
          </template>
          {{ shopInfo.address }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-bangzhu"></i>
            店铺服务
          </template>
          <span v-for="s in transObj.service" :key="s">
            <el-tag type="warning">{{ s }}</el-tag>
          </span>
        </el-descriptions-item>
      </el-descriptions>
      <el-divider content-position="center">活动公告</el-divider>
    </div>

    <div class="cards" v-if="shopInfo">
      <!-- 活动展示 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>活动列表</span>
          <i class="iconfont icon-remenhuodong"></i>

          <el-popover
            placement="top-start"
            title="提示"
            width="200"
            trigger="hover"
            content="重新设置的活动会将原活动全部替换, 如果要清空原活动, 请直接提交"
          >
            <el-button
              slot="reference"
              style="float: right; padding: 3px 0"
              type="text"
              @click="showActivityDialog"
              >重新设置活动</el-button
            >
          </el-popover>
        </div>
        <div
          v-for="(item, index) in transObj.activities"
          :key="index"
          class="text item"
        >
          {{ item.value }}
        </div>
      </el-card>

      <!-- 公告展示 -->
      <el-card class="box-card-notice">
        <div slot="header" class="clearfix">
          <span>店铺公告</span>
          <i class="iconfont icon-gonggao"></i>
        </div>
        <div>
          {{ shopInfo.notice }}
        </div>
      </el-card>
    </div>

    <div class="dialogs">
      <!-- dialog预览图片 -->
      <el-dialog :visible.sync="imgDialogVisible">
        <img width="100%" :src="imgDialogURL" alt="" />
      </el-dialog>
      <!-- dialog修改店铺活动 -->
      <el-dialog :visible.sync="activityDialog">
        <div
          class="dialog-el"
          v-for="(activity, index) in newActivities"
          :label="'活动优惠' + (index + 1)"
          :key="activity.key"
          :prop="'activities.' + index + '.value'"
        >
          <span>{{ "活动" + (index + 1) }}</span>
          <el-input class="input" v-model="activity.value"></el-input>
          <el-button @click.prevent="removeActivity(activity)" type="danger"
            >删除</el-button
          >
        </div>

        <span slot="footer" class="dialog-footer">
          <div class="footer-left">
            <el-button class="addActivity" @click="addActivity" type="primary">
              再加一条
            </el-button>
          </div>
          <div class="footer-right">
            <el-button @click="activityDialog = false">取 消</el-button>
            <el-button type="primary" @click="updateActivities"
              >确 定</el-button
            >
          </div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import drawerForm from "./drawerForm.vue";

export default {
  components: { drawerForm },
  name: "",
  created() {
    this.getShopInfo();
  },
  data() {
    return {
      shopInfo: "",
      imgDialogVisible: false,
      imgDialogURL: "",
      activityDialog: false,
      newActivities: [{ value: "" }],
    };
  },
  computed: {
    transObj() {
      return {
        service: eval(this.shopInfo.service),
        activities: eval(this.shopInfo.activities),
      };
    },
  },
  methods: {
    // 获取店铺信息
    getShopInfo() {
      this.$api.shopApis.getShopInfo().then((res) => {
        this.shopInfo = res.length ? res[0] : "";
      });
    },
    // 显示健康证图片
    showHealthImg() {
      this.imgDialogURL =
        this.shopInfo.health_certificate_url ||
        "http://124.70.20.215:2140/upload/avatar_default.jpg";
      this.imgDialogVisible = true;
    },
    // 显示营业执照图片
    showBusinessImg() {
      this.imgDialogURL =
        this.shopInfo.business_permit_url ||
        "http://124.70.20.215:2140/upload/avatar_default.jpg";
      this.imgDialogVisible = true;
      console.log(this.shopInfo.business_permit_url);
    },
    // 控制新增活动的dialog
    showActivityDialog() {
      if (this.shopInfo.usable !== 1) {
        this.$notify.error({
          title: "异常",
          message: "检测到店铺已被封禁, 请联系管理员进行处理",
        });
        return;
      }
      this.activityDialog = !this.activityDialog;
    },
    // 删除活动
    removeActivity(activity) {
      var index = this.newActivities.indexOf(activity);
      if (index !== -1) {
        this.newActivities.splice(index, 1);
      }
    },
    // 新增活动
    addActivity() {
      this.newActivities.push({
        value: "",
        key: Date.now(),
      });
    },
    // 更新活动
    updateActivities() {
      // 对newActivities深拷贝一份
      let data = this.$utils.deepClone(this.newActivities);
      // 将空value剔除
      data.forEach((item, index) => {
        if (item.value == "") data.splice(index, 1);
      });
      // 如果全部value都为空, push一个空value, 表示清空活动
      if (data.length === 0) {
        data.push({ value: "" });
      }
      // 发送请求
      this.$api.shopApis.updateActivities({ data }).then((res) => {
        if (res.code == 200) {
          this.$notify({
            title: "成功",
            message: res.message,
            type: "success",
          });
          setTimeout(() => location.reload(), 1000);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.el-tag {
  margin-right: 10px;
}

.iconfont {
  margin-left: 3px;
}

.cards {
  display: flex;
  justify-content: space-around;

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card,
  .box-card-notice {
    width: 480px;
  }
  .box-card-notice {
    height: 30%;
  }
}

.dialog-el {
  .el-input {
    width: 68%;
    margin-right: 20px;
    margin: 0 20px 20px 10px;
  }
}

.dialog-footer {
  display: flex;
  justify-content: space-between;
}
</style>