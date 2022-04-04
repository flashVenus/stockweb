<template>
  <el-container class="user-center">
    <el-header class="user-header">
      <home-header></home-header>
    </el-header>
    <div class="usercot">
      <el-container class="main-wrapper">
        <el-aside width="178px">
          <menu-box></menu-box>
        </el-aside>
        <el-main>
          <div class="header-chi" style="text-align: left;">
            <div class="user-center-title">
              <img src="../../../../assets/image/sanjao.png" alt />
              <span>提现</span>
            </div>
          </div>
          <div class="wrapper">
            <div class="chongzhi-cont" style="display: flex;justify-content: center;">
              <div style="width:100%">
                <el-form>
                  <div style="width:80%" class="left">
                    <div class="chongzhi-img">
                      <img
                        src="../../../../assets/image/chongzhi.png"
                        v-if="color == 'black-bg'"
                        alt
                      />
                      <img
                        src="../../../../assets/image/chongzhi1.png"
                        v-if="color == 'red-bg'"
                        alt
                      />
                    </div>
                    <div class="chongzhi-input">
                      <span>提现金额：</span>
                      <el-input type="text" v-model="form.number" placeholder="请输入提现金额"></el-input>
                      <!-- <el-input v-model="form.amt" type="number" placeholder="最小充值金额为100元"></el-input> -->
                    </div>
                    <el-form
                      label-width="100px"
                      v-model="form"
                      ref="ruleForm"
                      :rules="rule"
                      class="demo-form-inline"
                    >
                      <div class="chongzhi-type">
                        <p class="enable">
                          当前账户可用余额：
                          <span class="qian">￥{{$store.state.userInfo.enableAmt}}</span>
                          <a @click="selectAll" href="javascript:;">全部提现</a>
                        </p>
                      </div>
                    </el-form>

                    <div class="money-cont">
                      <p class="enable">
                        可用：
                        <span class="k">{{$store.state.userInfo.enableAmt}}</span>
                      </p>
                      <p class="enable">
                        冻结：
                        <span class="k">{{$store.state.hide?'****':$store.state.userInfo.allFreezAmt}}</span>
                      </p>
                    </div>
                    <!-- @click="chongzhi" -->
                    <div class="chongzhi-btn-cont" @click="Onsubmit('ruleForm')">
                      <div class="chongzhi-btn">提现</div>
                    </div>
                  </div>
                </el-form>

                <div class="chongzhi-bizhi">
                  <div class="chongzhi-bizhi-cont">
                    <div>入金须知</div>
                    <div class="chongzhi-item">
                      <span class="circle">1</span>
                      <span>点击“点击去充值”,跳转到支付页面;</span>
                    </div>
                    <div class="chongzhi-item">
                      <span class="circle">2</span>
                      <span>打开手机扫描完成支付。</span>
                    </div>
                    <div class="chongzhi-item">
                      <span class="circle">3</span>
                      <span>由于支付收款上限限制，每次收款公户可能不一样，请每次充值前获取最新的二维码完成支付。</span>
                    </div>
                    <div class="chongzhi-item">
                      <span class="circle">4</span>
                      <span>充值默认充值在融资账户中，如需充值指数账户可从融资账户转入至指数账户。</span>
                    </div>
                  </div>
                  <div class="right">
                    <img
                      src="../../../../assets/image/youqingtishi.png"
                      v-if="color == 'black-bg'"
                      alt
                    />
                    <img
                      src="../../../../assets/image/youqingtishi1.png"
                      v-if="color == 'red-bg'"
                      alt
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- <div class="box page-part transaction">
            <div class="box-contain clearfix">
              <div class="user-center-title">
                用户提现
              </div>
              <div class="text-center">
                <i style="color:green;font-size: 1.5rem;" class="iconfont icon-tixian1"></i>
              </div>
              <div class="auth-box">
                <el-form label-width="100px" v-model="form" ref="ruleForm" :rules="rule" class="demo-form-inline">
                  <el-form-item label="提现金额" prop="number">
                    <el-input type='text' v-model="form.number" placeholder="请输入提现金额">
                    </el-input>
                  </el-form-item>
                </el-form>
                <p class="enable">当前账户可用余额 <span>{{$store.state.userInfo.enableAmt}}</span> <a @click="selectAll"
                                                                                               href="javascript:;">全部提现</a>
                </p>
                <div slot="footer" class="dialog-footer">
                  <el-button type="success" :loading="isloading" @click="Onsubmit('ruleForm')">提现</el-button>
                </div>
              </div>
            </div>
            <div class="rule-box">
              <div class="attention" style="margin-bottom:10px;">
                <p>注意: 提现默认提取融资账户中的可用资金,如需提取指数账户中的金额请先转入至融资账户再提取 。</p>
              </div>
              <div class="title">提示：</div>
              <div class="attention">
                <p>1、当前有持仓订单不能出金 。</p>
                <p>2、出金请先在官网通过实名认证和绑定银行卡 。</p>
                <p>3、出金时间工作日 {{settingInfo.withTimeBegin}} : 00 到 {{settingInfo.withTimeEnd}} : 00 之间。</p>
                <p>4、每笔出金扣除 {{settingInfo.withFeeSingle}} 元手续费<span v-if="settingInfo.withFeePercent != 0">，加上出金金额 * {{settingInfo.withFeePercent}}</span>。
                </p>
                <p>5、每笔提现金额最小 {{settingInfo.withMinAmt}} 元。</p>
                <p>6、<span class="red">出金时段内出金一般2小时到账，出金时间收银行间清算时间影响，各家银行到账时间不同，最迟T+1次日24点前到账</span></p>
              </div>
            </div>
            </div>-->
          </div>
          <!-- <home-footer :siteInfo="siteInfo"></home-footer> -->
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
import { mapState } from "vuex";

