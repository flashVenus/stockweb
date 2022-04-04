<template>
	<div>
		<div class="wrapper buy-table" style="display:flex;width: 100%;">

			<el-tabs v-model="activeName" class="buy-box-cont">
				<!-- 两融交易开始 -->
				<el-tab-pane name="first">
					<!-- 买 -->
					<div class="buy-box" :style="windowWidth <= 1200?'':'margin-top: 10px;'">
						<el-form style="" ref="ruleForm" :hide-required-asterisk="true" size="mini" :model="form" label-width="60px">
							<div class="buy-item" style="position: relative;top: -9999999px;">
								<span class="buy-name1">{{detail.name}}</span>
								<span class="buy-code1">{{detail.code}}</span>
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
										<el-form-item prop="buyNum" style="margin-bottom:10px;margin-right: 10px;">
											<el-input placeholder="手数 最小购买1手" :readonly="true" :value="userPositionData.orderNum / 100 || 0" class v-if="isgupiao">
											</el-input>
											<el-input placeholder="手数 最小购买1手" :readonly="true" :value="userPositionData.orderNum || 0" class v-if="!isgupiao">
											</el-input>
											<span style="position: absolute;right: 10px;top: 2px; font-size: 12px;">手</span>
										</el-form-item>
										<el-form-item prop="buyNum" style="margin-bottom:10px;">
											<el-input placeholder="杠杆" v-model="form.lever || 0" :readonly="true" class="input-with-select">
											</el-input>
											<span style="position: absolute;right: 10px;top: 2px; font-size: 12px;">倍</span>
										</el-form-item>
									</div>
									<p class="prompt clearfix">
										<el-form-item label="方向" prop="buyType">
											<el-radio-group v-model="form.buyType">
												<el-radio label="买涨" :disabled="true" value="0"></el-radio>
												<el-radio label="买跌" :disabled="true" value="1"></el-radio>
											</el-radio-group>
										</el-form-item>
									</p>

									<el-row class="buy-item" v-if="!isqihuo">
									</el-row>
									<el-row class="buy-item" v-if="isgupiao">
										<el-col :span="12">
											<span class="keyong">现价：</span>
											<span class="price">{{userPositionData.now_price || 0}}</span>
										</el-col>
										<el-col :span="12">
											<span class="keyong">总手续费：</span>
											<span class="price">{{userPositionData.orderFee || 0}}</span>
											<el-tooltip class="item" effect="dark" :content="'总手续费 = 卖入手续费（'+ (settingInfo.buyFee*100) + '%）+ 印花税（'+ (settingInfo.dutyFee*100) + '%） + 点差费（'+ (settingSpreadRate.spreadRate*100).toFixed(2) + '%）' || 0"
											 placement="bottom-end">
												<!-- <i class="iconfont icon-xiangqing"></i> -->
											</el-tooltip>
											<!-- <span class="prompt pull-right">最小购买{{settingInfo.buyMinAmt}}元</span> -->
										</el-col>
										</el-col>
									</el-row>
									<el-row class="buy-item" v-if="isgupiao">
										<el-col :span="24"></el-col>
									</el-row>
									<el-row class="buy-item" v-if="!isqihuo">
										<el-col :span="12">
											<span class="keyong">浮动盈亏：</span>
											<span class="price">{{userPositionData.profitAndLose || 0}}</span>
										</el-col>
										<el-col :span="12">
											<span class="keyong">总盈亏：{{userPositionData.allProfitAndLose || 0}}元</span>
										</el-col>
									</el-row>
									<el-row class="buy-item" v-if="isqihuo">
										<el-col :span="24">
											<div style="display: flex; font-size: 10px;">
												<span class="keyong">浮动盈亏：</span>
												<span v-if="userPositionData.nowPrice === 0">-</span>
												<span v-else :class="userPositionData.profitAndLose<0?'green bounceIn':'red bounceIn'">{{userPositionData.profitAndLose}}
													<i class="jibi-code">{{userPositionData.coinCode || 0}}</i></span>
												<!-- <span class="price">{{total?total:0}} {{futuresInfo.coinCode || 0}}</span> -->
												<p class="exchange-p">≈{{(userPositionData.profitAndLose*userPositionData.coinRate).toFixed(2) || 0}} CNY</p>
												<!-- <span class="price">{{cnyTotal?cnyTotal:0 || 0}} CNY</span> -->
											</div>
										</el-col>
										<el-col :span="24">
										<p class="prompt clearfix" style="display: flex;font-size: 10px;" v-if="isqihuo">
											<!-- <span class="keyong">总盈亏：{{userPositionData.allProfitAndLos || 0}}元</span> -->
											<!-- :class="changeTextClass[scope.$index] === true?'heartBeat':''" -->
											<p style="display: flex;font-size: 10px;color: #606266;">
												<!-- :class="userPositionData.allProfitAndLose<0?'green bounceIn':'red bounceIn'" -->
												<span>总盈亏：</span>
												<span v-if="userPositionData.nowPrice === 0">-</span>
												<span v-else >{{userPositionData.allProfitAndLose}}
												<i class="jibi-code">{{userPositionData.coinCode || 0}}</i></span>
												<span class="exchange-p">≈{{(userPositionData.allProfitAndLose*userPositionData.coinRate).toFixed(2) || 0}} CNY</span>
											</p>
										
										</p>
										</el-col>
									</el-row>
									
									<el-row class="buy-item" style="font-size:10px;">
										<el-checkbox class="check-box" v-model="agree" name="type"></el-checkbox>我同意
										<a href="javascript:;" @click="tradeDialogVisible = true">《{{siteInfo.tradeAgreeTitle || ''}}》</a>
									</el-row>
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
							<div>
								<el-button :loading="loadingBtn" class="buy-button" type="primary" @click="onSubmit('ruleForm1')">出仓</el-button>
							</div>
						</div>
					</div>
				</el-tab-pane>


				<!-- 两融交易结束 -->

				<!-- 分仓交易开始 -->
				<el-tab-pane name="two">
					<!-- 买 -->
					<div class="buy-box" style="margin-top: 15px;">
						<el-form style="position: relative;overflow: hidden;" ref="ruleForm" :hide-required-asterisk="true" size="mini"
						 :model="form" label-width="60px">
							<div class="buy-item" style="position: relative;top: -9999999px;">
								<span class="buy-name1">{{detail.name}}</span>
								<span class="buy-code1">{{detail.code}}</span>
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
										<el-form-item prop="buyNum" style="margin-bottom:10px;margin-right: 10px;">
											<el-input placeholder="手数 最小购买1手" :readonly="true" :value="userPositionData.orderNum / 100 || 0" class>
											</el-input>
											<span style="position: absolute;right: 10px;top: 2px; font-size: 12px;">手</span>
										</el-form-item>
										<el-form-item prop="buyNum" style="margin-bottom:10px;">
											<el-input placeholder="杠杆" v-model="form.lever || 0" :readonly="true" class="input-with-select">
											</el-input>
											<span style="position: absolute;right: 10px;top: 2px; font-size: 12px;">倍</span>
										</el-form-item>
									</div>
									<p class="prompt clearfix">
										<el-form-item label="方向" prop="buyType">
											<el-radio-group v-model="form.buyType">
												<el-radio label="买涨" :disabled="true" value="0"></el-radio>
												<el-radio label="买跌" :disabled="true" value="1"></el-radio>
											</el-radio-group>
										</el-form-item>
									</p>

									<el-row class="buy-item" v-if="!isqihuo">
									</el-row>
									<el-row class="buy-item" v-if="isgupiao">
										<el-col :span="12">
											<span class="keyong">现价：</span>
											<span class="price">{{userPositionData.now_price || 0}}</span>
										</el-col>
										<el-col :span="12">
											<span class="keyong">总手续费：</span>
											<span class="price">{{userPositionData.orderFee || 0}}</span>
											<el-tooltip class="item" effect="dark" :content="'总手续费 = 卖入手续费（'+ (settingInfo.buyFee*100) + '%）+ 印花税（'+ (settingInfo.dutyFee*100) + '%） + 点差费（'+ (settingSpreadRate.spreadRate*100).toFixed(2) + '%）' || 0"
											 placement="bottom-end">
												<!-- <i class="iconfont icon-xiangqing"></i> -->
											</el-tooltip>
											<!-- <span class="prompt pull-right">最小购买{{settingInfo.buyMinAmt}}元</span> -->
										</el-col>
										</el-col>
									</el-row>
									<el-row class="buy-item" v-if="isgupiao">
										<el-col :span="24"></el-col>
									</el-row>
									<el-row class="buy-item" v-if="!isqihuo">
										<el-col :span="12">
											<span class="keyong">浮动盈亏：</span>
											<span class="price">{{userPositionData.profitAndLose || 0}}</span>
										</el-col>
										<el-col :span="12">
											<span class="keyong">总盈亏：{{userPositionData.allProfitAndLose || 0}}元</span>
										</el-col>
									</el-row>
									<el-row class="buy-item" v-if="isqihuo">
										<el-col :span="24">
											<span class="keyong">总盈亏：</span>
											<span class="price">{{total?total:0}} {{futuresInfo.coinCode || 0}}</span>
											≈
											<span class="price">{{cnyTotal?cnyTotal:0 || 0}} CNY</span>
										</el-col>
									</el-row>
									<p class="prompt clearfix" v-if="isqihuo">
										<span class="keyong">总盈亏：{{userPositionData.allProfitAndLose || 0}}元</span>
									</p>
									<el-row class="buy-item" style="font-size:10px;">
										<el-checkbox class="check-box" v-model="agree" name="type"></el-checkbox>我同意
										<a href="javascript:;" @click="tradeDialogVisible = true">《{{siteInfo.tradeAgreeTitle}}》</a>
									</el-row>
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
							<div>
								<el-button :loading="loadingBtn" class="buy-button" type="primary" @click="onFundsSubmit('ruleForm1')">出仓</el-button>
							</div>
						</div>
					</div>
				</el-tab-pane>


				<!-- 分仓交易结束 -->
			</el-tabs>
		</div>
		<BuyFutures :handleOptions3="handleOptions3" :futuresInfo="futuresInfo" ref="futuresDialog" />
	</div>
