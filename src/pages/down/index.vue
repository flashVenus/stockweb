<template>
  <el-container class="down">
    <el-header>
      <home-header></home-header>
    </el-header>
    <backdrop1>
      <slot>
        <div class="bancot">
          <!-- 下载区域 -->
          <div class="description">
            <div class="tit"><span class="zh">软件下载</span><span class="en">COMPANY PROFILE</span></div>
            <div class="text">我们最大的资产是我们的员工，嘉进投资国际有限公司只聘用那些富有经验的专业人员，他们已经在金融服务业展示了他们一流的客户服务技巧和领带能力。提供专业的客户服务。我们的销售和营运代表将以专业的中文对客户的任何询问进行解答。</div>
            <div class="download">
              <div class="adr"><div class="img"><img :src="siteInfo.siteAndroidImg" alt=""></div><div class="adrtext">官方App下载（安卓）</div></div>
              <div class="ios"><div class="img"><img :src="siteInfo.siteIosImg" alt=""></div><div class="iostext">官方App下载（安卓）</div></div>
              <div class="pc"><div class="btn"><span class="iconfont icon-pc"></span>官方PC下载</div><span class="letter">扫码下载移动版 随时随地交易</span></div>
            </div>
          </div>
          <div class="downimg"><img src="../../../static/newimg/ruanjian.png" alt=""></div>
        </div>
      </slot>
    </backdrop1>
    <!-- 服务 -->
    <div class="serve">
      <div class="cot">
        <div class="tit">类型多样 安全省心</div>
        <div class="items">
          <div class="item">
            <div class="icon"><span class="iconfont icon-gupiao"></span></div>
            <div class="text">行情分发 极速稳定</div>
          </div>
          <div class="item">
            <div class="icon"><span class="iconfont icon-hezuo"></span></div>
            <div class="text">客户至上 优享服务  </div>
          </div>
          <div class="item">
            <div class="icon"><span class="iconfont icon-jisuxiangying"></span></div>
            <div class="text">极速开户 超高配额  </div>
          </div>
          <div class="item">
            <div class="icon"><span class="iconfont icon-zichanqingkuang"></span></div>
            <div class="text">买涨买跌 资产增值</div>
          </div>
        </div>
      </div>
    </div>
    <div class="rule">
      <div class="cot">
        <layout>
          <div slot="left"><div class="img"><img src="../../../static/newimg/pingtai.png" alt=""></div></div>
          <div slot="right">
            <div class="tit">严谨合规 </div>
            <div class="text">从投资者根本利益出发，公平对待所有人，并致力于为投资者提供实现投资成功的最佳机会  </div>
          </div>
        </layout>
      </div>
    </div>
    <newFooter />
  </el-container>
</template>

<script>
  import HomeHeader from '../../components/HeaderOrder'
  import newFooter from '../../components/newFooter'
   import backdrop1 from '../../components/backdrop1'
   import layout from '../../components/layout'
  import * as api from '../../axios/api'
  // 引入qrcode
  import QRCode from 'qrcode'

  export default {
    components: {
      HomeHeader,
      newFooter,
      QRCode,
      backdrop1,
      layout
    },
    props: {},
    data () {
      return {
        bannerList: [],
        market: {}, // 大盘详情
        siteInfo: {}, // 站点信息
        timer: null
      }
    },
    watch: {},
    computed: {},
    created () {
      // this.qrcode()
      this.timer = setInterval(this.refreshList, 5000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    mounted () {
      this.getBanner()
      this.getMarket()
      this.getInfoSite()
      this.$store.state.activeIndex = 'down'
    },
    methods: {
      qrcode () {
        let qrcode = new QRCode(this.$refs.qrCodeDiv, {
          width: 186,
          height: 186,
          text: process.env.API_HOST + '/down'
        })
        console.log(qrcode)
      },
      refreshList () {
        // 刷新 大盘指数
        this.getMarket()
      },
      async getBanner () {
        // 获取显示的banner
        let result = await api.getBannerByPlat({ platType: 'pc' })
        if (result.status === 0) {
          this.bannerList = result.data
        } else {
          this.$message.error(result.msg)
        }
      },
      async getMarket () {
        // 获取大盘指数
        let result = await api.getMarket()
        if (result.status === 0) {
          this.market = result.data.market
        } else {
          this.$message.error(result.msg)
        }
      },
      async getInfoSite () {
        // 获取设置信息
        let result = await api.getInfoSite()
        if (result.status === 0) {
          this.siteInfo = result.data
        } else {
          this.$message.error(result.msg)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
