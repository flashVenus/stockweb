<template>
  <el-container class="user-center">
    <el-header class="user-header">
      <home-header></home-header>
    </el-header>
    <div class="usercot message">
      <el-container class="main-wrapper">
        <el-aside width="178px">
          <menu-box></menu-box>
        </el-aside>
        <el-main>
          <div class="con-box account futuresholdposition">
            <el-tabs v-model="activeName" class="aaaa">
              <el-tab-pane label="申购" name="rengou">
                <div class="user-info">
                  <el-table :data="shengou" style="width: 100%">
        
                    <el-table-column prop="names" label="新股名称">
                      <template slot-scope="scope" v-if="scope.row.zt == 1">
                        <span style="color: #fff">{{ scope.row.names }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="code" label="申购代码">
                      <template slot-scope="scope" v-if="scope.row.zt == 1">
                        <span style="color: #fff">{{ scope.row.code }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="price" label="发行价格">
                      <template slot-scope="scope" v-if="scope.row.zt == 1">
                        <span style="color: #fff">{{ scope.row.price }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="zt" width="80px" label="状态">
                      <template slot-scope="scope" v-if="scope.row.zt == 1">
                        <p class="bounceIn">
                          <span v-if="scope.row.zt == 0" class="red"
                            >已关闭</span
                          >
                          <span v-if="scope.row.zt == 1" class="green"
                            >已开启</span
                          >
                        </p>
                      </template>
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      prop="isLock"
                      width="120px"
                      label="操作"
                    >
                      <template slot-scope="scope">
                        <el-button
                          type="success"
                          plain
                          size="small"
                          @click="shengouclik(scope.row)"
                          v-if="scope.row.zt == 1"
                          >申购</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="申购列表" name="rengoulist">
                <div class="user-info">
                  <el-table :data="sgList" style="width: 100%">
                   
                    <el-table-column
                      prop="xgname"
                      label="新股名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="codes"
                      label="申购代码"
                    >
                    </el-table-column>
                    <el-table-column prop="bzj" label="保证金">
                    </el-table-column>
                    <!-- <el-table-column
                      prop="mrsjj"
                      label="申请时间"
                    >
                    <template slot-scope="scope">
                      <span>{{scope.row.mrsj | timeFormat}}</span>
                    </template>
                    </el-table-column> -->
                    <el-table-column
                      prop="nums"
                      label="买入数量"
                    >
                    </el-table-column>
                  
                    <el-table-column prop="status" label="状态">
                      <template slot-scope="scope">
                        <p class="bounceIn">
                          <span v-if="scope.row.zts == 3" class="red"
                            >未审核</span
                          >
                          <span v-if="scope.row.zts == 1" class="green"
                            >已中签</span
                          >
                          <span v-if="scope.row.zts == 2" class="red"
                            >未中签</span
                          >
                        </p>
                      </template>
                    </el-table-column>
                
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <el-dialog
            show-close
            :visible.sync="dialogCommunity"
            width="30%"
          >
            <div class="storeinformation_popup">
              <el-form :model="haoForm" ref="haoForm" class="demo-form">
                <div class="storeinformation_popup_top">
                  <el-form-item>
                    <el-input
                      type="text"
                      v-model="haoForm.shehao"
                      placeholder="请填写申购数量"
                      clearable="true"
                      show-word-limit
                      oninput="value=value.replace(/[^\d]/g,'')"
                    >
                    </el-input>
                  </el-form-item>
                </div>
                <el-form-item style="text-align:center;">
                  <el-button @click="dialogCommunity = false">取 消</el-button>
                  <el-button
                    type="primary"
                    @click="shengData()"
                   style="background-color: #fff !important;color:#333 !important;border-color:#DCDFE6 !important;"
                    >确 定
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-dialog>
        </el-main>
      </el-container>
    </div>
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
      pageSize: 11,
      list: {
        list: [],
      },
      activeName: "rengou",
      shengou: "",
      dialogCommunity:false,
      haoForm:{
        shehao:''
      },
      tijiao:'',
      sgList:''
    };
  },
  computed: {},
  created() {},
  mounted() {
    (this.$store.state.userMenu = "2-14"), this.getlist();
    this.xxxx();
    
  },
  watch: {
    activeName(val, oldval) {
      console.log(val);
      if (val == 'rengoulist') {
        this.shengouList()
      }
    },
  },
  methods: {
    shengouclik(row){
      this.dialogCommunity = true
      this.tijiao = row
      console.log(row)
    },
    async getlist() {
      // 获取持仓列表
      let opt = {
        userId: 0,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      console.log(opt);
      let data = await api.getUserApplyList(opt);
      console.log(data);
      if (data.status === 0) {
        this.list = data.data;
      } else {
        this.$message.error(data.msg);
      }
    },
    async xxxx() {
      // 获取持仓列表
      let opt = {};
      let data = await api.xingusg(opt);
      this.shengou = data.data.list;
      console.log(this.shengou, "申购");
    },
    async shengData() {
      // 获取持仓列表
      var timestamps = (new Date()).getTime();
      let opt = {
        sgname:this.tijiao.names,
        sgdaima:this.tijiao.code,
        sgprice:this.tijiao.price,
        sgsumber:this.haoForm.shehao,
        tmes:timestamps,
      };
      console.log(opt);
      let data = await api.xingusgs(opt);
      this.shengoutijiao = data.data.list;
      console.log(this.shengoutijiao, "申购提交");
      this.dialogCommunity = false
      if(data.status == 200){
        this.$message({
          message: data.msg,
          type: 'success'
        });
      }else{
        this.$message({
          message: data.msg,
          type: 'warning'
        });
      }
    },
    async shengouList(){
      let opt = {};
      let data = await api.xingusgsList(opt);
      this.sgList = data.data.list;
      // this.timestampToTime()
      console.log(this.sgList)
      },
    },
};
</script>
<style lang="less" scoped>
/deep/ .el-input__inner{
  background-color: #fff !important;
  border: 1px solid #DCDFE6 !important;
  color: #333 !important;
}
/deep/ .cell {
  color: #fff !important;
}
/deep/ .aaaa .el-tabs__item {
  color: #d8d8d8 !important;
}
/deep/ .el-tabs__item.is-active {
  color: #409eff !important;
}
/deep/ .black-bg .futuresholdposition .el-table th .cell {
  color: #fff !important;
}
.red {
  color: red !important;
}
.green {
  color: #17b780 !important;
}
.number {
  background-color: rgba(250, 250, 250, 0) !important;
}
.table {
  min-height: 500px;

  .code {
    color: #6d718b;
    font-size: 12px;
  }

  .more-btn {
    text-align: center;
    color: #8f92a3;
  }

  /deep/ th.el-table_1_column_1 {
    padding-left: 50px;
  }
}

.con-box {
  // color: #fff;
  padding: 0 20px;

  .box-account {
    padding: 20px 10px 0;

    .name {
      // font-size: 16px;
    }

    .account {
      // font-size: 46px;
      font-weight: 400;
    }

    .el-col {
      padding: 10px;
    }

    .box {
      padding: 10px;
      padding-left: 50px;
      border-bottom: 1px solid rgba(230, 230, 230, 0.6);

      .title {
        // font-size: 16px;
        color: #333;
        margin-bottom: 10px;
      }
    }

    .box1 {
      border-bottom: none;
    }

    .box-btn {
      padding: 12px;
    }

    .number {
      // font-size: 18px;
    }
  }
}

.user-info {
  padding: 20px 0;

  .el-row {
    margin-bottom: 15px;
    line-height: 30px;
    height: 30px;
  }

  .name {
    width: 96px;
    text-align: right;
    display: inline-block;
    color: #6e6e6e;
  }

  .info {
    font-size: 16px;
  }

  .btn-statue {
    margin-left: 100px;
    margin-bottom: 20px;
  }
}

.progress-box {
  position: relative;
  margin-bottom: 20px;

  .item {
    position: absolute;
    width: 46%;
    height: 30px;
    top: 38%;
    left: 27%;
    background: #fff;
  }

  .progress-title {
    font-size: 16px;
    padding: 0 12px;
    margin-top: 10px;
  }

  /deep/ .el-progress {
    .el-progress-bar__outer {
      background-color: #ff9800;
    }

    .el-progress-bar__inner {
      background-color: #ff5722;
    }

    .el-progress-bar__innerText {
      color: #ff5722;
      font-size: 0;
    }
  }
}

.el-tabs {
  margin-top: 30px;
}

.force-line {
  // margin-top: 30px;
  // background-color: #fdf6ec;
  color: #e6a23c;

  p {
    padding: 8px 16px;
  }

  .number {
    font-size: 18px;
  }
}

.box-btn {
  margin-top: 20px;

  .el-button {
    padding-left: 50px;
    padding-right: 50px;
  }
}

.Assets-box {
  // border: 1px solid #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  margin: 0 !important;

  .box {
    position: relative;

    .iconfont {
      // position: absolute;
      // margin-right: 5px;
      font-size: 30px;
      // top: 17px;

      &.color1 {
        color: #2f97fc;
      }

      &.color2 {
        color: #17b780;
      }

      &.color3 {
        color: #ff7602;
      }

      &.color3 {
        color: #fd4256;
      }

      &.color4 {
        color: #fda822;
      }
    }
  }
}

.account-all {
  margin-top: 20px;

  .title {
    font-size: 16px;
    line-height: 30px;

    span {
      font-size: 12px;
      color: #777;
    }
  }

  .number {
    font-size: 22px;
    margin-top: 4px;
    text-shadow: 1px 2px 2px rgba(24, 24, 24, 0.3);
  }
}
.code {
  font-size: 12px;
  color: #fff;
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