export default {
  components: {
    HomeHeader,
    HomeFooter,
    MenuBox,
  },
  props: {},
  data() {
    // let validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入银行卡号'))
    //   } else {
    //     let myreg = /^([1-9]{1})(\d{14,18})$/ // 卡号校验
    //     if (!myreg.test(value)) {
    //       callback(new Error('请输入正确的银行卡号'))
    //     }
    //     callback()
    //   }
    // }
    return {
      hasAuth: false,
      isloading: false,
      form: {
        number: "",
      },
      rule: {
        number: [
          { required: true, message: "请输入提现金额", trigger: "blur" },
        ],
      },
      settingInfo: {
        withTimeBegin: "",
        withTimeEnd: "",
        withFeeSingle: "",
        withFeePercent: "",
        withMinAmt: "",
      },
    };
  },
  watch: {},
  computed: {
    ...mapState({
      color: (state) => state.systemColor,
    }),
  },
  created() {
    this.getSettingInfo();
    if (!this.$store.state.bankInfo.bankInfo) {
      this.getCardDetail();
    }
    if (!this.$store.state.userInfo.idCard) {
      this.getUserInfo();
    }
  },
  mounted() {
    this.$store.state.userMenu = "2-7";
  },
  methods: {
    selectAll() {
      this.form.number = this.$store.state.userInfo.enableAmt;
    },
    async getCardDetail() {
      // 获取银行卡信息
      let data = await api.getBankCard();
      if (data.status === 0) {
        this.$store.state.bankInfo = data.data;
      } else {
        this.$message.error("您还未绑定银行卡，请先绑定银行卡");
        this.$router.push("/bank");
        // this.$message.error(data.msg)
      }
    },
    async getUserInfo() {
      // 获取用户信息
      let data = await api.getUserInfo();
      if (data.status === 0) {
        // 判断是否登录
        this.$store.state.userInfo = data.data;
      } else {
      }
    },
    async getSettingInfo() {
      // 网站设置信息
      let data = await api.getSetting();
      if (data.status === 0) {
        // 成功
        this.settingInfo = data.data;
      } else {
        this.$message.error(data.msg);
      }
    },
    async Onsubmit(formName) {
      // 提交
      //   this.$refs[formName].validate(async(valid) => {
      //     if (valid) {
      if (!this.$store.state.userInfo.idCard) {
        this.$message.error("请先实名认证");
        this.$router.push("/auth");
      } else if (!this.$store.state.bankInfo.bankNo) {
        this.$message.error("请先绑定银行卡");
        this.$router.push("/bank");
      } else {
        if (!this.form.number) {
          this.$message.error("请输入提现金额");
          this.$router.push("/bank");
          return;
        }
        let opts = {
          amt: this.form.number,
        };
        this.isloading = true;
        let data = await api.outMoney(opts);
        if (data.status === 0) {
          // 成功
          this.$message.success("申请成功，请等待审核!");
          this.$router.push("/withdrawlist");
        } else {
          this.$message.error(
            data.msg ? data.msg : "提现失败,请重新提现或者联系客服"
          );
        }
        this.isloading = false;
      }
      //     } else {
      //         return false;
      //     }
      // })
    },
  },
};
</script>
<style lang="less" scoped>
.user-center-title {
  text-align: left;
}
.wrapper .demo-form-inline[data-v-f8f69ec6] {
  margin: 0;
}
.red-bg {
  .chongzhi-cont {
    position: relative;
    .money-cont {
      display: flex;
    }
    .money-cont > p {
      margin-top: 10px;
      margin-right: 10px;
    }
    .money-cont > p .k {
      color: #c11815;
    }
    .qian {
      font-size: 20px;
      font-family: MyriadSetPro;
      color: #c11815;
      font-weight: bold;
    }
    .left {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .xianshi-cont {
      display: flex;
      justify-content: space-between;
    }
    .chongzhi-bizhi {
      margin-top: 430px;
      background-color: rgb(229, 229, 229);
      display: flex;
      padding: 40px;
      justify-content: space-between;
      .chongzhi-bizhi-cont .chongzhi-item {
        margin: 15px 0;
        color: rgb(121, 121, 121);
        .circle {
          display: inline-block;
          width: 15px;
          text-align: center;
          height: 15px;
          border: 1px solid rgb(121, 121, 121);
          border-radius: 50%;
          line-height: 15px;
        }
      }
    }
    .chongzhi-img {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chongzhi-type {
      display: flex;
      margin-top: 20px;
      margin-bottom: 20px;
      .chongzhi-type-item {
        margin-right: 20px;
      }
    }
    .chongzhi-type > span {
      display: inline-block;
      width: 85px;
    }
    .chongzhi-btn-cont {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      .chongzhi-btn {
		cursor: pointer;
        width: 80%;
        border-radius: 50px;
        text-align: center;
        height: 40px;
        background-color: #c11815;
        color: #fff;
        line-height: 40px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        margin-top: 20px;
      }
    }

    .chongzhi-input {
      margin-top: 20px;
      display: flex;
      align-items: center;
      width: 90%;
      background: none;
    }
    .chongzhi-input > span {
      display: inline-block;
      width: 100px;
    }
  }
}
.black-bg {
  .chongzhi-cont {
    position: relative;
    .money-cont > p .k {
      color: #86cbd2;
    }
    .qian {
      font-size: 20px;
      font-family: MyriadSetPro;
      color: #009c46;
      font-weight: bold;
    }
    .money-cont {
      display: flex;
    }
    .money-cont > p {
      margin-top: 10px;
      margin-right: 10px;
    }
    .left {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .xianshi-cont {
      display: flex;
      justify-content: space-between;
    }
    .chongzhi-bizhi {
      margin-top: 430px;
      background-color: #191e2b;
      display: flex;
      padding: 40px;
      justify-content: space-between;
      .chongzhi-bizhi-cont .chongzhi-item {
        margin: 15px 0;
        color: #7e8086;
        .circle {
          display: inline-block;
          width: 15px;
          text-align: center;
          height: 15px;
          border: 1px solid rgb(121, 121, 121);
          border-radius: 50%;
          line-height: 15px;
        }
      }
    }
    .chongzhi-img {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chongzhi-type {
      display: flex;
      margin-top: 20px;
      margin-bottom: 20px;
      .chongzhi-type-item {
        margin-right: 20px;
      }
    }
    .chongzhi-type > span {
      display: inline-block;
      width: 85px;
    }
    .chongzhi-btn-cont {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      .chongzhi-btn {
		  cursor: pointer;
        width: 80%;
        border-radius: 50px;
        text-align: center;
        height: 40px;
        background-color: #c11815;
        color: #fff;
        line-height: 40px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        margin-top: 20px;
      }
    }

    .chongzhi-input {
      margin-top: 20px;
      display: flex;
      align-items: center;
      width: 90%;
      background: none;
    }
    .chongzhi-input > span {
      display: inline-block;
      width: 100px;
    }
  }
}

.code {
  font-size: 12px;
  color: #999;
}

.auth-box {
  margin-top: 20px;

  .el-row {
    margin-bottom: 10px;
  }

  .enable {
    margin-bottom: 20px;
    margin-left: -50px;
    color: #666;
    text-align: center;

    span {
      font-weight: 600;
      font-size: 16px;
    }

    a {
      margin-left: 20px;
    }
  }
}

.authed-box {
  .el-row {
    padding-top: 40px;
    width: 400px;
    margin: 0 auto;
  }
}

.wrapper {
  padding: 40px 100px;

  .demo-form-inline {
    margin: 20px auto;
  }

  .auth-box {
    .dialog-footer {
      width: 400px;
      margin: 0 auto;

      .el-button {
        margin-left: 100px;
        width: 300px;
      }
    }
  }

  .prompt-box {
    padding-bottom: 20px;
    color: #f44336;

    p {
      line-height: 24px;
    }
  }

  .rule-box {
    margin-top: 30px;
    line-height: 26px;
    margin-left: 70px;
  }
}
</style>
