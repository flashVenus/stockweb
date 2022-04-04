<template>
  <div class="newFooter">
      <div class="footer">
         <div class="cot">
             <div class="left">
                 <div><span class="iconfont icon-dianhua"></span>联系方式: {{siteInfo.sitePhone}}</div>
                 <div><span class="iconfont icon-qq"></span>QQ号:{{siteInfo.siteQq}}</div>
                 <div><span class="iconfont icon-ziyuan"></span>邮箱: {{siteInfo.siteEmailTo}}</div>
             </div>
             <div class="mid">
                 <div class="text">风险提示：所有投资都存在风险。任何一支证券或金融产品的历史数据都不能保证其未来的表现及回报。虽然投资多样化可以帮助分散风险，但是并不能在市场低迷时确保您获益或防止您损失。投资证券或金融产品总会存在潜在的亏损可能。投资者在进行投资前需考虑自身的投资目标及风险承受能力。</div>
                 <div class="copyright">© 2020 嘉进投资国际有限公司 All rights reserved  嘉進投资（国际）投资管理公司</div>
             </div>
             <div class="right">
                 <div class="app">官方App下载</div>
                 <div class="pic">
                     <div class="pic_l">
                         <div class="adrpic"><img :src="siteInfo.siteAndroidImg" alt=""></div>
                         <div class="adrtext">官方App下载（安卓）</div>
                     </div>
                     <div class="pic_r">
                         <div class="iospic"><img :src="siteInfo.siteIosImg" alt=""></div>
                         <div class="iostext">官方App下载（苹果）</div>
                     </div>
                 </div>
                 <div class="pc"><span class="iconfont icon-pc"></span>官方PC下载</div>
             </div>
         </div>
         <div class="fot">
             <div class="fotcot">
                 <div class="btm">
                     <div class="img"></div>
                 </div>
             </div>
         </div>
      </div>
  </div>
</template>

<script>
import * as api from '../axios/api'

export default {
  name: 'newFooter',
  components: {
  },
  props: {
  },
  data () {
    return {
        siteInfo: {}, // 站点信息
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
      this.getInfoSite()
  },
  mounted () {
  },
  methods: {
      async getInfoSite () {
        // 获取站点信息
        let result = await api.getInfoSite()
        if (result.status === 0) {
          this.siteInfo = result.data
          console.log(this.siteInfo)
        } else {
          this.$message.error(result.msg)
        }
      },
  }
}
</script>

<style scoped lang="less">
</style>
