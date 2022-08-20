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
          <div data-v-5d396ccb class="user-center-title" style="text-align: left;margin: 15px 10px 10px 10px;">
            <span data-v-5d396ccb class="iconfont icon-you"
              style="color: rgb(193, 24, 21); font-size: 18px; margin-right: 10px;"></span>
            银行卡信息
          </div>
          <div class="yhk-cont yanzeng-cont" style="display:none">
            <div class="yhk-list" style="display: flex; justify-content: center;">
              <div style="margin-right: 10px;">
                <!-- <img src="../../../../assets/image/thingsOk.png" alt /> -->
                <img style="width: 50px;" src="../../../../assets/image/zho.png" alt />
              </div>
              <div>
                <div style="margin-bottom: 15px;">
                  <span>银行名称：{{ $store.state.bankInfo.bankName }}</span>
                  <span class="tongguo" v-if="$store.state.userInfo.isActive === 2">
                    <span class="iconfont icon-duihao"></span>
                    审核通过
                  </span>
                  <span class="renzheng" v-else>
                    <span class="iconfont icon-quan-cuo"></span>
                    未认证
                  </span>
                </div>
                <div style="margin-bottom: 15px;">支行名称：{{ $store.state.bankInfo.bankAddress }}</div>
                <div>银行卡号：{{ $store.state.bankInfo.bankNo }}</div>
              </div>
            </div>
          </div>
          <div class="wrapper">
            <div class="box page-part transaction">
              <div class="box-contain clearfix" v-if="cardInfo.length > 0 && isshow == false">
                <div class="text-center" style="margin-bottom:20px;">
                  <i style="color:red;font-size: 1.5rem;" class="iconfont icon-tongguo1"></i>
                </div>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>银行卡信息</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="isshow = true">修改</el-button>
                  </div>
                  <div class="text item">
                    <el-row>
                      <el-col>
                        <span class="name">银行名称：</span>
                        <span class="info">{{ $store.state.bankInfo.bankName }}</span>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <span class="name">支行地址：</span>
                        <span class="info">{{ $store.state.bankInfo.bankAddress }}</span>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <span class="name">银行卡号：</span>
                        <span class="info">{{ $store.state.bankInfo.bankNo }}</span>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
              <div class="box-contain clearfix" v-if="cardInfo.length <= 0 || isshow == true">
                <div class="auth-box">
                  <el-form :hide-required-asterisk='true' :model="form" label-width="100px" ref="ruleForm" :rules="rule"
                    class="demo-form-inline">
                    <el-form-item label="銀行名稱" prop="bankName">
                      <el-input type='text' class="chongzhi-input" v-model="form.bankName" placeholder="請輸入銀行名稱">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="支行地址" prop="bankAddress">
                      <el-input type='text' class="chongzhi-input" v-model="form.bankAddress" placeholder="請輸入支行地址">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="銀行卡號" prop="bankNo">
                      <el-input type='text' class="chongzhi-input" v-model="form.bankNo" placeholder="請輸入銀行卡號">
                      </el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="isshow = false"  v-if="cardInfo.length > 0">返回</el-button>
                    <el-button type="primary" :loading="isloading" @click="submit('ruleForm')" v-if="cardInfo.length > 0">修改</el-button>
                    <el-button type="primary" :loading="isloading" @click="submit('ruleForm')" v-else>認證</el-button>
                  </div>
                </div>

              </div>

            </div>

          </div>



          <div class="chongzhi-bizhi">
            <div class="chongzhi-bizhi-cont">
              <div class="youyi">友誼提示：</div>
              <div class="chongzhi-item">
                <span class="circle">1</span>
                <span>新用户注册后必须通过实名认证激活账户</span>
              </div>
              <div class="chongzhi-item">
                <span class="circle">2</span>
                <span>用户只能添加—张本人银行卡。</span>
              </div>
              <div class="chongzhi-item">
                <span class="circle">3</span>
                <span>真实姓名必须和本人银行卡名一致。</span>
              </div>
            </div>
            <div class="right"></div>
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

