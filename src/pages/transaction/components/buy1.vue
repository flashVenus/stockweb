<template>
	<div style="height: 248px;">
		<!-- :style="'?'':'margin-bottom: 20px;'" -->
		<div class="wrapper buy-table" style="display:flex;justify-content: space-between; width: 100%;">
			<!-- <div class="" style="margin-bottom: 10px;" v-if="activeName1 == 'first' || activeName1 == 'four' || activeName1 == 'start'">
				<div  style="width: 50px;display: flex;justify-content: center;margin-top: 20px;align-items: center;flex-direction: column;cursor: pointer;">
					<div @click="cut('first')" style=" cursor: pointer; padding: 20px 10px;color: #fff;border-radius: 5px;margin-bottom: 2px;"
					 :class="activeName == 'first'?'current':'currentNone'" class="jiaoyi">
						<div style="width: 15px;">两融交易</div>
					</div>
					<div @click="cut('two')" :class="activeName == 'two'?'current':'currentNone'" class="jiaoyi" style="padding:20px 10px;color: rgb(255, 255, 255);border-radius: 5px;">
						<div style="width: 15px;">分仓交易</div>
					</div>
				</div>
			</div> -->
			<div style="display: flex;justify-content: space-between;width: 100%;">
				<el-tabs v-model="activeName" class="buy-box-cont" style="width: 50%;">
					<!-- 两融交易开始 -->
					<el-tab-pane name="first">
						<!-- 买 -->
						<div class="buy-box" style="margin-top: 15px;">
							<el-form ref="ruleForm" :hide-required-asterisk="true" size="mini" :model="form" label-width="60px">
								<div class="buy-item" style="display: flex;">
									<span class="buy-name1">{{detail.name}}</span>
									<div class="" style="position: relative;">
										<span class="iconfont icon-triangle-left sanjiao"></span>
										<span class="buy-code1">{{detail.code}}</span>
									</div>
									<span style="font-size:12px;">现价：</span>

									<span style="font-size:12px;color:#B12525;" :class="detail.hcrate < 0 ?'green price':detail.hcrate > 0 ?'red price':'price'">{{detail.nowPrice}}</span>
									<span style="font-size:12px;margin-left:10px">涨跌幅：</span>
									<span style="font-size:12px;color:#B12525;" :class="detail.hcrate < 0 ?'green price':detail.hcrate > 0 ?'red price':'price'">{{Number(detail.hcrate).toFixed(3)}}%</span>
									
								</div>


								<el-row class="buy-item">
									<el-col :span="12"></el-col>
									<el-col :span="12"></el-col>
								</el-row>
								<div style="display: flex;">
									<div>
										<div style="display: flex;position: relative;">
											<!-- <el-form-item prop="buyNum" style="margin-bottom:10px;margin-right: 10px;">
												<el-input placeholder="最小买1手" v-model="form.buyNum" class>
													<el-select v-model="form.buyNum" title="点击选择手数" slot="prepend" placeholder="请选择">
														<el-option v-for="i in buyNumList" :key="i.value" :label="i.label" :value="i.value"></el-option>
													</el-select>
												</el-input>
												<span style="position: absolute;right: 6px;top: 0px; font-size: 12px;">手</span>
											</el-form-item> -->
											<el-form :model="form" label-width="80px" size="mini">
												<el-form-item label="买入数量" prop="buyNum" style="margin-bottom:10px!important;">
													<el-input style="width:150px" size="mini" placeholder="买入数量" v-model="form.buyNum" class="input-with-select">
														<el-button slot="append">手</el-button>
													</el-input>
												</el-form-item>
												<el-form-item label="快速选择" prop="buyNum" style="margin-bottom:10px!important;">
													<div style="width:240px" class="quick-select">
														<el-button size="mini" class="quick-btn" v-for="item in cw" :key="item.key" @click="selectCwFun(item.value)">
															<div :class="selectCw == item.value?'on':''">
																{{item.label}}
															</div>
														</el-button>
													</div>
												</el-form-item>
												
												<el-form-item label="下单类型" prop="buyNum" style="margin-bottom:10px!important;white-space: nowrap;">
													<div>
														<el-button v-for="item in buyTypes" :key="item.key" @click="selectBuyTypeFun(item.value)" :type="form.buyType == item.value  ? 'primary' : ''">
																{{item.label}}
														</el-button>
														<el-input v-if="form.buyType == 2" placeholder="买入价格" style="width:157px" v-model="form.triggerPrice" type="text">
																<el-button slot="append">元</el-button>
														</el-input>
														<!-- <span v-if="form.buyType == 2"><input style="width:100px" v-model="form.triggerPrice" type="text"> 元</span> -->
													</div>
												</el-form-item>
											</el-form>
											<!-- <el-form-item prop="buyNum" style="margin-bottom:10px;">
												<el-input placeholder="杠杆" v-model="form.lever" class="input-with-select">
													<el-select v-model="form.lever" title="点击选择杠杆" slot="prepend" placeholder="请选择">
														<el-option v-for="i in siteLeverList" :key="i.value" :label="i.label" :value="i.value"></el-option>
													</el-select>
												</el-input>
												<span style="position: absolute;right: 10px;top: 2px; font-size: 12px;">倍</span>
											</el-form-item> -->
										</div>
										<!-- <p class="prompt clearfix">
											<el-form-item label="方向" prop="buyType">
												<el-radio-group v-model="form.buyType">
													<el-radio label="买涨" value="0"></el-radio>
													<el-radio label="买跌" value="1"></el-radio>
												</el-radio-group>
											</el-form-item>
										</p> -->

										<!-- <el-row class="buy-item" v-if="!isqihuo">
										</el-row>
										<el-row class="buy-item" v-if="isgupiao">
											<el-col :span="12">
												<span class="baozheng" style="font-size: 13px;">保证金：</span>
												<span class="price">{{(price/ form.lever).toFixed(2) || 0}}</span>
											</el-col>
											<el-col :span="12">
												<sapn class="keyong">总手续费：</sapn>
												<span class="price">{{poundage?poundage:0}}</span>
												<el-tooltip class="item" effect="dark" :content="'总手续费 = 买入手续费（'+ (settingInfo.buyFee*100) + '%）+ 印花税（'+ (settingInfo.dutyFee*100) + '%） + 点差费（'+ (settingSpreadRate.spreadRate*100).toFixed(2) + '%）'"
												 placement="bottom-end">
													<i class="iconfont icon-xiangqing"></i>
												</el-tooltip>
											</el-col>
										</el-row>
										<el-row class="buy-item" v-if="isgupiao">
											<el-col :span="24"></el-col>
										</el-row> -->
										<el-row class="buy-item" v-if="!isqihuo">
											<el-col :span="12" v-if="isgupiao">
												<span class="keyong">需要支付：</span>
												<span class="price">{{gupiaoTotal?gupiaoTotal:0}}</span>
											</el-col>
											<el-col :span="12" v-if="isgupiao">
												<span class="keyong">可用资金：{{$store.state.userInfo.enableAmt}}元</span>
											</el-col>
										</el-row>
										<el-row class="buy-item" v-if="isqihuo">
											<el-col :span="24">
												<span class="keyong">需要支付：</span>
												<span class="price">{{total?total:0}} {{futuresInfo.coinCode}}</span>
												≈
												<span class="price">{{cnyTotal?cnyTotal:0}} CNY</span>
											</el-col>
											<el-col :span="24">
											<p class="prompt clearfix" v-if="isqihuo">
												<!-- pull-right -->
												<span class="keyong">可用资金：{{$store.state.userInfo.enableFuturesAmt}}元</span>
											</p>
											</el-col>
										</el-row>
										
										<!-- <el-row class="buy-item" style="font-size:10px;">
											<el-checkbox class="check-box" v-model="agree" name="type" style="font-size:10px;"></el-checkbox>我同意
											<a href="javascript:;" @click="tradeDialogVisible = true">《{{siteInfo.tradeAgreeTitle}}》</a>
										</el-row> -->
										<el-dialog :title="siteInfo.tradeAgreeTitle" class="agree-dialog" :center="true" :visible.sync="tradeDialogVisible"
										 width="80%">
											<div class="dialog-iframe">
												<div class="content" style="margin:20px;background:#fff;border-radius:5px;margin-top:60px;line-height:200%;">
													<p v-for="item in tradeAgreeText.split('。')" :key="item">{{item}}。</p>
												</div>
												<!-- <iframe class="iframe-box" :src="$store.state.siteInfo.tradeAgree" frameborder="0"></iframe> -->
												<div slot="footer" class="text-center dialog-footer clearfix">
													<el-button type="primary" @click="agreeTrade">我已阅读并同意{{siteInfo.tradeAgreeTitle}}</el-button>
												</div>
											</div>
										</el-dialog>
									</div>
								</div>
							</el-form>
							<div>
								<el-button :loading="loadingBtn" class="buy-button ru" type="primary" @click="onSubmit('ruleForm')">入仓</el-button>
							</div>
						</div>
					</el-tab-pane>
					<!-- 两融交易结束 -->

					<!-- 分仓交易开始 -->
					<el-tab-pane name="two">
						<!-- 买 -->
						<!-- :rules="ruleFunds" -->
						<div class="buy-box" style="margin-top: 15px;">
							<el-form ref="ruleForm1" :hide-required-asterisk="true" size="mini" :model="form" label-width="60px">
								<div class="buy-item" style="display: flex; align-items: center;">
									<span class="buy-name1">{{detail.name}}</span>
									<div class="" style="position: relative;">
										<span class="iconfont icon-triangle-left sanjiao"></span>
										<span class="buy-code1">{{detail.code}}</span>
									</div>
									<span style="font-size:12px;">现价：</span>
									<span style="font-size:12px;color:#B12525;" :class="detail.hcrate < 0 ?'green price':detail.hcrate > 0 ?'red price':'price'">{{detail.nowPrice}}</span>
									<span style="font-size:12px;margin-left:10px">涨跌幅：</span>
									<span style="font-size:12px;color:#B12525;" :class="detail.hcrate < 0 ?'green price':detail.hcrate > 0 ?'red price':'price'">{{Number(detail.hcrate).toFixed(3)}}%</span>
									<!-- <div class="zi " style="margin-left: 5px;width: 23%;display: flex;align-items: center;">
										<span style="font-size: 10px;">子:</span>
										<el-select v-model="form.subaccountNumber" title="点击选择子账户" slot="prepend" placeholder="请选择">
											<el-option v-for="i in subaccountList" :key="i.subaccountNumber" :label="i.subaccountNumber" :value="i.subaccountNumber"></el-option>
										</el-select>
									</div> -->
								</div>
								<el-row class="buy-item">
									<el-col :span="12"></el-col>
									<el-col :span="12"></el-col>
								</el-row>
								<div>
									<div style="display: flex;">
										<el-form-item prop="buyNum" style="margin-bottom:10px;position: relative;">
											<el-input placeholder="最小买1手" v-model="form.buyNum" class="input-with-select">
												<el-select v-model="form.buyNum" title="点击选择手数" slot="prepend" placeholder="请选择">
													<el-option v-for="i in buyNumList" :key="i.value" :label="i.label" :value="i.value"></el-option>
												</el-select>
												<!-- <el-button slot="append">手</el-button> -->
											</el-input>
											<span style="position: absolute;right: 6px;top: 0px; font-size: 12px;">手</span>
										</el-form-item>
										<el-form-item prop="buyNum" style="margin-bottom:10px;position: relative;">
											<el-input placeholder="杠杆" v-model="form.lever" class="input-with-select">
												<el-select v-model="form.lever" title="点击选择杠杆" slot="prepend" placeholder="请选择">
													<el-option v-for="i in siteLeverList" :key="i.value" :label="i.label" :value="i.value"></el-option>
												</el-select>
												<!-- <el-button slot="append">倍</el-button> -->
											</el-input>
											<span style="position: absolute;right: 10px;top: 2px; font-size: 12px;">倍</span>
										</el-form-item>
									</div>
									<p class="prompt clearfix">
										<!-- <span class="pull-left">最小购买{{Number(settingInfo.buyMinNum)/100}}手</span> -->
										<!-- <span class="pull-right">最大可购买{{Number(settingInfo.buyMaxNum)/100}}手</span> -->
										<el-form-item label="方向" prop="buyType">
											<el-radio-group v-model="form.buyType">
												<el-radio label="买涨" value="0"></el-radio>
												<el-radio label="买跌" value="1"></el-radio>
											</el-radio-group>
										</el-form-item>
									</p>

									<el-row class="buy-item" v-if="!isqihuo">
										<!-- <el-col :span="8">{{form.buyNum * 100}}股</el-col> -->
										<!-- <el-col class="text-right" :span="16">市值：{{price}}元</el-col> -->
									</el-row>
									<el-row class="buy-item" v-if="isgupiao">
										<el-col :span="12">
											<span style="font-size: 13px;">保证金：</span>
											<span class="price">{{(price/ form.lever).toFixed(2) || 0}}</span>
										</el-col>
										<el-col :span="12">
											<sapn class="keyong">总手续费：</sapn>
											<span class="price">{{poundage?poundage:0}}</span>
											<el-tooltip class="item" effect="dark" :content="'总手续费 = 买入手续费（'+ (settingInfo.buyFee*100) + '%）+ 印花税（'+ (settingInfo.dutyFee*100) + '%） + 点差费（'+ (settingSpreadRate.spreadRate*100).toFixed(2) + '%）'"
											 placement="bottom-end">
												<!-- <i class="iconfont icon-xiangqing"></i> -->
											</el-tooltip>
											<!-- <span class="prompt pull-right">最小购买{{settingInfo.buyMinAmt}}元</span> -->
										</el-col>
									</el-row>
									<el-row class="buy-item" v-if="isgupiao">
										<el-col :span="24"></el-col>
									</el-row>
									<el-row class="buy-item" v-if="!isqihuo">
										<el-col :span="12">
											<sapn class="keyong">需要支付：</sapn>
											<span class="price">{{total?total:0}}</span>
										</el-col>
										<el-col :span="12">
											<span class="keyong">可用资金：{{$store.state.userInfo.enableAmt}}元</span>
										</el-col>
									</el-row>
									<el-row class="buy-item" v-if="isqihuo">
										<el-col :span="24">
											<sapn class="keyong">需要支付：</sapn>
											<span class="price">{{total?total:0}} {{futuresInfo.coinCode}}</span>
											≈
											<span class="price">{{cnyTotal?cnyTotal:0}} CNY</span>
										</el-col>
									</el-row>
									<p class="prompt clearfix" v-if="isqihuo">
										<!-- pull-right -->
										<span class="keyong">可用资金：{{this.$store.state.userInfo.userFuturesAmt}}元</span>
									</p>
									<el-row class="buy-item" style="font-size:10px;">
										<el-checkbox class="check-box" v-model="agree" name="type"></el-checkbox>我同意
										<a href="javascript:;" @click="tradeDialogVisible = true">《{{siteInfo.tradeAgreeTitle}}》</a>
									</el-row>
								</div>
							</el-form>
							<div>
								<el-button :loading="loadingBtn" class="buy-button ru" type="primary" @click="onFundsSubmit('ruleForm1')">入仓</el-button>
							</div>
						</div>
					</el-tab-pane>
					<!-- 分仓交易结束 -->
				</el-tabs>
				<!-- <div style="position: relative; width: 47.5%;margin-right: 10px;">
					<buy2 ref="buy2" :activeName="activeName"></buy2>
					<div class="fage">

					</div>
				</div> -->

			</div>

		</div>


		<div class="bottom-new-box ">
			<div class="scrollBoxCont" ref="marqueeBox">
				<div style="display: flex;" ref="marquee" v-for="(item,index) in transactionNoticeList" :key="index">
					<div class="bottom-left" style="width: 40%;">
						<div @click="selectDetails(item,index)" style="cursor: pointer; font-size: 12px;display: flex; justify-content: space-between;padding:6px 0;">
							<div class="news-list" style="display: flex;">
								<span style="width: 100px;" v-if="index < 1">【通知公告】</span>
								<span>•</span>
								<span>•</span>
								<p>{{item.artTitle}}</p>
							</div>
							<div class="showTime">{{item.addTime}}</div>
						</div>
					</div>
					<div class="bottom-right" style="width: 40%;margin-left: 95px;">
						<div @click="selectDetails(item,index)" style="cursor: pointer;font-size: 12px;display: flex; justify-content: space-between;padding:6px 0;">
							<div class="news-list" style="display: flex;">
								<span>•</span>
								<span>•</span>
								<p>{{item.artTitle}}</p>
							</div>
							<div class="showTime">{{item.addTime}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<BuyFutures :handleOptions3="handleOptions3" :futuresInfo="futuresInfo" ref="futuresDialog" />
	</div>
</template>

<script>
	import * as api from "../../../axios/api";
	import BuyFutures from "./futuresbuy-dialog";
	import comNone from '@/pages/transaction/index'
	import buy2 from "./buy2.vue";

	export default {
		components: {
			BuyFutures,
			buy2,
			comNone
		},
		props: {
			detailsCont: {

			},
			cutIndex: {

			},
			// settingInfo:{
			//     type:Object,
			//     default(){
			//        return {
			//             buyMinAmt:'',
			//             buyMinNum:'',
			//             buyMaxNum:'',
			//        }
			//     }
			// },
			handleOptions2: {
				type: Function,
				default: function() {},
			},
			handleOptions3: {
				type: Function,
				default: function() {},
			},
		},
		data() {
			return {
				siteInfo:{
					
				},
				activeName1:'first',
				tabPosition: "left",
				tradeDialogVisible: false, //
				loading: false,
				detail: "", // 当前股票的详情
				activeName: "first",
				tradeAgreeText: "",
				buyTypes: [
					{ label: '市价', value: '1' },
					{ label: '限价委托', value: '2' }
				],
				list: [{
						name: "卖五",
						price: "",
						volumes: "",
					},
					{
						name: "卖四",
						price: "",
						volumes: "",
					},
					{
						name: "卖三",
						price: "",
						volumes: "",
					},
					{
						name: "卖二",
						price: "",
						volumes: "",
					},
					{
						name: "卖一",
						price: "",
						volumes: "",
					},
				],
				
				cw: [
					{ label: '1/10', value: '10' },
					{ label: '1/4', value: '4' },
					{ label: '1/3', value: '3' },
					{ label: '1/2', value: '2' },
					{ label: '全仓', value: '1' }
				],
				selectCw: '',
				listbuy: [{
						name: "买一",
						price: "",
						volumes: "",
					},
					{
						name: "买二",
						price: "",
						volumes: "",
					},
					{
						name: "买三",
						price: "",
						volumes: "",
					},
					{
						name: "买四",
						price: "",
						volumes: "",
					},
					{
						name: "买五",
						price: "",
						volumes: "",
					},
				],
				buyNumList: [{
					label: "50手",
					value: 50,
				}, ],
				siteLeverList: [],
				form: {
					buyNum: "",
					buyType: 1,
				},
				rule: {
					buyNum: [{
						required: true,
						message: "请输入或选择买入手数",
						trigger: "blur",
					}, ],
					buyType: [{
						required: true,
						message: "请选择买卖方向",
						trigger: "blur",
					}, ],
				},
				ruleFunds: {
					subaccountNumber: [{
						required: true,
						message: "请选择子账户",
						trigger: "blur",
					}, ],
					buyNum: [{
						required: true,
						message: "请输入或选择买入手数",
						trigger: "blur",
					}, ],
					buyType: [{
						required: true,
						message: "请选择买卖方向",
						trigger: "blur",
					}, ],
				},

				settingInfo: {}, // 设置信息
				agree: true, // 协议
				buyNumber: 0, // 下单次数
				loadingBtn: false,
				futuresInfo: {}, // 期货信息
				settingSpreadRate: {
					spreadRate: 0,
				},
				isqihuo: false,
				isgupiao: false,
				exchangeNumber: "",
				subaccountList: {},
				pageNum: 1,
				newsList: [],
				width: 0,
				temi: null
			};
		},
		watch: {
			change(newVal, oldVal) {
				if (newVal !== oldVal) {
					this.getDetail(); // 分时数据
				}
				if (!newVal) {
					clearInterval(this.timer);
				}
			},
			
		},
		computed: {
			poundage() {
				//手续费= 买入手续费+印花税+点差费
				if (this.form.buyNum) {
					let payfee = (this.detail.nowPrice * this.form.buyNum * 100).toFixed(2);
					return (
						payfee * this.settingInfo.buyFee +
						payfee * this.settingInfo.dutyFee +
						payfee * this.settingSpreadRate.spreadRate
					).toFixed(2);
					//+ (payfee * this.settingInfo.dutyFee).toFixed(2) + (payfee * this.settingSpreadRate.spreadRate).toFixed(2)
				} else {
					return 0;
				}
			},
			gupiaoTotal() {
				if(this.form.buyType == 1) {
					return (this.detail.nowPrice * (this.form.buyNum || 0) * 100).toFixed(2)
				} else {
					return ((this.form.triggerPrice || 0) * (this.form.buyNum || 0) * 100).toFixed(2)
				}
			},
			total() {
				if (this.form.buyNum) {
					if (this.$route.query.code.indexOf("hf_") != -1) {
						return (
							(this.detail.depositAmt * this.form.buyNum) /
							this.form.lever
						).toFixed(2);
					} else if (
						this.$route.query.code.indexOf("sh") != -1 ||
						this.$route.query.code.indexOf("sz") != -1
					) {
						return (
							(this.detail.depositAmt * this.form.buyNum) /
							this.form.lever
						).toFixed(2);
					} else {
						if (
							this.settingSpreadRate == undefined ||
							this.settingSpreadRate.spreadRate == undefined
						) {
							this.settingSpreadRate.spreadRate = 0;
						}
						let payfee =
							(this.detail.nowPrice * this.form.buyNum * 100) / this.form.lever; //  this.form.lever
						return (
							payfee +
							payfee * this.settingInfo.buyFee +
							payfee * this.settingInfo.dutyFee +
							payfee * this.settingSpreadRate.spreadRate
						).toFixed(2);
					}
				} else {
					return 0;
				}
				// 需支付总价 = 现价 * 股（1手 = 100股）/ 杠杆倍数
			},
			cnyTotal() {
				// 价钱 * 汇率 转为 人民币
				return (this.total * this.exchangeNumber).toFixed(2);
			},
			price() {
				if (this.form.buyNum) {
					return (this.detail.nowPrice * this.form.buyNum * 100).toFixed(2);
				} else {
					return 0;
				}
				// 市值价 = 现价 * 股（1手 = 100股）
			},
			change() {
				return this.$route.query.code;
			},
		},
		created() {
			this.timer = setInterval(this.getDetail, 5000);
			setInterval(()=>{
				this.activeName1 =  window.activeName1 || 'first'
			},100)
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		mounted() {

			this.getDetail();
			this.getSettingInfo();
			this.getInfoSite();
			this.getUserSubaccount();
			this.getNoticeList();
			setTimeout(() => {
				this.runMarquee()
				// this.$on('changeActiveName',(res)=>{
				// 	console.log(res)
				// })
			}, 1000)
			// this.$nextTick(()=>{
			// 	// var scrollBoxDOM = document.getElementById('scrollBox')
			// 	var scrollBoxDOM = this.$refs
			// 		console.log(scrollBoxDOM.scrollBox,'333333333333333')
			// 	// setInterval(()=>{
			// 	// 	// scrollBoxDOM.style.transform = 'translateX(10px)'
			// 	// },1000)
			// })
		},
		beforeDestroy() {
			clearInterval(this.temi)
		},
		methods: {
			runMarquee() {
				// 获取文字 计算后宽度
				var width = this.$refs.marquee[0].getBoundingClientRect().width;
				var marquee = this.$refs.marqueeBox;
				var disx = 0; // 位移距离
				// console.log(width)
				// //设置位移
				this.temi = setInterval(() => {
					disx--; // disx-=1; 滚动步长
					if (-disx >= width) {
						disx = 10; // 如果位移超过文字宽度，则回到起点  marquee-list的margin值
					}
					// marquee.style.transform = 
					marquee.style.transform = 'translateX(' + disx + 'px)'
				}, 30) //滚动速度
			},
			async getNewsList(query) {
				// 获取资讯列表接口（交易大厅左侧小列表）

				var data = await api.getNewsList(query);
				if (data.status == 0) {
					// this.newsList = data.data.list;
					return data.data.list;
				}
			},
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
			selectCwFun (value) {
				this.selectCw = value
				// tradingAmount: 251842
				// userAmt: 645759.22
				// userFuturesAmt: 10856251.8604
				// userIndexAmt: 20838.9
				let {userAmt, enableAmt, tradingAmount} = this.$store.state.userInfo
				this.form.buyNum = Math.floor(userAmt / Number(value) / 100 / this.detail.nowPrice)
			},
			async selectDetails(item, index) {
				// 选择详情

				var data = await api.getNewsDetailList({
					id: item.id,
				});
				if (data.status == 0) {
					// this.optionalIndex = item.type
					var query = {
						pageNum: 1,
						pageSize: 15,
						type: item.type,
					};
					// this.newType = item.type
					// var newsList = await this.getNewsList(query);
					// this.switchData(newsList, "showTime");
					this.$emit('selectDetailsItem', data.data)
				}
				var data = await api.updateNewsViews({
					id: item.id,
				});
				if (data.status == 0) {}
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
			cut(type) {
				var code = this.$route.query.code
				this.activeName = type;
				this.$refs.buy2.activeName = type;
				if(type == 'first'){
					 api.findUserPositionByCode({
						stockCode: code
					}).then(data=>{
						if (data.status == 0) {
							this.$store.commit('setUserPositionData', data.data.list[0])
						}
					})
					
				}else{
					api.findUserFundsPositionByCode({
						fundsCode:code
					}).then(res=>{
						if (res.status == 0) {
							this.$store.commit('setUserPositionData', data.data.list[0])
						}
					})
				}
				
			},
			async queryExchange() {
				// 基币汇率
				let data = await api.queryExchange({
					coinCode: this.futuresInfo.coinCode,
				});
				if (data.status === 0) {
					// 成功
					this.exchangeNumber = data.data;
				} else {
					Toast(data.msg);
				}
			},
			async getDetail() {
				if (this.$route.query.code.indexOf("hf_") != -1) {
					// 期货
					this.isqihuo = true;
					this.isgupiao = false;
				} else if (
					this.$route.query.code.indexOf("sh") != -1 ||
					this.$route.query.code.indexOf("sz") != -1
				) {
					// 指数
					this.isqihuo = false;
					this.isgupiao = false;
				} else {
					// 股票
					this.isgupiao = true;
					this.isqihuo = false;
				}
				if (this.$route.query.futuresInfo != undefined) {
					this.futuresInfo = this.$route.query.futuresInfo;
					this.queryExchange(); // 获取当前基币汇率
				}
				let opts = {
					code: this.$route.query.code,
				};
				let data = await api.getSingleStock(opts);
				if (data.status === 0) {
					this.detail = data.data;
					// 卖
					this.list[0].price = data.data.sell5;
					this.list[1].price = data.data.sell4;
					this.list[2].price = data.data.sell3;
					this.list[3].price = data.data.sell2;
					this.list[4].price = data.data.sell1;
					this.list[0].volumes = data.data.sell5_num;
					this.list[1].volumes = data.data.sell4_num;
					this.list[2].volumes = data.data.sell3_num;
					this.list[3].volumes = data.data.sell2_num;
					this.list[4].volumes = data.data.sell1_num;
					// 买
					this.listbuy[0].price = data.data.buy1;
					this.listbuy[1].price = data.data.buy2;
					this.listbuy[2].price = data.data.buy3;
					this.listbuy[3].price = data.data.buy4;
					this.listbuy[4].price = data.data.buy5;
					this.listbuy[0].volumes = data.data.buy1_num;
					this.listbuy[1].volumes = data.data.buy2_num;
					this.listbuy[2].volumes = data.data.buy3_num;
					this.listbuy[3].volumes = data.data.buy4_num;
					this.listbuy[4].volumes = data.data.buy5_num;
					if (
						this.$route.query.code.indexOf("hf_") == -1 &&
						this.$route.query.code.indexOf("sh") == -1 &&
						this.$route.query.code.indexOf("sz") == -1
					) {
						this.findSpreadRateOne();
					}
				} else {
					this.$message.error(data.msg);
				}
			},
			async getInfoSite() {
				// 获取网站信息
				let result = await api.getInfoSite();
				if (result.status === 0) {
					this.siteInfo = result.data;
					this.tradeAgreeText = this.siteInfo.tradeAgreeText;
				} else {
					this.$message.error(result.msg);
				}
			},
			async getUserSubaccount() {
				// 用户操盘中子账户
				let result = await api.getUserSubaccount();
				if (result.status === 0) {
					if (result.data.list.length > 0) {
						this.subaccountList = result.data.list;
						if (
							this.$route.query.sub != undefined &&
							this.$route.query.sub != ""
						) {
							this.form.subaccountNumber = this.$route.query.sub;
						} else {
							this.form.subaccountNumber = this.subaccountList[0].subaccountNumber;
						}
					}
				} else {
					this.$message.error(result.msg);
				}
			},
			async findSpreadRateOne() {
				// 查询点差费率
				let opts = {
					applies: this.detail.hcrate, // 涨跌幅
					turnover: this.total, //成交额
					unitprice: this.detail.nowPrice, //股票单价
					code: this.$route.query.code,
				};
				let data = await api.findSpreadRateOne(opts);
				if (data.status === 0) {
					// 成功
					if (data.data != undefined) {
						this.settingSpreadRate = data.data;
					}
					// console.log(this.settingSpreadRate)
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
					// 杠杆倍数，如果登录并且有代理先走代理设置杠杆
					if (
						this.$store.state.userInfo !== undefined &&
						this.$store.state.userInfo !== null &&
						this.$store.state.userInfo.phone !== "" &&
						this.$store.state.userInfo.siteLever !== null
					) {
						this.form.lever = this.$store.state.userInfo.siteLever.split("/")[0];
						this.siteLeverList = [];
						for (
							let i = 0; i < this.$store.state.userInfo.siteLever.split("/").length; i++
						) {
							let val = this.$store.state.userInfo.siteLever.split("/")[i];
							let item = {
								label: val + "倍",
								value: val,
							};
							this.siteLeverList.push(item);
						}
					} else {
						this.form.lever = data.data.siteLever.split("/")[0];
						this.siteLeverList = [];
						for (let i = 0; i < data.data.siteLever.split("/").length; i++) {
							let val = data.data.siteLever.split("/")[i];
							let item = {
								label: val + "倍",
								value: val,
							};
							this.siteLeverList.push(item);
						}
					}

					this.buyNumList = [];
					for (let i = 0; i < 10; i++) {
						if (i === 0 || i % 2 === 1) {
							let val = data.data.buyMinNum * i + data.data.buyMinNum;
							let item = {
								label: val / 100 + "手",
								value: val / 100,
							};
							this.buyNumList.push(item);
						}
					}
				} else {
					this.$message.error(data.msg);
				}
			},
			async onSubmit(formName) {
				// 先判断是否登录
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						if (!this.$store.state.haslogin) {
							this.$store.state.loginIsShow = true;
							this.$message.error("请先登录");
							return;
						}

						if (!this.agree) {
							this.$message.error("阅读并同意注册协议才能下单");
							return;
						}
						var regisKong = /^\s*$/g;
						if (regisKong.test(this.form.buyNum)) {
							this.$message.error("请输入或选择买入手数");
							return
						}
						// if (regisKong.test(this.form.lever)) {

						// 	this.$message.error("请输入或选择杠杆");
						// 	return
						// }
						// if (regisKong.test(this.form.buyType)) {

						// 	this.$message.error("请选择买卖方向");
						// 	return
						// }

						this.loadingBtn = true;
						if (this.$route.query.code.indexOf("hf_") != -1) {
							//期货买入
							var qCode = this.$route.query
							let opts = {
								FuturesId: this.detail.id,
								buyNum: this.form.buyNum ? this.form.buyNum : 0,
								buyType: this.form.buyType === "买涨" ? 0 : 1,
								lever: this.form.lever ? this.form.lever : 0,
							};
							let data = await api.buyFutures(opts);
							if (data.status === 0) {
								this.buyNumber++;
								// this.handleOptions3(this.buyNumber)
								this.$message.success(data.data);
								this.getUserInfo(); // 刷新
								
								
								api.findUserFuturesPositionByCode({
									futuresGid: qCode.code
								}).then(data=>{
									if (data.status == 0) {
										this.$store.commit('setUserPositionData', data.data.list[0])
									}
								})
								
								
								
							} else {
								this.$message.error(data.msg);
							}
						} else if (
							this.$route.query.code.indexOf("sh") != -1 ||
							this.$route.query.code.indexOf("sz") != -1
						) {
							//指数买入
							var zCode = this.$router.query
							let opts = {
								indexId: this.detail.id,
								buyNum: this.form.buyNum ? this.form.buyNum : 0,
								buyType: this.form.buyType === "买涨" ? 0 : 1,
								lever: this.form.lever ? this.form.lever : 0,
							};
							this.loadingBtn = true;
							let data = await api.indexBuy(opts);
							if (data.status === 0) {
								this.buyNumber++;
								// this.handleOptions2(this.buyNumber)
								this.$message.success(data.data);
								this.getUserInfo(); // 刷新
								
								
								
								api.findUserIndexPositionByCode({
									indexGid: zCode.code
								}).then(data=>{
									console.log(data)
									if (data.status == 0) {
										this.$store.commit('setUserPositionData', data.data.list[0])
									}
								})
								
								
								
							} else {
								this.$message.error(data.msg);
							}
						} else {
							// 股票买入
							var gCode = this.$route.query
							let opts = {
								stockId: this.detail.id,
								buyNum: this.form.buyNum * 100 ? this.form.buyNum * 100 : 0,
								buyStatus: this.form.buyType,
								triggerPrice: this.form.buyType == 2 ? this.form.triggerPrice : undefined
							};
							let data = await api.buyStock(opts);
							if (data.status === 0) {
								this.buyNumber++;
								this.handleOptions2(this.buyNumber);
								this.getUserInfo();
								this.$message.success(data.data);
								
								
								
								var data = await api.findUserPositionByCode({
									stockCode: gCode.code
								})
								if (data.status == 0) {
								
									this.$store.commit('setUserPositionData', data.data.list[0])
								}
								
								
							} else {
								this.$message.error(data.msg);
							}
						}

						this.loadingBtn = false;
					}
				});
			},
			selectBuyTypeFun (value) {
				this.form.buyType = value
			},
			onFundsSubmit(formName) {
				// 先判断是否登录
				if (!this.$store.state.haslogin) {
					this.$store.state.loginIsShow = true;
					this.$message.error("请先登录");
					return;
				}
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						if (!this.agree) {
							this.$message.error("阅读并同意注册协议才能下单");
							return;
						}
						var regisKong = /^\s*$/g;
						if(regisKong.test(this.ruleFunds.softinputNavBar)){
							this.$message.error("请选择子账户");
							return
						}
						if (regisKong.test(this.form.buyNum)) {
							this.$message.error("请输入或选择买入手数");
							return
						}
						if (regisKong.test(this.form.lever)) {

							this.$message.error("请输入或选择杠杆");
							return
						}
						if (regisKong.test(this.form.buyType)) {

							this.$message.error("请选择买卖方向");
							return
						}
						this.loadingBtn = true;
						var grCode = this.$route.query
						// 股票买入
						let opts = {
							stockId: this.detail.id,
							buyNum: this.form.buyNum ? this.form.buyNum * 100 : 0,
							buyType: this.form.buyType === "买涨" ? 0 : 1,
							lever: this.form.lever,
							subaccountNumber: this.form.subaccountNumber,
						};
						
						
						let data = await api.buyFunds(opts);
						if (data.status === 0) {
							this.buyNumber++;
							this.handleOptions2(this.buyNumber);
							this.getUserInfo();
							this.$message.success(data.data);
							
							
							api.findUserFundsPositionByCode({
								fundsCode:code
							}).then(res=>{
								if (res.status == 0) {
									this.$store.commit('setUserPositionData', data.data.list[0])
								}
							})
							
							
						} else {
							this.$message.error(data.msg);
						}

						this.loadingBtn = false;
					}
				});
			},
			async getUserInfo() {
				// 获取用户信息
				let data = await api.getUserInfo();
				if (data.status === 0) {
					this.$store.state.userInfo = data.data;
				} else {
					this.$message.error(data.msg);
				}
			},
			async getOpation() {
				// 获取是不是已添加自选
				let opts = {
					code: this.$route.query.code,
				};
				let data = await api.isOption(opts);
				if (data.status === 0) {
					// 0 --> 未添加
					this.isOptionOpt = false;
				} else {
					this.isOptionOpt = true;
				}
			},
			agreeTrade() {
				// 同意注册协议协议
				this.agree = true;
				this.tradeDialogVisible = false;
			},
			toTransaction3(row, column, event) {
				row.nowPrice = this.detail.nowPrice;
				// 期货交易 先判断是否登录
				if (this.$store.state.haslogin) {
					if (+row.transState === 1) {
						this.futuresInfo = row;
						this.$refs.futuresDialog.DialogVisible = true;
					} else {
						this.$message.error("该期货暂不能交易!");
					}
				} else {
					this.$store.state.loginIsShow = true;
				}
			},
		},
	};
