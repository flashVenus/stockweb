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
                 <div class="copyright">© 2020 国融证券股份有限公司 All rights reserved  国融证券股份有限公司</div>
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
           <div class="footdec">
             <div style="display: table;width: 1025px;margin: 0 auto;color: #e2e2e2;">
               <div style="float: left;width: 390px;line-height: 20px;margin-top: 15px;">
                 <p>国融证券股份有限公司版权所有 证监会核准综合性证券公司 </p>
                 <p>Copyright  <span></span> 2002 GRZQ All Rights Reserved </p>
               </div>
               <div style="float: left;width: 634px;">
                 <a href="http://beian.miit.gov.cn/publish/query/indexFirst.action" target="_black" style="display: inline-block; height: 70px;color: #fff; " class="keychainify-checked">
                   <img src="../../static/newimg/gxb32.png" style="display: inline-block;width: 32px;height: 32px; margin-right: 5px;margin-top: 19px;">蒙ICP备12001678号-2
                 </a>
                 <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=15010202150128" style="display: inline-block; height: 70px; color: #fff; " class="keychainify-checked">
                   <img src="../../static/newimg/wj32.png" style="display: inline-block;width: 32px;height: 32px; margin-right: 5px;margin-top: 19px;margin-left: 5px;">蒙公网安备 15010202150128号
                 </a>
                 <div style="display: inline-block; vertical-align: middle;margin-left: 5px;height:68px;overflow: hidden;">
                   <a style="display: block;margin-top: -3px;color: #fff;" href="http://nm.gsxt.gov.cn/%7BD23A0762BA1BA6B0492CC06198C724FC99EEA75EFF88D7BE8322FA9FE85A4E2BC7B0EF86BB1A5345429A8C8BC22E67C6987D27D2ECF35A8798C23FE2FDEC3A8B169B169B16E9EE34CDEFE8D8B110A710964CEDCBDF686FCEDA5CA57FDEF849D43CE68F9B6470FD4CC1F88B68DA0830C9967529C51DE4A819AE199F97DEC8CF86F112EBA7168B068B068B-1576035369526%7D" target="_blank" class="keychainify-checked">
                     <img style="margin-top: 17px; margin-right: 5px;" src="../../static/newimg/govIcon.gif" width="32" height="32" title="工商网监-国融证券" alt="工商网监-国融证券" border="0">工商网监
                   </a></div>
                 <span style="float:right;">本网站支持IPv6 </span>
               </div>
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