</template>

<script>
	import * as api from "../../../axios/api";
	import BuyFutures from "./futuresbuy-dialog";
	import {
		mapState
	} from "vuex";
	import {
		setTimeout
	} from 'timers';
	export default {
		components: {
			BuyFutures,
		},
		props: {

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
				orderNum: "",
				windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
				tabPosition: "left",
				tradeDialogVisible: false, //
				loading: false,
				detail: "", // 当前股票的详情
				activeName: "first",
				tradeAgreeText: "",
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
					buyType: "",
					lever: "",
					subaccountNumber: "",
				},
				rule: {
					buyNum: [{
						required: true,
						message: "请输入或选择卖入手数",
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
				agree: false, // 协议
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
				siteInfo: {

				}
			};
		},
		watch: {
			userPositionData(newVal, oldVal) {
				// console.log(newVal,ol)
				this.form.buyType = newVal.orderDirection

				// this.form = Object.assign({},this.form.buyType)
			},
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
			...mapState({
				userPositionData: (state) => state.userPositionData,
			}),
			// buyType(){
			//     return userPositionData.orderDirection == '买涨'?0:''
			// },
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
			setInterval(() => {
				this.windowWidth = document.documentElement.clientWidth; //实时屏幕宽度
			}, 500)
			this.timer = setInterval(this.getDetail, 5000);
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		mounted() {
			this.getDetail();
			this.getSettingInfo();
			this.getInfoSite();
			this.getUserSubaccount();
			setTimeout(() => {
				this.form.buyType = this.userPositionData.orderDirection
			}, 500)
		},
		methods: {

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
					this.isqihuo = true;
					this.isgupiao = false;
				} else if (
					this.$route.query.code.indexOf("sh") != -1 ||
					this.$route.query.code.indexOf("sz") != -1
				) {
					this.isqihuo = false;
					this.isgupiao = false;
				} else {
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
			// 两融交易出仓
			async onSubmit(formName) {
				// 先判断是否登录
				if (!this.$store.state.haslogin) {
					this.$store.state.loginIsShow = true;
					this.$message.error("请先登录");
					return;
				}

				if (!this.agree) {
					this.$message.error("阅读并同意注册协议才能出仓");
					return;
				}
				if (!this.userPositionData.positionSn) {
					this.$message.error("该股票未入仓，不能出仓");

					return;
				}
				this.loadingBtn = true;
				let opts = {
					positionSn: this.userPositionData.positionSn,
				};
				console.log(this.$route.query.code.indexOf("hf_"))
				if (this.$route.query.code.indexOf("hf_") != -1) {
					//期货出仓
					let data = await api.sellFutures(opts);
					if (data.status === 0) {
						this.$message.success(data.msg)
						// this.buyNumber++;
						// // this.handleOptions3(this.buyNumber)
						// this.$message.success(data.data);
						// this.getUserInfo(); // 刷新
					} else {
						this.$message.error(data.msg);
					}
				} else if (
					this.$route.query.code.indexOf("sh") != -1 ||
					this.$route.query.code.indexOf("sz") != -1
				) {
					//指数出仓
					this.loadingBtn = true;
					let data = await api.sellIndex(opts);
					if (data.status === 0) {
						this.$message.success(data.msg)
					} else {
						this.$message.error(data.msg);
					}
				} else {
					// 股票出仓
					let data = await api.sell(opts);
					if (data.status === 0) {
						this.$message.success(data.msg)
					} else {
						this.$message.error(data.msg);
					}
				}

				this.loadingBtn = false;
			},
			// 分仓交易出仓
			async onFundsSubmit(formName) {

				// 先判断是否登录
				if (!this.$store.state.haslogin) {
					this.$store.state.loginIsShow = true;
					this.$message.error("请先登录");
					return;
				}
				if (!this.agree) {
					this.$message.error("阅读并同意注册协议才能出仓");
					return;
				}


				if (!this.userPositionData.positionSn) {
					this.$message.error("该股票未入仓，不能出仓");

					return;
				}
				this.loadingBtn = true;
				let opt = {
					positionSn: this.userPositionData.positionSn,
				};

				let data = await api.sellFunds(opt);
				if (data.status === 0) {
					console.log(data);
					// this.hasChangeSell++
					// this.handleOptions(this.hasChangeSell)
					// this.getList()
					// this.getUserInfo()
					this.$message.success(data.msg)
				} else {
					this.$message.error(data.msg);
				}
				this.loadingBtn = false;



				// let data = await api.sell(opt);
				// if (data.status === 0) {
				// 	 //  this.$message({
				// 	 //          message: '出仓成功',
				// 	 //          type: 'success'
				// 	 // });
				// 	// this.hasChangeSell++
				// 	// this.handleOptions(this.hasChangeSell)
				// 	// this.getList()
				// 	// this.getUserInfo()
				// 	this.$message.success(data.msg)
				// } else {
				// 	this.$message.error(data.msg);
				// }






















				// this.$confirm("您确定要出仓吗?", "提示", {
				// 		confirmButtonText: "确定",
				// 		cancelButtonText: "取消",
				// 		type: "warning",
				// 	})
				// 	.then(async () => {

				// 	})
				// 	.catch(() => {
				// 		this.$message({
				// 			type: "info",
				// 			message: "已取消出仓",
				// 		});
				// 	});





				// 先判断是否登录
				//   if (!this.$store.state.haslogin) {
				//     this.$store.state.loginIsShow = true;
				//     this.$message.error("请先登录");
				//     return;
				//   }

				//   if (!this.agree) {
				//     this.$message.error("阅读并同意注册协议才能下单");
				//     return;
				//   }
				//   this.loadingBtn = true;

				//   // 股票买入
				//   let opts = {
				//     stockId: this.detail.id,
				//     buyNum: this.form.buyNum ? this.form.buyNum * 100 : 0,
				//     buyType: this.form.buyType === "买涨" ? 0 : 1,
				//     lever: this.form.lever,
				//     subaccountNumber: this.form.subaccountNumber,
				//   };
				//   let data = await api.buyFunds(opts);
				//   if (data.status === 0) {
				//     this.buyNumber++;
				//     this.handleOptions2(this.buyNumber);
				//     this.getUserInfo();
				//     this.$message.success(data.data);
				//   } else {
				//     this.$message.error(data.msg);
				//   }

				//   this.loadingBtn = false;
				// },
				// async getUserInfo() {
				//   // 获取用户信息
				//   let data = await api.getUserInfo();
				//   if (data.status === 0) {
				//     this.$store.state.userInfo = data.data;
				//   } else {
				//     this.$message.error(data.msg);
				//   }
				// },
				// async getOpation() {
				//   // 获取是不是已添加自选
				//   let opts = {
				//     code: this.$route.query.code,
				//   };
				//   let data = await api.isOption(opts);
				//   if (data.status === 0) {
				//     // 0 --> 未添加
				//     this.isOptionOpt = false;
				//   } else {
				//     this.isOptionOpt = true;
				//   }
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
	/deep/ .el-tabs__nav-scroll {
		height: 25px;
	}

	/deep/ .el-checkbox__inner::after {
		box-sizing: content-box;
		content: "";
		border: 1px solid #FFF;
		border-left: 0;
		border-top: 0;
		height: 6px;
		left: 3px;
		position: absolute;
		top: 1px;
	}

	// .buy-box .buy-item[data-v-27e7503f] {
	// 	margin-bottom: 10px;
	// }

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
			width: 100%;
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
</style>