</script>
<style lang="less" scoped>
	/deep/ .el-checkbox__inner {
		width: 11px;
		height: 11px;
	}

	.fage {
		position: absolute;
		left: -15px;
		width: 1px;
		height: 157px;
		background-color: #ccc;
		opacity: 0.2;
		top: 50%;
		transform: translateY(-50%);
	}

	.red-bg {
		.sanjiao {
			position: absolute;
			color: #C11815;
			top: 4px;
			left: 4px;
			font-size: 10px;
		}

		.scrollBoxCont {
			display: flex;
			align-items: center;
			height: 100%;
		}

		.bottom-new-box {
			overflow: hidden;
			height: 29px;
			width: 100%;
			background-color: #E5E5E5;
			padding: 0 15px;
			font-size: 12px;
			display: flex;
			align-items: center;
		}

		.news-list {
			width: 100%;

			p {
				width: 90%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.bottom-right p {
				width: 80%;
			}
		}
	}

	.black-bg {
		.sanjiao {
			position: absolute;
			color: #C11815;
			top: 4px;
			left: 4px;
			font-size: 10px;
		}

		.scrollBoxCont {
			align-items: center;
			display: flex;
			height: 100%;
		}

		.bottom-new-box {
			overflow: hidden;
			height: 29px;
			width: 100%;
			background-color: #343434;
			padding: 0 15px;
			font-size: 12px;
			display: flex;
			align-items: center;
		}

		.news-list {
			width: 100%;

			p {
				width: 90%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.bottom-right p {
				width: 80%;
			}
		}
	}

	.black-bg .jiaoyi:hover {
		background: #09576d;
	}

	.red-bg .jiaoyi:hover {
		background: rgb(129, 14, 12);
	}

	/deep/ .el-tabs__nav-scroll {
		height: 25px;
	}

	.buy-box .buy-item[data-v-27e7503f] {
		// margin-bottom: 10px;
	}

	.el-form-item--mini.el-form-item,
	.el-form-item--small.el-form-item {
		margin: 0 !important;
	}

	/deep/ .el-form-item__content {
		margin: 0 30px 0 0 !important;
	}

	.buy-box-cont {
		margin-left: 20px;
		box-shadow: none !important;
	}

	.nowprice-box {
		height: 40px;
		line-height: 38px;
		color: #8b97b0;

		.price {
			font-size: 16px;
		}
	}

	.transaction-table .buy-table {
		/deep/ th.is-leaf {
			display: none;
		}
	}

	.buy-box {
		.buy-item {
			margin-bottom: 6px;

			.price {
				font-size: 16px;
			}
		}

		.prompt {
			font-size: 12px;
			color: #606266;
			margin-top: 10px;
		}

		.buy-name {
			font-size: 16px;
			color: #efbb53;
		}

		.buy-code {
			color: #4c5770;
			font-size: 12px;
			margin-left: 10px;
		}

		.buy-button {
			display: flex;
			justify-content: center;
			align-content: center;
			width: 92%;
			height: 30px;
			margin-bottom: 9px;
			line-height: 5px;
		}

		.check-box {
			margin-right: 10px;
		}

		/deep/ .el-form-item__label {
			color: #8b97b0;
			text-align: left;
		}

		// 涨
		/deep/ .el-radio__input.is-checked+.el-radio__label {
			color: #c11815;
		}

		/deep/ .el-radio__input.is-checked .el-radio__inner {
			border-color: #c11815;
			background: #c11815;
		}

		/deep/ .el-radio {
			color: #8b97b0;
		}
	}

	.dialog-iframe {
		.iframe-box {
			width: 100%;
			height: 460px;
		}

		.dialog-footer {
			//  height: 300px;
			margin-top: 20px;
		}
	}
	.quick-select {
		width: 240px;
    white-space: nowrap;
		.quick-btn {
			// padding: 4px 10px;
		}
	}
	.keyong {
		white-space: nowrap;
	}
</style>