export default {
  components: {
    HomeHeader,
    HomeFooter,
    MenuBox,
  },
  props: {},
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("請輸入銀行卡號"));
      } else {
        let myreg = /^([1-9]{1})(\d{14,18})$/; // 卡号校验
        if (!myreg.test(value)) {
          callback(new Error("請輸入正確的銀行卡號"));
        }
        callback();
      }
    };
    return {
      hasAuth: false,
      isloading: false,
      form: {
        bankName: "",
        bankAddress: "",
        bankNo: "",
      },
      rule: {
        bankName: [
          { required: true, message: "請輸入銀行名稱", trigger: "blur" },
        ],
        bankNo: [
          {
            required: true,
            // validator: validatePass,
            message: "請輸入銀行卡號",
            trigger: "blur",
          },
        ],
        bankAddress: [
          { required: true, message: "請輸入支行地址", trigger: "blur" },
        ],
      },
      cardInfo: [],
      isshow: false,
    };
  },
  watch: {
    '$store.state.userMenu': {
      deep: true,
      handler(newvalue, oldvalue) {
        this.getCardDetail();
      }
    }
  },
  computed: {},
  created() {
    // if (this.$store.state.bankInfo.bankNo) {
    //   this.form.bankName = this.$store.state.bankInfo.bankName;
    //   this.form.bankNo = this.$store.state.bankInfo.bankNo;
    //   this.form.bankAddress = this.$store.state.bankInfo.bankAddress;
    //   this.hasAuth = true;
    // } else {
    //   this.getCardDetail();
    // }
  },
  mounted() {
    this.$store.state.userMenu = "2-10";
  },
  methods: {
    async getCardDetail() {
      this.cardInfo = []
      // 获取银行卡信息
      let data = await api.getBankCard();
      if (data.status == 0) {
        this.cardInfo.push(data.data)
        this.$store.state.bankInfo = data.data;
        this.form.bankName = this.$store.state.bankInfo.bankName;
        this.form.bankNo = this.$store.state.bankInfo.bankNo;
        this.form.bankAddress = this.$store.state.bankInfo.bankAddress;
        this.hasAuth = true;
      } else {
        // this.$message.error(data.msg)
      }
    },
    submit(formName) {
      // 提交
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let opts = {
            bankName: this.form.bankName,
            bankNo: this.form.bankNo,
            bankAddress: this.form.bankAddress,
          };
          this.isloading = true;
          if (this.isshow == true) {
            let data = await api.updateBankCard(opts);
            if (data.status === 0) {
              this.$message.success("修改成功!");
              this.isloading = false;
              this.getCardDetail();
              this.isshow = false
            } else {
              this.$message.error(data.msg);
            }
          } else {
            let data = await api.addBankCard(opts);
            if (data.status === 0) {
              this.$message.success("添加成功!");
              this.hasAuth = true;
              this.getCardDetail();
              this.isloading = false;
            } else {
              this.$message.error(data.msg);
            }
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
/deep/ .el-card{
  color: #fff;
}
.red-bg {
  .yhk-cont {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .yhk-list {
      padding: 30px;
      width: 100%;
      margin: 0 60px;
      border-bottom: 1px solid #ccc;
    }
  }

  .yanzeng-cont {

    display: flex;

    .tongguo,
    .renzheng {
      border-radius: 3px;
      padding: 2px 5px;
      display: inline-block;
      background-color: rgb(4, 130, 62);
      margin: 0 5px;
      color: #fff;
    }

    .renzheng {
      background-color: rgb(230, 0, 62);
    }

    .yanzeng-left {
      height: 60px;
      width: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .yanzeng-right {
      margin-left: 10px;
    }

    .yanzeng-right>div {
      margin-bottom: 20px;
      // margin-left: 10px;
    }

    .zfz {
      display: flex;

      .fan {
        margin-left: 30px;
      }
    }
  }

  .youyi {
    color: #fff;
  }

  .chongzhi-bizhi {
    .right {
      width: 106px;
      height: 134px;

      background: url("../../../../assets/image/youqingtishi1.png") no-repeat;
    }

    margin-top: 50px;

    background-color: #e5e5e5;
    display: flex;
    padding: 40px;
    justify-content: space-between;

    .chongzhi-bizhi-cont .chongzhi-item {
      margin: 15px 0;
      color: #fff;

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

  .chongzhi-cont {
    position: relative;

    .left {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .xianshi-cont {
      display: flex;
      justify-content: space-between;
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

    .chongzhi-type>span {
      display: inline-block;
      width: 85px;
    }

    .chongzhi-btn-cont {
      display: flex;
      justify-content: center;
      margin-top: 10px;

      .chongzhi-btn {
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
      display: flex;
      align-items: center;
      width: 90%;
      background: none;
    }

    .chongzhi-input>span {
      display: inline-block;
      width: 100px;
    }
  }
}

.black-bg {
  .yhk-cont {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .yhk-list {
      padding: 30px;
      width: 100%;
      margin: 0 60px;
      border-bottom: 1px solid #383838;
    }
  }

  .el-button--primary {
    border: none;
    background-color: rgb(2, 77, 161) !important;
  }

  .yanzeng-cont {
    display: flex;

    .tongguo,
    .renzheng {
      padding: 2px 5px;
      display: inline-block;
      background-color: rgb(4, 130, 62);
      border-radius: 2px;
      margin: 0 5px;
    }

    .renzheng {
      background-color: rgb(230, 0, 62);
    }

    .yanzeng-left {
      height: 60px;
      width: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .yanzeng-right {
      margin-left: 10px;
    }

    .yanzeng-right>div {
      margin-bottom: 20px;
      // margin-left: 10px;
    }

    .zfz {
      display: flex;

      .fan {
        margin-left: 30px;
      }
    }
  }

  .youyi {
    color: #fff;
  }

  .chongzhi-bizhi {
    .right {
      width: 106px;
      height: 134px;

      background: url("../../../../assets/image/youqingtishi.png") no-repeat;
    }

    margin-top: 50px;

    background-color: #191e2b;
    display: flex;
    padding: 40px;
    justify-content: space-between;

    .chongzhi-bizhi-cont .chongzhi-item {
      margin: 15px 0;
      color: #fff;

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

  .chongzhi-cont {
    position: relative;

    .left {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }

    .xianshi-cont {
      display: flex;
      justify-content: space-between;
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

    .chongzhi-type>span {
      display: inline-block;
      width: 85px;
    }

    .chongzhi-btn-cont {
      display: flex;
      justify-content: center;
      margin-top: 10px;

      .chongzhi-btn {
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
      display: flex;
      align-items: center;
      width: 90%;
      background: none;
    }

    .chongzhi-input>span {
      display: inline-block;
      width: 100px;
    }
  }
}

.header-chi {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.code {
  font-size: 12px;
  color: #fff;
}

.auth-box {
  margin-top: 20px;

  .el-row {
    margin-bottom: 10px;
  }
}

.authed-box {
  .el-row {
    padding-top: 40px;
    width: 400px;
    margin: 0 auto;
  }
}

.box-card {
  position: relative;

  .el-row {
    line-height: 30px;
  }

  .auth-box {
    position: absolute;
    top: 0px;
    right: 20%;
  }

  .name {
    width: 96px;
    text-align: right;
    display: inline-block;
    color: #fff;
  }

  .info {
    font-size: 16px;
    color: #fff;
  }
}

.wrapper {
  padding: 40px 100px;

  .demo-form-inline {
    width: 400px;
    margin: 20px auto;
  }

  .auth-box {
    .dialog-footer {
      width: 400px;
      margin: 0 auto;
      display: flex;

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
    margin-left: 120px;
  }
}
</style>
