<template>
  <div class="food-list">
    <div class="food-table" v-if="hasShop">
      <el-table :data="foodList" stripe style="width: 100%">
        <!-- 表格展开显示的内容 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="名称 : ">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="价格 : ">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="折扣 : ">
                <span>{{ props.row.discount }}</span>
              </el-form-item>
              <el-form-item label="打包费 : ">
                <span>{{ props.row.extra }}</span>
              </el-form-item>
              <el-form-item label="商品已售 : ">
                <span>{{ props.row.sold }}</span>
              </el-form-item>
              <el-form-item label="好评数 : ">
                <span>{{ props.row.good_comment }}</span>
              </el-form-item>
              <el-form-item label="差评数 : ">
                <span>{{ props.row.bad_comment }}</span>
              </el-form-item>
              <el-form-item label="描述 : ">
                <span>{{ props.row.desci }}</span>
              </el-form-item>
              <el-form-item label="套餐内容 : ">
                <span>{{ props.row.package_content }}</span>
              </el-form-item>
              <el-form-item label="主料 : ">
                <span>{{ props.row.main_material }}</span>
              </el-form-item>
              <el-form-item label="辅料 : ">
                <span>{{ props.row.secondary_material }}</span>
              </el-form-item>
              <el-form-item label="荤素 : ">
                <span>{{ props.row.meat_vegetable }}</span>
              </el-form-item>
              <el-form-item label="口味 : ">
                <span>{{ props.row.flavor }}</span>
              </el-form-item>
              <el-form-item label="Tips : ">
                <span>{{ props.row.tips }}</span>
              </el-form-item>
              <el-form-item label="食品图片 : ">
                <span>
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="props.row.avatar_url"
                  ></el-image>
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="id" label="id"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="food_classify" label="分类"> </el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="discount" label="折扣"> </el-table-column>
        <el-table-column prop="extra" label="打包费"> </el-table-column>
        <el-table-column prop="least" label="起购份数"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>没有注册店铺, 所以没有食品信息</div>

    <el-dialog
      title="更改食品信息"
      :visible.sync="showDialog"
      width="40%"
      center
    >
      <detail-form :food_id="foodId" />
    </el-dialog>
  </div>
</template>

<script>
import detailForm from "./detailForm.vue";
export default {
  components: { detailForm },
  name: "",
  created() {
    this.getFoodList(); //获取食品数据

    this.$notify({
      title: "提示",
      message: `对于给一个食品添加了多个分类, 却只显示一个, 是因为: 查询食品信息时,
                使用了分组对id进行过滤, 有时间再重新写一下sql 🙄🙄`,
      type: "warning",
    });
  },
  data() {
    return {
      foodList: "",
      hasShop: false,
      showDialog: false,
      foodId: "",
    };
  },
  methods: {
    // 获取食品信息
    getFoodList() {
      this.$api.foodApis.getFoodList().then((res) => {
        if (res.code == 200) {
          this.foodList = res.data;
          this.hasShop = true;
        } else {
          this.$message({
            type: "error",
            message: res.message,
          });
        }
      });
    },
    handleEdit(index, row) {
      this.foodId = row.id;
      this.showDialog = !this.showDialog;
    },
    // 删除食品信息
    handleDelete(index, row) {
      this.$messageBox
        .confirm("此操作将永久删除食品, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.$api.foodApis
            .deleteFood({ data: { food_id: row.id } })
            .then((res) => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: res.message,
                });
                location.reload();
              }
            });
        })
        .catch(() => {
          return;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.food-list {
  user-select: none;
}
.el-button--mini {
  padding: 7px 12px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>