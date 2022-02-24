<template>
  <div class="comment">
    <el-table :data="evaluates" border style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column prop="updateTime" label="日期" width="180">
      </el-table-column>
      <el-table-column prop="rate" label="评分" width="180">
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.rate"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论"
        :show-overflow-tooltip="true"
        width="300"
      >
      </el-table-column>
      <el-table-column
        label="食品信息"
        :show-overflow-tooltip="true"
        width="140"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div v-for="(info, index) in scope.row.food_info" :key="index">
              <p>名称: {{ info.name }}</p>
            </div>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">查看食品信息</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="用户信息"
        :show-overflow-tooltip="true"
        width="140"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div>
              <p>用户名: {{ scope.row.buyer_info.name }}</p>
              <p>电话: {{ scope.row.buyer_info.phone }}</p>
              <p>地址: {{ scope.row.buyer_info.address }}</p>
            </div>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">查看用户信息</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="回复用户" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <!-- 未回复时显示按钮 -->
          <el-button
            v-if="scope.row.evaluate_id === null"
            @click="handleReply(scope.row)"
            >回复</el-button
          >
          <div v-if="scope.row.evaluate_id !== null">{{ scope.row.reply }}</div>
        </template>
      </el-table-column>
    </el-table>

    <div class="replay-form">
      <el-dialog title="回复" :visible.sync="showDialog" width="40%" center>
        <div class="post-content">
          <el-collapse>
            <el-collapse-item title="点我展开用户评价" name="1">
              <div>{{ replayRow.content }}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <add-form
          :addConfig="CommentAddFormConfig"
          @addFormRequest="addFormRequest"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import addForm from "@/components/content/add-form/addForm.vue";

import config from "../../config/shop-config";

export default {
  name: "",
  components: { addForm },
  created() {
    this.getShopInfo();
  },
  data() {
    return {
      shopInfo: "",
      evaluates: [],
      showDialog: false,
      replayRow: "",
      CommentAddFormConfig: config.commentAddFormConfig,
    };
  },
  methods: {
    // 获取店铺信息
    getShopInfo() {
      this.$api.shopApis.getShopInfo().then((res) => {
        this.shopInfo = res.length ? res[0] : "";
        this.getShopEvaluates();
      });
    },
    // 获取店铺评价
    getShopEvaluates() {
      this.$api.shopApis
        .getShopEvaluates({
          data: {
            shop_id: this.shopInfo.id,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            const dealData = this.$utils.dealOrderData(res.data).reverse();
            for (let item of dealData) {
              item.updateTime = this.$utils.formatTime(
                new Date(item.updateTime).getTime()
              );
            }
            this.evaluates = dealData;
            // console.log(this.evaluates);
          }
        });
    },
    // 回复评价
    handleReply(row) {
      this.replayRow = row;
      this.showDialog = !this.showDialog;
    },
    // 提交回复
    addFormRequest(e) {
      const postData = {
        evaluate_id: this.replayRow.id,
        reply: e.content,
      };
      this.$api.userApis.replyEvaluate({ data: postData }).then((res) => {
        if (res.code == 200) {
          setTimeout(() => location.reload(), 1000);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
</style>