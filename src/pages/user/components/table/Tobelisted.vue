<template>
  <el-container class="user-center">
    <el-header class="user-header">
      <home-header></home-header>
    </el-header>
    <div class="usercot holdposition">
      <el-container class="main-wrapper">
        <el-aside width="178px">
          <menu-box></menu-box>
        </el-aside>
        <el-main>
          <div class="wrapper user-center-table">
            <div class="user-center-title" style="text-align: left">
              <span
                class="iconfont icon-you"
                style="color: #c11815; font-size: 18px; margin-right: 10px"
              ></span>
              新股待上市
            </div>
            <!-- <div class="table-search">
              <el-row type="flex" justify="end">
                <el-col :span="8">
                  <el-input
                    size="small"
                    v-model="stockCode"
                    placeholder="请输入代码"
                  >
                    <el-button
                      @click="getlist"
                      slot="append"
                      icon="el-icon-search"
                    ></el-button>
                  </el-input>
                </el-col>
                <el-col :span="8">
                  <el-input
                    size="small"
                    v-model="stockSpell"
                    placeholder="请输入简拼"
                  >
                    <el-button
                      @click="getlist"
                      slot="append"
                      icon="el-icon-search"
                    ></el-button>
                  </el-input>
                </el-col>
              </el-row>
            </div> -->
            <el-table
              :data="list.list"
              show-summary
              :summary-method="getSummaries"
              style="width: 100%"
            >
              <el-table-column
                width="126px"
                prop="stockName"
                label="新股名称/代码"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.stockName }}</span>
                  <p>
                    <i
                      v-if="scope.row.stockPlate === '科创'"
                      class="iconfont kechuang-stock"
                      >科创</i
                    >
                    <span class="code">{{ scope.row.newlistCode }}</span>
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="now_price" label="现价">
                <template slot-scope="scope">
                  <span
                    :class="'green'"
                    >{{ scope.row.buyOrderPrice }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column prop="buyOrderPrice" label="买入价">
                <template slot-scope="scope">
                  <span>{{ scope.row.buyOrderPrice }}</span>
                </template>
              </el-table-column>
              
              <!-- <el-table-column prop="allProfitAndLose" label="总盈亏">
                <template slot-scope="scope">
                  <span
                    :class="scope.row.allProfitAndLose > 0 ? 'red' : 'green'"
                    >{{ scope.row.allProfitAndLose }}</span
                  >
                </template>
              </el-table-column> -->
              <!-- <el-table-column prop="orderDirection" label="方向">
                <template slot-scope="scope">
                  <span
                    :class="
                      scope.row.orderDirection === '买涨' ? 'red' : 'green'
                    "
                  >
                    {{ scope.row.orderDirection }}
                    <i
                      v-if="scope.row.orderDirection === '买涨'"
                      class="iconfont icon-up"
                    ></i>
                    <i
                      v-if="scope.row.orderDirection === '买跌'"
                      class="iconfont icon-down"
                    ></i>
                  </span>
                </template>
              </el-table-column> -->
              <el-table-column prop="orderNum" label="数量"> </el-table-column>
              <el-table-column prop="orderTotalPrice" label="总市值">
              </el-table-column>
              <el-table-column prop="profitAndLose" label="时间" width="180">
                <template slot-scope="scope">
                  <span
                    >{{ scope.row.buyOrderTime | timeFormat }}</span
                  >
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="orderFee"
                label="手续费">
            </el-table-column>
            <el-table-column
                prop="orderSpread"
                label="印花税">
            </el-table-column>
            <el-table-column
                prop="orderStayFee"
                label="留仓费">
            </el-table-column>
            <el-table-column
                prop="orderStayDays"
                label="留仓天数">
            </el-table-column>
            <el-table-column
                width="165px"
                prop="buyOrderTime"
                label="时间">
                <template slot-scope="scope">
                    <b v-if="scope.row.buyOrderTime">{{scope.row.buyOrderTime | timeFormat}}</b>
                    <b v-else></b>
                </template>
            </el-table-column> -->
              <el-table-column
                fixed="right"
                prop="isLock"
                width="100px"
                label="操作"
              >
                <template slot-scope="scope" >
                  <!-- <el-button type="primary" plain size="small" @click="toDetail(scope.row)">查看详情</el-button> -->
                  <el-button
                    type="success"
                    style="cursor: pointer; z-index: 9999999"
                    plain
                    size="small"
                    >待上市</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              class="pull-right"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="list.pageNum"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="list.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="list.total"
            >
            </el-pagination>
          </div>
          <!-- <home-footer :siteInfo="siteInfo"></home-footer> -->
        </el-main>
      </el-container>
    </div>
    <el-dialog :title="'卖出数量:' + sellitem.orderNum" :visible.sync="pldialogVisible" width="30%">
      <div>
        <el-form>
          <!-- <el-form-item label="卖出总数" style="color:#000">
            <span>{{sellitem.orderNum}}</span>
          </el-form-item> -->
          <el-form-item label="数量">
            <el-input v-model.number="sellNum" οninput="value=value.replace(/[^0-9]/g,'')" placeholder="请填写卖出数量"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pldialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSell">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import HomeHeader from "../../../../components/HeaderOrder";
import HomeFooter from "../../../../components/Footer";
import MenuBox from "../menu";
import * as api from "../../../../axios/api";

export default {
  components: {
    HomeHeader,
    HomeFooter,
    MenuBox,
  },
  props: {},
  data() {
    return {
      pageNum: 1,
      pageSize: 15,
      stockCode: "", // 代码
      stockSpell: "", // 简拼
      list: {
        list: [],
      },
      sellNum: "",
      pldialogVisible: false,
      sellitem: "",
    };
  },
  watch: {},
  computed: {},
  created() {
    // this.timer = setInterval(this.refreshList, 5000);
  },
  beforeDestroy() {
    // clearInterval(this.timer);
  },
  mounted() {
    this.getlist();
    this.$store.state.userMenu = "2-16";
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
      this.getlist();
    },
    handleCurrentChange(page) {
      this.pageNum = page;
      this.getlist();
    },
    async getlist() {
      // 获取持仓列表
      let opt = {
        state: 0,
        stockCode: this.stockCode, // 代码
        stockSpell: this.stockSpell, // 简拼
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderStatus:0,
      };
      let data = await api.getOrderList(opt);
      if (data.status === 0) {
        // data.data.list.forEach(element => {
        //     this.list.push(element)
        // });
        this.list = data.data;
        // this.total = data.data.total
      } else {
        this.$message.error(data.msg);
      }
    },
    async refreshList() {
      if (this.refresh || this.loading) {
        return;
      }
      this.refresh = true;
      this.changeTextClass = {};
      // 获取表格数据
      let opts = {
        state: 0,
        stockCode: this.stockCode, // 代码
        stockSpell: this.stockSpell, // 简拼
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        orderStatus:0,
      };
      let data = await api.getOrderList(opts);
      this.refresh = false;
      if (data.status === 0) {
        data.data.list.forEach((element, i) => {
          this.changeTextClass[i] = "";
          if (data.data.list[i].now_price !== this.list.list[i].now_price) {
            this.changeTextClass[i] = true; // 设置对应的动画过滤
            this.list.list[i].now_price = data.data.list[i].now_price;
            this.list.list[i].profitAndLose = data.data.list[i].profitAndLose;
            this.list.list[i].allProfitAndLose =
              data.data.list[i].allProfitAndLose;
          }
        });
      } else {
        if (data.success === false) {
        } else {
          this.$message.error(data.msg);
        }
      }
    },
    async toSell() {
      console.log(this.sellitem);
      if (this.sellNum > this.sellitem.orderNum) {
        this.$message({
          type: "error",
          message: "卖出数量不可大于总量",
        });
        return false
      }
      if (this.sellNum % 100 != 0) {
         this.$message({
          type: "error",
          message: "请输入100的整倍数",
        });
        return false
      }
      let opt = {
        positionSn: this.sellitem.positionSn,
        sellNum: this.sellNum,
      };
      let data = await api.sell(opt);
      if (data.status === 0) {
        this.getlist();
        this.$message.success(data.msg);
      } else {
        this.$message.error(data.msg);
      }
      this.sellNum = ''
      this.pldialogVisible = false
      // this.$confirm('您确定要卖出吗?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   let opt = {
      //     positionSn: val.positionSn,
      //     sellNum:'',
      //   }
      //   let data = await api.sell(opt)
      //   if (data.status === 0) {
      //     this.getlist()
      //     this.$message.success(data.msg)
      //   } else {
      //     this.$message.error(data.msg)
      //   }
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消卖出'
      //   })
      // })
    },
    getSummaries(param) {
      // 底部计算
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        // 第一行 不统计
        if (index === 0) {
          sums[index] = "统计";
          return;
        }
        if (
          column.property === "orderNum" ||
          column.property === "profitAndLose" ||
          column.property === "allProfitAndLose" ||
          column.property === "orderFee" ||
          column.property === "orderSpread" ||
          column.property === "orderStayFee"
        ) {
          // 需要计算列 ==> 数量 浮动盈亏 总盈亏 总市值 手续费 印花税 留仓费
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index].toFixed(2);
          } else {
            sums[index] = "N/A";
          }
        }
      });
      return sums;
    },
  },
};
</script>
<style lang="less" scoped>
.code {
  font-size: 12px;
  color: #999;
}

.main-wrapper {
  .wrapper {
    padding: 20px;

    .table-search {
      margin-bottom: 15px;
    }
  }
}
</style>
