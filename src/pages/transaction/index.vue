<template>
	<el-container>
		<el-header>
			<HomeHeader></HomeHeader>
		</el-header>
		<el-container class="main-wrapper">
			<el-main class="transform-main " style="overflow: hidden;">
				<div style="margin-bottom: 2px;display: flex;background-color: #000;justify-content: space-between;">


					<div class="tab-bg" style="display: flex;justify-content: space-between; height: 40px;">
						<div style="display: flex;justify-content: space-between;">
							<!-- 登录后行情 -->
							<div class style="cursor: pointer; display: flex;">
								<div class="market transaction-red-bg hangqing">
									<span class="iconfont icon-hangqing transaction-hangqing"></span>
									<span style="font-size: 14px;">行情</span>
								</div>
								<div class="optional-list">
									<div class="one-line-list">
										<div class="optional-item-hover" @click="optTablebox(item,index,'1', item.zi)" :class="currIndex == index?'currIndex':''" v-for="(item, index) in marketNot"
										 :key="index">{{item.name}}</div>
									</div>
								</div>
							</div>
							<!-- 登录后行情 -->

							<div class style="margin-left: 15px;display: flex;">
								<div class="market transaction-red-bg zixun">
									<span class="iconfont icon-zixun transaction-information"></span>
									<span style="font-size: 14px;margin-left: 5px; ">资讯</span>
								</div>
								<div class="optional-list">
									<div class="one-line-list">
										<div class="optional-item-hover" v-for="(item, index) in information" :key="index" @click="optionalTablebox(item,index,'2')"
										 :class="optionalIndex == index?'currIndex':''">{{item.name}}</div>
									</div>
								</div>
							</div>
							<!-- <div class style="margin-left: 15px;display: flex;">
								<div class="market transaction-red-bg zhibo">
									<span class="iconfont icon-zhibo-"></span>
									<span style="font-size: 14px;margin-left: 5px; ">直播</span>
								</div>
								<div class="optional-list">
									<div style="display: flex;  line-height: 40px; text-align: center;">
										<div @click="qidai" class="optional-item-hover" style="cursor: pointer; width: 70px;border-right: 0.5px solid rgb(78, 78, 78);" v-for="(item, index) in direct" :key="index"
										 v-if="index < 4">{{item.name}}</div>
									</div>
								</div>
							</div> -->

						</div>
					</div>
				</div>


				<el-row  :gutter="3">
					<el-col class="hei"  :span="4" v-if="cutIndex == 2">
						<div :style="'height:'+windowHeight+'px'"  class="listhi-cont" style="margin-bottom: 2px; width: 100%;height: 800px;  padding: 20px 0 0 0;overflow: hidden auto;">
							<div style="display:flex;align-items: center; justify-content: center;">
								<span class="buy-xian">——</span>
								<span style="margin: 0 10px;">财经要闻</span>
								<span class="buy-xian">——</span>
							</div>

							<div style="width:100%;display: flex;justify-content: center;margin-top: 20px;position: relative;">
								<input type="text" v-model="searchTran" placeholder="请输入搜索内容" class="shous" />
								<span class="iconfont icon-search search-tran" @click="getSearch"></span>
							</div>
							<div style="width:100%;margin-left:10px;display: flex;margin-top: 20px;position: relative;">
								<div style="cursor: pointer;" @click="sort('date')">
									<span class="iconfont icon-shijian date-icon"></span>
									<span>按时间</span>
									<span class="iconfont icon-shangxiajiantou shangxiajiantou"></span>
								</div>
								<div style="margin-left:30px;cursor: pointer;" @click="sort('redu')">
									<span class="iconfont icon-redu redu"></span>
									<span>按热度</span>
									<span class="iconfont icon-shangxiajiantou shangxiajiantou"></span>
								</div>
							</div>
							<div style="display: flex;justify-content: center;margin-top: 20px;" v-if="newsList.length <= 0">暂无数据</div>

							<div class="newsList-item" style="margin:0 10px 10px 10px; padding-bottom: 10px;cursor: pointer;" v-for="(item,index) in newsList"
							 :key="index" @click="selectDetails(item,index)">
								<div style="display: flex;margin-top: 20px;">
									<div style="font-size: 12px;position: relative;">
										<span class="iconfont icon-triangle-left sanjiao" :class="index < 3?'red':'ccc'"></span>
										<span class="quantity" :class="index < 3?'':'bg-cc'">{{index+1}}</span>
									</div>
									<div style="font-weight: bolder;font-size: 12px;" class="history-title">{{item.title}}</div>
								</div>
								<div style="display: flex; justify-content: space-between;margin-top: 12px;margin-left:28px;">
									<div>
										<span style="font-size: 12px;color:rgb(131, 131, 131);">{{item.sourceName}}：</span>
										<span style="font-size: 12px;color:rgb(131, 131, 131);">{{item.showTime}}</span>
									</div>
								</div>
							</div>

						</div>
						<div class="more" @click="toStock" v-if="newsList.length > 0">
							<a class="more-btn" href="javascript:;">点击加载更多内容</a>
						</div>
					</el-col>
					<el-col class="hei" :span="20" v-if="cutIndex == 2":style="'height:'+windowHeight1+'px'">
						<div class="detail" style="height: 100%; overflow: auto;">
							<div class="detail-cont">
								<div class="detail-title">
									<h3>{{detailsCont.title}}</h3>
								</div>
								<div class="detail-explain">
									<div>
										<span class="iconfont icon-fabuxuqiu date-icon"></span>
										<span>来源：{{detailsCont.sourceName}}</span>
									</div>
									<div>
										<span class="iconfont icon-shijian date-icon"></span>
										<!-- <span class="iconfont icon-shijian"></span> -->
										<span>时间：{{detailsCont.showTime | timeFormat}}</span>
									</div>
									<div>
										<!-- <span class="iconfont icon-redu"></span> -->
										<span class="iconfont icon-redu redu"></span>

										<span>热度：{{detailsCont.views}}</span>
									</div>
								</div>
							</div>
							<div class="detail-box" style="padding-bottom: 100px;">
								<div>{{detailsCont.content}}</div>
								<div>{{detailsCont.description}}</div>
								<div style="display:flex;align-items: center;flex-direction: column;">
									<img :src="detailsCont.imgurl" />
								</div>
							</div>
						</div>
					</el-col>
					<el-col :span="5" v-if="cutIndex == 1">
						<!--  ==> 监听融资下单 -->
						<table-box ref="tableBox" @toTransaction="toTransaction" :hasGetNewOrder="hasGetNewOrder2" :handleOptions2="handleOptionsindex2"
						 :handleOptions3="handleOptions3" :handleOptions4="handleOptions4"></table-box>
					</el-col>
					<el-col class="alterWidthCenter" :span="14" v-if="cutIndex == 1">
						<chart-box :detail="detail" :code="code"></chart-box>
						<!-- <chart-new v-if="!isChartOld" :detail="detail" :code="code" :ucode="ucode"></chart-new> -->

						<!-- 持仓单子 -->

						<div class="tab-box jiaoyi-000">
							<el-tabs v-model="activeNameZero" class="black-style" v-if="$store.state.haslogin">
								<el-tab-pane label="买入/卖出" name="zero">
									<buy-box1 @selectDetailsItem="selectDetailsItem" :cutIndex="cutIndex" :detailsCont="detailsCont" :hasGetNewOrder="hasGetNewOrder" :handleOptions2="handleOptions2" :settingInfo="settingInfo" :code="code"></buy-box1>
								</el-tab-pane>
								<!-- <el-tab-pane label="融资持仓" name="first">
									<hold-position :haslogin="haslogin" :hasGetNewOrder="hasGetNewOrder" :handleOptions="handleOptions"></hold-position>
								</el-tab-pane>

								<el-tab-pane label="融资卖出" name="second">
									<sell-box :hasChangeSell="hasChangeSell" :handleOptions="handleOptions"></sell-box>
								</el-tab-pane>

								<el-tab-pane label="指数持仓" v-if="$store.state.productSetting.indexDisplay" name="three">
									<index-hold-position :haslogin="haslogin" :hasGetNewOrder="hasGetNewOrder2" :handleOptions="handleOptionsindex"></index-hold-position>
								</el-tab-pane>
								<el-tab-pane label="指数卖出" v-if="$store.state.productSetting.indexDisplay" name="fours">
									<index-sell-box :hasChangeSell="hasChangeSell2" :handleOptions="handleOptionsindex"></index-sell-box>
								</el-tab-pane>
								<el-tab-pane label="期货持仓" v-if="$store.state.productSetting.futuresDisplay" name="five">
									<futures-hold-position :haslogin="haslogin" :hasGetNewOrder="hasChangeSell3" :handleOptions="handleOptionsFutures"></futures-hold-position>
								</el-tab-pane>
								<el-tab-pane label="期货平仓" v-if="$store.state.productSetting.futuresDisplay" name="six">
									<futures-sell-box :hasChangeSell="hasChangeSell3" :handleOptions="handleOptionsFutures"></futures-sell-box>
								</el-tab-pane>

								<el-tab-pane label="配资持仓" name="seven" v-if="$store.state.productSetting.fundsDisplay">
									<funds-hold-position :haslogin="haslogin" :hasGetNewOrder="hasChangeSell4" :handleOptions="handleOptionsFunds"></funds-hold-position>
								</el-tab-pane>
								<el-tab-pane label="配资平仓" name="eight" v-if="$store.state.productSetting.fundsDisplay">
									<funds-sell-box :hasChangeSell="hasChangeSell4" :handleOptions="handleOptionsFunds"></funds-sell-box>
								</el-tab-pane> -->
							</el-tabs>
							<div v-if="false" class="account-state">
								<span :class="$store.state.userInfo.allProfitAndLose>0?'red':$store.state.userInfo.allProfitAndLose<0?'green':''">持仓总盈亏：{{$store.state.userInfo.allProfitAndLose}}</span>
								<span style="color:#409EFF;">冻结保证金：{{$store.state.userInfo.allFreezAmt}}</span>
								<span style="color:#d06e45;">强制平仓线：{{($store.state.userInfo.enableAmt + $store.state.userInfo.allFreezAmt * settingInfo.forceStopPercent).toFixed(2)}}</span>
							</div>
							<!-- <div v-show="!$store.state.haslogin" class="empty text-center">
							  <div class="btn-wrap">
							    <el-button
							      class="btn-box"
							      type="primary"
							      style="background-color: rgba(0,0,0,0)!important;"
							      @click="toLogin"
							    >登录</el-button>
							    <span>或者</span>
							    <el-button
							      class="btn-box"
							      type="primary"
							      style="background-color: rgba(0,0,0,0)!important;"
							      @click="toRegister"
							    >注册</el-button>
							  </div>
							</div>-->
							<div class="new-list-jiaoyi" v-show="!$store.state.haslogin" style="display: flex;">
								<div class="news-cont">
									<div class="news-title">
										<span style="font-size: 14px;">新闻资讯</span>
										<span class="heng">——</span>
									</div>
									<div  @click="selectDetails(item,index)" v-for="(item, index) in transactionNewList" :key="index" style="font-size: 12px;display: flex; justify-content: space-between;padding:6px 0;">
										<div class="news-list">
											<span class="red">•</span>
											<span>•</span>
											<p>{{item.title}}</p>
										</div>
										<div class="showTime">{{item.addTime}}</div>
									</div>
								</div>
								<div class="news-cont">
									<div class="news-title">
										<span style="font-size: 14px;">通知公告</span>
										<span class="heng">——</span>
									</div>
									<div  @click="selectDetails(item,index)" v-for="(item, index) in transactionNoticeList" :key="index" style="font-size: 12px;display: flex; justify-content: space-between;padding:6px 0;">
										<div class="news-list">
											<span class="red">•</span>
											<span>•</span>
											<p>{{item.artTitle}}</p>
										</div>
										<div class="showTime">{{item.addTime}}</div>
									</div>
								</div>
								<!-- <el-table :data="tableData" border height="290" style="width: 50%;">
							    <el-table-column prop="date" label="新闻资讯 一"  style="width: 50%"></el-table-column>
							  </el-table>-->
							</div>
						</div>

					</el-col>
					<el-col class="alterWidthLeft" :span="5" v-if="cutIndex == 1">
							<buy-box :hasGetNewOrder="hasGetNewOrder" :handleOptions2="handleOptions2" :settingInfo="settingInfo" :code="code"></buy-box>
					</el-col>
				</el-row>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import HomeHeader from "@/components/HeaderOrder";
	import ChartBox from "./components/chart";
	import ChartNew from "./components/chart2";
	import TableBox from "./components/table";
	import HoldPosition from "./components/holdposition";
	import IndexHoldPosition from "./components/indexholdposition";
	import FuturesHoldPosition from "./components/futuresholdposition";
	import FundsHoldPosition from "./components/fundsholdposition";
	import SellBox from "./components/sell";
	import IndexSellBox from "./components/indexsell";
	import FuturesSellBox from "./components/futuressell";
	import FundsSellBox from "./components/fundssell";
	import BuyBox from "./components/buy";
	import BuyBox1 from "./components/buy1";

	import * as api from "@/axios/api";
	import {
		timeFormat
	} from "@/utils/utils.js";
	// import { setLocalstorage, getLocalstorage } from '@/utils/localstorage'

	export default {
		components: {
			HomeHeader,
			ChartBox,
			ChartNew,
			TableBox,
			HoldPosition,
			BuyBox,
			IndexHoldPosition,
			IndexSellBox,
			SellBox,
			FuturesHoldPosition,
			FundsHoldPosition,
			FuturesSellBox,
			FundsSellBox,
			BuyBox1,
		},
		props: {},
		data() {
			return {
				time1: "time1",
				views1: "views1",
				pageNum: 1,
				cutIndex: 1,
				detailsCont: {},
				searchTran: "",
				newsList: [],
				optionalIndex: -1,
				currIndex: 1,
				// 中间底部通知公告列表
				transactionNoticeList: [],
				// 中间底部新闻列表
				transactionNewList: [],
				// 直播
				// direct: [{
				// 	name: "财神道"
				// }, {
				// 	name: "王牌健言"
				// }],
				direct: [],
				// 资讯
				//  type：新闻类型：1、财经要闻，2、经济数据，3、全球股市，
				// 4、7*24全球，5、商品资讯，6、上市公司，7、全球央行
				// information: [{
				// 		name: "财经要闻",
				// 		type: 1
				// 	},
				// 	{
				// 		name: "经济数据",
				// 		type: 2
				// 	},
				// 	{
				// 		name: "全球股市",
				// 		type: 3
				// 	},
				// 	{
				// 		name: "7*24全球",
				// 		type: 4
				// 	},
				// 	{
				// 		name: "商品资讯",
				// 		type: 5
				// 	},
				// 	{
				// 		name: "上市公司",
				// 		type: 6
				// 	},
				// 	{
				// 		name: "全球央行",
				// 		type: 7
				// 	},
				// 	{
				// 		name: "精彩视频",
				// 		type: 8
				// 	},
				// ],
				information: [{
						name: "财经要闻",
						type: 1
					},
					{
						name: "经济数据",
						type: 2
					},
					{
						name: "全球股市",
						type: 3
					},
					{
						name: "7*24全球",
						type: 4
					},
					{
						name: "商品资讯",
						type: 5
					},
					{
						name: "上市公司",
						type: 6
					},
					{
						name: "全球央行",
						type: 7
					},
					// {
					// 	name: "精彩视频",
					// 	type: 8
					// },
				],
				// 行情未登录

				marketNot: [{
						name: "指数",
						type: "three"
					},
					{
						name: "沪深", // 股票
						type: "first"
					},
					{
						name: "创业",
						type: "start"
					},
					{
						name: "科创",
						type: "four"
					},
					{
						name: "自选",
						type: "",
						hidden: this.$store.state.haslogin,
						zi: 'zi',
					},
				],
				// 行情登录
				//【指数】【沪深】【创业】【科创】【自选】【资讯】
				market: [{
						name: "沪深"
					},
					{
						name: "上证"
					},
					{
						name: "深证"
					},
					{
						name: "板块"
					},
					{
						name: "科技版"
					},
					{
						name: "创业板"
					},
					{
						name: "中小半"
					},
					{
						name: "全球指数"
					},
				],
				code: "",
				ucode: "",
				activeName: "zero",
				haslogin: false,
				detail: {},
				hasChangeSell: 0, // 是否平仓 (融资) 平仓之后数字一直加
				hasChangeSell2: 0, // 是否平仓 (指数) 平仓之后数字一直加
				hasChangeSell3: 0, // 是否平仓 (期货) 平仓之后数字一直加
				hasChangeSell4: 0, // 是否平仓 (配资) 平仓之后数字一直加
				hasGetNewOrder: 0, // 是否下单(融资)  下单数字++ 使用true/false 第二次为true的时候 页面监听不到
				hasGetNewOrder2: 0, // 是否下单(指数)
				hasGetNewOrder3: 0, // 是否下单(期货)
				hasGetNewOrder4: 0, // 是否下单(配资)
				settingInfo: {},
				isChartOld: false,
				windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
				windowHeight: document.documentElement.clientHeight - 160, //实时屏幕高度
				windowHeight1: document.documentElement.clientHeight - 200, //实时屏幕高度
				activeNameZero: 'zero', // 股票项目写死
			};
		},
		watch: {
			change(newVal, oldVal) {
				if (newVal !== oldVal) {
					this.getDetail(); // 分时数据
				}
			},
		},
		computed: {
			change() {
				return this.$route.query.code;
			},
		},
		beforeRouteEnter(to, from, next) {
			// 现在想不做判断，进入之前一律刷新一次
			if (!to.query.code) {
				let query = to.query;
				query.code = "300498";
				next({
					path: to.path,
					query: query,
				});
			}
			next();
		},
		beforeRouteUpdate(to, from, next) {
			// 现在想不做判断，进入之前一律刷新一次
			if (!to.query.code) {
				let query = to.query;
				query.code = "300498";
				next({
					path: to.path,
					query: query,
				});
			}
			next();
		},
		beforeCreate() {},
		created() {
			setInterval(() => {
				// this.form.pageSize = Math.ceil(this.windowHeight / 63)
				// this.form2.pageSize = Math.ceil(this.windowHeight / 63)
				this.windowHeight = document.documentElement.clientHeight -  160; //实时屏幕高度
				this.windowHeight1 = document.documentElement.clientHeight -  100; //实时屏幕高度

			}, 500);
			// 暂时排错
			// let data = {
			//   'indexDisplay': true
			// }
			// this.$store.state.productSetting = data

			this.code = this.$route.query.code;
			if (this.code.indexOf("hf_") != -1) {
				this.isChartOld = true;
			} else {
				this.isChartOld = false;
			}

			// if(!this.code){
			//   this.getList()
			// }
			// 判断是否 登录
			//  window.localStorage.getItem('phone')
			// getLocalstorage('phone',1000 * 60 * 60)
			this.getUserInfo();

			// if(getLocalstorage('phone',1000 * 60 * 60)){
			//   // 判断是否登录
			//   this.haslogin = true
			//   this.$store.state.haslogin = true
			//   this.getUserInfo()
			// }
			this.$store.state.activeIndex = "transaction";
			this.getSettingInfo();
			if (!this.$store.state.productSetting) {
				this.getProductSetting();
			}
		},
		mounted() {
			window.activeName1 = 'first'
			// setInterval(()=>{
			// 	if(window.cutIndex){
			// 		this.cutIndex = window.cutIndex
			// 		this.detailsCont = window.detailsCont
			// 		// window.cutIndex = 0
			// 		// window.detailsCont = ''
			// 	}
			// },500)

			this.getDetail();
			this.getNewList();
			this.getNoticeList();
			// this.getNewsList();
		},
		methods: {
			qidai(){
				this.$message('敬请期待');
			},
			selectDetailsItem(item){
				this.cutIndex = 2;
				this.detailsCont = item
				// this.newType = newType
				// this.newsList = newsList
			},
			toUserCenter() {
				// 进入个人中心
				this.$router.push("/user");
			},
			async handleCommand(val) {
				if (val === "a") {
					// 修改密码
				} else if (val === "c") {
					this.$store.state.loginIsShow = true;
				} else if (val === "d") {
					this.$router.push("/user");
				} else {
					// 退出登录
					this.clearCookie();
					let data = await api.logout();
					if (data.status === 0) {
						// 退出登录清除本地存储 清除用户数据
						window.localStorage.clear();
						this.$store.state.haslogin = false;
						this.$message.success("您已退出登录");
						this.$store.state.userInfo = {};
						this.$router.push("/login");
					} else {
						this.$message.error(data.msg);
					}
				}
			},
			toLogin1() {
				this.$router.push("/login");
			},
			// 选择色系
			selectColor(command) {
				localStorage.setItem("styleName", command);
				this.$store.commit('setSystemColor', command)
				document.getElementsByTagName("body")[0].className = command;
				window.drawLine && window.drawLine()
			},
			toIndex() {
				this.$router.push({
					path: '/'
				})
			},
			async toTransaction(row) {
				var ziCode = this.$route.query
				// 卖出数据
				var data = await api.findUserPositionByCode({
					stockCode: row.code || ziCode.code
				})
				console.log(row,'222222222222222')
				if (data.status == 0) {
					this.$store.commit('setUserPositionData', data.data.list[0])
				}
			},
			async toStock() {
				//加载跟多新闻列表
				var page = ++this.pageNum;
				var query = {
					pageNum: page,
					pageSize: 15,
					type: this.newType
				};
				var list = await this.getNewsList(query);
				console.log(list);
				if (list.length <= 0) {
					this.$message({
						message: "没有更多数据了",
						type: "warning",
					});
					return;
				}
				this.newsList.push(...list);
			},
			async sort(type) {
				// 新闻列表排序
				var query = {
					pageNum: this.pageNum,
					pageSize: 15,
					type: this.newType
				};
				if (type == "sort") {
					var q = Object.assign(query, {
						sort: this.time1
					});
					this.newsList = await this.getNewsList(q);
					this.switchData(this.newsList, "showTime");
					this.time1 = this.time1 == "time1" ? "time0" : "time1";
				} else {
					var q = Object.assign(query, {
						sort: this.views1
					});
					console.log(q);
					this.newsList = await this.getNewsList(q);
					this.switchData(this.newsList, "showTime");
					this.views1 = this.views1 == "views1" ? "views0" : "views1";
				}
			},
			async selectDetails(item, index) {
				// 选择详情
				console.log(item)
				this.cutIndex = 2;
				var data = await api.getNewsDetailList({
					id: item.id,
				});
				if (data.status == 0) {
					this.optionalIndex = item.type
					this.currIndex = -1
					this.detailsCont = data.data;
					var query = {
						pageNum: this.pageNum,
						pageSize: 15,
						type: item.type,
					};
					this.newType = item.type
					this.newsList = await this.getNewsList(query);
					this.switchData(this.newsList, "showTime");
				}
				var data = await api.updateNewsViews({
					id: item.id,
				});
				if (data.status == 0) {}
			},
			async getSearch() {
				//  搜索新闻
				var query = {
					// keyword: this.searchTran,
					pageNum: 1,
					pageSize: 15,
				};
				if (this.searchTran) {
					var q = Object.assign(query, {
						keyword: this.searchTran
					});
					this.newsList = await this.getNewsList(q);
				} else {
					this.newsList = this.getNewsList(query);
				}
			},
			async getNewsList(query) {
				// 获取资讯列表接口（交易大厅左侧小列表）

				var data = await api.getNewsList(query);
				if (data.status == 0) {
					// this.newsList = data.data.list;
					return data.data.list;
				}
			},
			async optionalTablebox(item, index, type) {
				// 资讯tab选项
				this.cutIndex = type;
				this.optionalIndex = index;
				this.currIndex = -1;
				var query = {
					pageNum: this.pageNum,
					pageSize: 15,
					type: item.type,
				};
				this.newType = item.type
				this.newsList = await this.getNewsList(query);
				this.switchData(this.newsList, "showTime");

				var data = await api.getNewsDetailList({
					id: this.newsList[0].id,
				});

				if (data.status == 0) {
					// list.forEach((item) => {
					//   var tempStr = item[time] + "";
					//   var timestamp = tempStr.slice(0, tempStr.length - 3);
					//   var newDate = new Date();
					//   newDate.setTime(timestamp * 1000);
					//   item[time] = newDate.toLocaleDateString();
					// });
					this.detailsCont = data.data;
				}
			},
			optTablebox(item, index, type, zi) {
				// 行情tab选项
				this.optionalIndex = -1;
				if (zi) {
					this.cutIndex = 1;
					console.log(zi)
					this.currIndex = "second";
					setTimeout(()=>{
							this.$refs.tableBox.activeName = "second";
					},500)
					window.activeName1 = 'zi'
					return;
				}
				this.currIndex = index;
				this.cutIndex = type;
				window.activeName1 = item.type
				this.$refs.tableBox.activeName = item.type;
				// if(item.type == 'start'){
				// 	this.$refs.tableBox.getlistStart()
				// }
			},
			// @tab-click="handleClick"
			// handleClick(val){
			//   let name = window.localStorage.getItem('phone')
			//   if(name){
			//     this.activeName = val
			//   }
			// },
			// 时间转换
			switchData(list, time) {
				list.forEach((item) => {
					var tempStr = item[time] + "";
					var timestamp = tempStr.slice(0, tempStr.length - 3);
					var newDate = new Date();
					newDate.setTime(timestamp * 1000);
					item[time] = newDate.toLocaleDateString();
				});
			},
			async getNoticeList() {
				// 获取交易大厅-中间部分-通知公告
				let data = await api.getTransactionNoticeList({
					pageSize: 10,
				});
				if (data.status == 0) {
					this.switchData(data.data.list, "addTime");
					this.transactionNoticeList = data.data.list;
				}
			},
			async getNewList() {
				// 获取交易大厅-中间部分-新闻资讯
				let data = await api.getTransactionNewList({
					pageSize: 10,
				});
				if (data.status == 0) {
					this.switchData(data.data.list, "addTime");
					this.transactionNewList = data.data.list;
				}
			},

			handleOptions(opts) {
				// 监听平仓状态 融资
				this.hasChangeSell = opts;
				if (this.hasChangeSell) {
					this.activeName = "second";
				}
			},
			handleOptionsindex(opts) {
				// 监听平仓状态 指数
				this.hasChangeSell2 = opts;
				if (this.hasChangeSell2) {
					this.activeName = "fours";
				}
			},
			handleOptionsFutures(opts) {
				// 监听平仓状态 期货
				this.hasChangeSell3 = opts;
				if (this.hasChangeSell3) {
					this.activeName = "six";
				}
			},
			handleOptionsFunds(opts) {
				// 监听平仓状态 配资
				this.hasChangeSell4 = opts;
				if (this.hasChangeSell4) {
					this.activeName = "eight";
				}
			},
			handleOptions2(opts) {
				// 监听指数下单状态
				this.hasGetNewOrder = opts;
				if (this.hasGetNewOrder) {
					this.activeName = "first";
				}
			},
			handleOptions3(opts) {
				// 监听期货下单状态
				this.hasGetNewOrder3 = opts;
				if (this.hasGetNewOrder3) {
					this.activeName = "five";
				}
			},
			handleOptions4(opts) {
				// 监听配资下单状态
				this.hasGetNewOrder4 = opts;
				if (this.hasGetNewOrder4) {
					this.activeName = "seven";
				}
			},
			handleOptionsindex2(opts) {
				// 监听下单状态
				this.hasGetNewOrder2 = opts;
				if (this.hasGetNewOrder2) {
					this.activeName = "three";
				}
			},
			async getDetail() {
				if (this.$route.query.code.indexOf("hf_") != -1) {
					this.isChartOld = true;
				} else {
					this.isChartOld = false;
				}
				let opts = {
					code: this.$route.query.code,
				};
				this.loading = true;
				let data = await api.getSingleStock(opts);
				let gid = data.data.gid;
				let code = data.data.code;
				let ucode = gid.startsWith("sh") ? code + ".sh" : code + ".sz";
				this.ucode = ucode;
				this.loading = false;
				if (data.status === 0) {
					this.detail = data.data;
				} else {
					this.$message.error(data.msg);
				}
			},
			toRegister() {
				// 注册
				this.$router.push("/register");
			},
			toLogin() {
				// 登录
				this.$store.state.loginIsShow = true;
			},
			async getList() {
				// 获取表格数据
				let opt = {
					pageNum: 1,
					pageSize: 1,
				};
				let data = await api.getStock(opt);
				if (data.status === 0) {
					// data.data.list.forEach(element => {
					//     this.list.push(element)
					// });
					this.list = data.data.list[0];
					this.$router.push({
						path: "/transaction",
						query: {
							code: data.data.list[0].code,
						},
					});
					// window.location.reload()
				} else {
					this.$message.error(data.msg);
				}
			},
			async getSettingInfo() {
				// 网站设置信息
				let data = await api.getSetting();
				if (data.status === 0) {
					// 成功
					this.settingInfo = data.data;
					// 杠杆倍数
					// this.form.lever = data.data.siteLever
				} else {
					this.$message.error(data.msg);
				}
			},
			async getProductSetting() {
				// 获取网站产品设置信息
				let result = await api.getProductSetting();
				if (result.status === 0) {
					this.$store.state.productSetting = result.data;
				} else {
					this.$message.error(result.msg);
				}
			},
			async getUserInfo() {
				// 获取用户信息
				let data = await api.getUserInfo();
				if (data.status === 0) {
					// 判断是否登录
					this.haslogin = true;
					this.$store.state.haslogin = true;
					this.$store.state.userInfo = data.data;
				} else {
					this.haslogin = false;
					this.$store.state.haslogin = false;
					// this.$message.error(data.msg)
				}
			},
		},
	};
