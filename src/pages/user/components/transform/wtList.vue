<template>
  <el-container class="user-center sellorder">
    <el-header class="user-header">
      <home-header></home-header>
    </el-header>
    <div class="usercot">
      <el-container class="main-wrapper">
      <el-aside width="178px">
        <menu-box></menu-box>
      </el-aside>
      <el-main>
        <div class="wrapper">
          <div class="user-center-title" style="text-align:left;">
            <span class="iconfont icon-you" style="color:#C11815;font-size:18px;margin-right:10px"></span>
            融资持仓
          </div>
          <div class="table-search">
            <el-row type="flex" justify='end'>
              <el-col :span="8">
                <el-input size="small" v-model="stockCode" placeholder="请输入代码">
                  <el-button @click="getlist" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
              <el-col :span="8">
                <el-input size="small" v-model="stockSpell" placeholder="请输入简拼">
                  <el-button @click="getlist" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <el-table
            :data="list.list"
            style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="手续费">
                    <span>{{ scope.row.orderFee}}</span>
                  </el-form-item>
                  <el-form-item label="印花税">
                    <span>{{ scope.row.orderSpread}}</span>
                  </el-form-item>
                  <el-form-item label="留仓费">
                    <span>{{ scope.row.orderStayFee}}</span>
                  </el-form-item>
                  <el-form-item label="留仓天数">
                    <span>{{ scope.row.orderStayDays}}</span>
                  </el-form-item>
                  <el-form-item v-if="scope.row.isLock === 1" label="锁定原因">
                    <span>{{ scope.row.lockMsg}}</span>
                  </el-form-item>
                  <el-form-item label="买入时间">
                    <span>{{scope.row.buyOrderTime | timeFormat}}</span>
                  </el-form-item>
                  <el-form-item label="卖出时间">
                    <span>{{scope.row.sellOrderTime | timeFormat}}</span>
                  </el-form-item>
                  <el-form-item label="点差费">
                    <span>{{ scope.row.spreadRatePrice}}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="stockName"
              width="126px"
              label="股票名称/代码">
              <template slot-scope="scope">
                <span>{{scope.row.stockName}}</span>
                <p>
                  <i v-if="scope.row.stockPlate === '科创'" class="iconfont kechuang-stock">科创</i>
                  <span class="code">{{scope.row.stockCode}}</span>
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="buyOrderPrice"
              label="买入价">
              <template slot-scope="scope">
                <span>{{scope.row.buyOrderPrice}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="sellOrderPrice"
              label="卖价">
            </el-table-column> -->
            <el-table-column
              prop="profitAndLose"
              label="浮动盈亏">
              <template slot-scope="scope">
                <span :class="scope.row.profitAndLose > 0 ? 'red':'green'">{{scope.row.profitAndLose}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="allProfitAndLose"
              label="总盈亏">
              <template slot-scope="scope">
                <span :class="scope.row.allProfitAndLose > 0 ? 'red':'green'">{{scope.row.allProfitAndLose}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderDirection"
              label="方向">
              <template slot-scope="scope">
                        <span :class="scope.row.orderDirection === '买涨' ? 'red':'green'">
                            {{scope.row.orderDirection}}
                            <i v-if="scope.row.orderDirection === '买涨'" class="iconfont icon-up"></i>
                            <i v-if="scope.row.orderDirection === '买跌'" class="iconfont icon-down"></i>
                        </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderNum"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="orderTotalPrice"
              label="总市值">
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
              label="撤单">
              <template slot-scope="scope">
                <!-- <el-button type="primary" plain size="small" @click="toDetail(scope.row)">查看详情</el-button> -->
                <el-button v-if="scope.row.orderStatus == 0" type="success" style="cursor: pointer;z-index: 9999999;" plain size="small" @click="toSell(scope.row)">撤单</el-button>
                <div v-else-if="scope.row.orderStatus == 1">
                  已买入
                </div>
                <div v-else>
                  已撤单
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pull-right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="list.pageNum"
            :page-sizes="[10, 20, 30, 40,50]"
            :page-size="list.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="list.total">
          </el-pagination>
        </div>
        <!-- <home-footer :siteInfo="siteInfo"></home-footer> -->
      </el-main>
    </el-container>
    </div>
  </el-container>

</template>

<script>
  import HomeHeader from '@/components/HeaderOrder'
  import HomeFooter from '@/components/Footer'
  import MenuBox from '../menu'
  import * as api from '@/axios/api'

  export default {
    components: {
      HomeHeader,
      HomeFooter,
      MenuBox
    },
    props: {},
    data () {
      return {
        stockCode: '',
        stockSpell: '',
        pageNum: 1,
        pageSize: 15,
        list: {
          list: []
        }
      }
    },
    watch: {},
    computed: {},
    created () {},
    mounted () {
      this.getlist()
      this.$store.state.userMenu = '2-15'
    },
    methods: {
      handleSizeChange (size) {
        this.pageSize = size
        this.getlist()
      },
      handleCurrentChange (page) {
        this.pageNum = page
        this.getlist()
      },
      async getlist () {
        // 获取资金明细
        let opt = {
          state: 1,
          stockCode: this.stockCode, // 代码
          stockSpell: this.stockSpell, // 简拼
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        let data = await api.getOrderListWt(opt)
        if (data.status === 0) {
          // data.data.list.forEach(element => {
          //     this.list.push(element)
          // });
          this.list = data.data
          // this.total = data.data.total
        } else {
          this.$message.error(data.msg)
        }
      },
      toSell (val) {
        this.$confirm('您确定要平仓吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let opt = {
            id: val.id
          }
          let data = await api.sellWt(opt)
          if (data.status === 0) {
            this.getlist()
            this.$message.success(data.msg)
          } else {
            this.$message.error(data.msg)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消平仓'
          })
        })
      },
    }
  }
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