</script>
<style lang="less" scoped>
	.alterWidthLeft{
		width: 18.83333%;
	}
	.alterWidthCenter{
		width: 60.33360%;
	}
	.red-bg .el-dropdown {
		font-size: 14px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		width: 68px;
	}

	.black-bg .el-dropdown {
		color: #fff;
		font-size: 14px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		width: 68px;
	}

	/deep/ .tab-box .el-tabs__content {
		// height: 250px !important;
	}

	.header-btn-new {
		text-align: center;
		width: 45px;
		color: #fff;
		line-height: 30px;
	}
	.one-line-list {
    display: flex;
    justify-content: space-around;
    align-content: center;
    line-height: 40px;
	}
.optional-item-hover{
    border-right: rgba(255, 255, 255, .1) 1px solid;
    padding: 0 16px;
		white-space: nowrap;
			&:hover{
				background-color: #002346;
			}
		}
	.black-bg {
		.hei{
			background-color: #000;
		}
		.newsList-item {
			border-bottom: 1px solid rgba(255, 255, 255, .1);
		}

		.buy-xian {
			color: #3d3d41;
		}

		.el-main {
			margin: 0 !important;
			background: rgb(33, 39, 50);
		}

		.more {
			background: #a1a1a1;
			opacity: 0.8;
			border-radius: 3px;
			display: flex;
			justify-content: center;
			align-items: center;

			.more-btn {
				width: 96px;
				height: 12px;
				font-size: 12px;
				font-family: MicrosoftYaHeiLight;
				font-weight: 400;
				color: #ffffff;
			}

			height: 30px;
		}
	}

	.red-bg {

		.new-list-jiaoyi {
			margin-top: 4px;
			border: 1px solid #F44336;
		}

		.more {
			background: #000000;
			opacity: 0.8;
			border-radius: 3px;
			display: flex;
			justify-content: center;
			align-items: center;

			.more-btn {
				width: 96px;
				height: 12px;
				font-size: 12px;
				font-family: MicrosoftYaHeiLight;
				font-weight: 400;
				color: #ffffff;
			}

			height: 30px;
		}

		.shangxiajiantou {
			font-size: 12px;
			color: #ccc;
		}

		.redu,
		.date-icon {
			color: rgb(193, 24, 21);
		}

		.shangxiajiantou {
			font-size: 12px;
			color: #ccc;
		}

		.shous {
			border: 1px solid rgb(202, 202, 202);
			width: 80%;
			padding: 5px 5px 5px 20px;
		}

		.search-tran {
			position: absolute;
			right: 25px;
			top: 10px;
		}

		.listhi-cont {
			background-color: #fff;
		}

		.history-title {
			color: #000;
			line-height: 18px;
			font-weight: bolder !important;
		}

		.sanjiao {
			position: absolute;
			top: 4px;
			-webkit-transform: rotate(45deg);
			transform: rotate(-180deg);
			/* width: 0px; */
			right: 4px;
			font-size: 10px;
		}

		.red {
			color: #c11815;
		}

		.sanjiao.ccc {
			color: rgb(65, 65, 85);
		}

		.current-price {
			color: #c11815;
		}

		.quantity {
			display: inline-block;
			background-color: #c11815;
			text-align: center;
			// margin-left: 10px;
			margin-right: 10px;
			border-radius: 2px;
			line-height: 13px;
			color: #fff;
			padding: 3px 5px;
			height: 13px;
		}

		.bg-cc {
			background-color: rgb(65, 65, 85);
		}

		.listhi-cont::-webkit-scrollbar {
			/*滚动条整体样式*/
			width: 5px;
			/*高宽分别对应横竖滚动条的尺寸*/
			height: 1px;
		}

		.listhi-cont::-webkit-scrollbar-thumb {
			/*滚动条里面小方块*/
			border-radius: 5px;
			box-shadow: inset 0 0 5px rgba(199, 14, 14, 0.2);
			background: rgb(193, 24, 21);
		}

		.listhi-cont::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
			box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			background: #ededed;
		}
	}

	.black-bg {
		.shangxiajiantou {
			font-size: 12px;
			color: #ccc;
		}

		.date-icon,
		.redu {
			color: rgb(71, 167, 196);
		}

		.shous {
			border: 1px solid rgb(35, 75, 110);
			background: no-repeat;
			width: 80%;
			padding: 5px 5px 5px 20px;
			color: #fff;
		}

		.search-tran {
			position: absolute;
			right: 25px;
			top: 10px;
		}

		.listhi-cont {
			color: #ececec;
		}

		.history-title {
			line-height: 18px;

			color: #bcbcbc;
		}

		.sanjiao {
			position: absolute;
			top: 4px;
			-webkit-transform: rotate(45deg);
			transform: rotate(-180deg);
			/* width: 0px; */
			right: 4px;
			font-size: 10px;
		}

		.red {
			color: #c11815;
		}

		.sanjiao.ccc {
			color: rgb(65, 65, 85);
		}

		.current-price {
			color: #c11815;
		}

		.quantity {
			display: inline-block;
			background-color: #c11815;
			text-align: center;
			// margin-left: 10px;
			margin-right: 10px;
			border-radius: 2px;
			line-height: 13px;
			color: #fff;
			padding: 3px 5px;
			height: 13px;
		}

		.bg-cc {
			background-color: rgb(65, 65, 85);
		}

		.listhi-cont::-webkit-scrollbar {
			/*滚动条整体样式*/
			width: 5px;
			/*高宽分别对应横竖滚动条的尺寸*/
			height: 1px;
		}

		.listhi-cont::-webkit-scrollbar-thumb {
			/*滚动条里面小方块*/
			border-radius: 5px;
			box-shadow: inset 0 0 5px rgba(199, 14, 14, 0.2);
			background: #138eb4;
		}

		.listhi-cont::-webkit-scrollbar-track {
			/*滚动条里面轨道*/
			box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 10px;
			background: #ededed;
		}

		.xianjin {
			color: rgb(151, 150, 150);
		}
	}

	.currIndex {
		background: rgb(2, 77, 161);
	}

	.transform-main {
		min-width: 1200px;
		padding: 10px;
	}

	.tab-box /deep/ .el-tabs .el-tab-pane {
		padding: 0;
		// min-height: 300px;
	}

	.el-table td {
		padding: 5px 0;
	}

	.tab-box {
		position: relative;

		.empty {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			z-index: 10;
		}

		.btn-wrap {
			padding-top: 120px;
			color: #fff;

			span {
				padding: 0 20px;
			}
		}

		.btn-box {
			background: none;
			border-color: #c11815;
			color: #c11815;
			font-weight: 600;
			font-size: 16px;
		}
	}

	.account-state {
		color: #ddd;
		position: absolute;
		top: 0;
		right: 0;
		line-height: 36px;

		span {
			margin-right: 20px;
		}
	}
</style>
