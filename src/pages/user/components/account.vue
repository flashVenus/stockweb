<template>
	<div class="con-box account">
		<div class="header-top">
			<div class="account-all">
				<!-- <p class="title">
          账户总资产 <span>( 沪深账户 <i v-if="$store.state.productSetting.indexDisplay">+ 指数账户</i> <i
          v-if="$store.state.productSetting.futuresDisplay">+ 期货账户</i>)</span>
        </p>-->
				<div class="pull-right">
					<el-button class="cz" @click="toRechange()">充值</el-button>
					<el-button class="tx" @click="toWithdraw()">提现</el-button>
				</div>
				<div id="chart" style="width:400px;height:192px;position: relative;"></div>
				<!-- <p class="number">
        ¥-->
				<!-- <span v-if="$store.state.userInfo.accountType === 1">{{(Number($store.state.userInfo.userAmt) + Number($store.state.userInfo.userIndexAmt) + Number($store.state.userInfo.enableFuturesAmt)).toFixed(2)}}</span> -->
				<!-- <span v-if="$store.state.productSetting.indexDisplay && !$store.state.productSetting.futuresDisplay">{{(Number($store.state.userInfo.userAmt) + Number($store.state.userInfo.userIndexAmt)).toFixed(2)}}</span>
          <span v-else-if="!$store.state.productSetting.indexDisplay && $store.state.productSetting.futuresDisplay">{{(Number($store.state.userInfo.userAmt) + Number($store.state.userInfo.enableFuturesAmt)).toFixed(2)}}</span>
          <span v-else-if="!$store.state.productSetting.indexDisplay && !$store.state.productSetting.futuresDisplay">{{(Number($store.state.userInfo.userAmt)).toFixed(2)}}</span>
          <span v-else>{{(Number($store.state.userInfo.userAmt) + Number($store.state.userInfo.userIndexAmt) + Number($store.state.userInfo.userFuturesAmt)).toFixed(2)}}</span>
        </p>-->
			</div>

			<el-row class="box-account" :gutter="20">
				<!-- <el-row>
          <el-col class="progress-box" :span="24">
            <el-progress :text-inside="true" :stroke-width="10"
                         :percentage="$store.state.userInfo.userAmt/($store.state.userInfo.userAmt+$store.state.userInfo.userIndexAmt) * 100 > 100?100:$store.state.userInfo.userAmt/($store.state.userInfo.userAmt+$store.state.userInfo.userIndexAmt) * 100 > 100?$store.state.userInfo.userAmt/($store.state.userInfo.userAmt+$store.state.userInfo.userIndexAmt) * 100 > 100?100:$store.state.userInfo.userAmt/($store.state.userInfo.userAmt+$store.state.userInfo.userIndexAmt) * 100:100"></el-progress>
          </el-col>
        </el-row>-->

				<el-collapse v-model="accountActiveNames">
					<div class="count-r">
						<span class="line">
							（您的沪深账户强制平仓线为
							<span
								class="num">{{(($store.state.userInfo.enableAmt + $store.state.userInfo.allFreezAmt) * settingInfo.forceStopPercent).toFixed(2)}}</span>
							）
						</span>
					</div>
					<el-collapse-item title="沪深账户" name="1">
						<el-col :span="24">
							<el-row class="Assets-box" :gutter="20">
								<el-col :span="6">
									<div class="box box1">
										<i class="color3 iconfont icon-zijin1"></i>
										<p class="title">沪深总资金:</p>
										<p :class="refresh?'number heartBeat':'number'">
											￥{{$store.state.hide?'****':$store.state.userInfo.userAmt}}</p>
									</div>
								</el-col>
								<el-col :span="5">
									<div class="box box1">
										<i class="color3 iconfont icon-zijin1"></i>
										<p class="title">新股冻结保证金:</p>
										<p :class="refresh?'number heartBeat':'number'">
											￥{{shengoudj.djzj}}</p>
									</div>
								</el-col>
								<el-col :span="5">
									<div class="box box1">
										<i class="color1 iconfont icon-dongjiezijin"></i>
										<p class="title">沪深冻结保证金:</p>
										<p>
											<span
												class="number">￥{{$store.state.hide?'****':$store.state.userInfo.allFreezAmt}}</span>
										</p>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="box box1">
										<i class="color2 iconfont icon-keyongzijin"></i>
										<p class="title">沪深可用资金:</p>
										<p class="number">￥{{$store.state.hide?'****':$store.state.userInfo.enableAmt}}
										</p>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="box box1">
										<i class="color4 iconfont icon-yingkuixuanzhong"></i>
										<p class="title">沪深持仓总盈亏:</p>
										<p :class="refresh?'heartBeat':''">
											<span
												:class="$store.state.userInfo.allProfitAndLose>0?'red number':$store.state.userInfo.allProfitAndLose<0?'green number':'number'">￥{{$store.state.hide?'****':$store.state.userInfo.allProfitAndLose}}</span>
										</p>
									</div>
								</el-col>
							</el-row>
						</el-col>
					</el-collapse-item>
					<div class="count-r">
						<span class="line">
							（您的指数账户强制平仓线为
							<span
								class="num">{{(($store.state.userInfo.allIndexFreezAmt + $store.state.userInfo.enableIndexAmt) * indexSettingInfo.forceSellPercent).toFixed(2)}}</span>
							）
						</span>
					</div>
					<el-collapse-item v-show="$store.state.productSetting.indexDisplay" title="指数账户" name="2">
						<el-col :span="24">
							<el-row class="Assets-box" :gutter="20">
								<el-col :span="6">
									<div class="box box1">
										<i class="color3 iconfont icon-zijin1"></i>
										<p class="title">指数总资金:</p>
										<p :class="refresh?'number heartBeat':'number'">
											￥{{$store.state.hide?'****':$store.state.userInfo.userIndexAmt}}</p>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="box box1">
										<i class="color1 iconfont icon-dongjiezijin"></i>
										<p class="title">指数冻结保证金:</p>
										<p>
											<span
												class="number">￥{{$store.state.hide?'****':$store.state.userInfo.allIndexFreezAmt}}</span>
										</p>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="box box1">
										<i class="color2 iconfont icon-keyongzijin"></i>
										<p class="title">指数可用资金:</p>
										<p class="number">
											￥{{$store.state.hide?'****':$store.state.userInfo.enableIndexAmt}}</p>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="box box1">
										<i class="color4 iconfont icon-yingkuixuanzhong"></i>
										<p class="title">指数持仓总盈亏:</p>
										<p :class="refresh?'heartBeat':''">
											<span
												:class="$store.state.userInfo.allIndexProfitAndLose>0?'red number':$store.state.userInfo.allIndexProfitAndLose<0?'green number':'number'">￥{{$store.state.hide?'****':$store.state.userInfo.allIndexProfitAndLose}}</span>
										</p>
									</div>
								</el-col>
							</el-row>
						</el-col>
					</el-collapse-item>
					<div class="count-r">
						<span class="line">
							（您的期货账户强制平仓线为
							<span
								class="num">{{(($store.state.userInfo.allFuturesFreezAmt + $store.state.userInfo.enableFuturesAmt) ).toFixed(2)}}</span>
							）
						</span>
					</div>
					<el-collapse-item v-if="$store.state.productSetting.futuresDisplay" title="期货账户" name="3">
						<el-col :span="24">
							<el-row class="Assets-box" :gutter="20">
								<el-col :span="6">
									<div class="box box1">
										<i class="color3 iconfont icon-zijin1"></i>
										<p class="title">期货总资金:</p>
										<p :class="refresh?'number heartBeat':'number'">
											￥{{$store.state.hide?'****':$store.state.userInfo.userFuturesAmt}}</p>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="box box1">
										<i class="color1 iconfont icon-dongjiezijin"></i>
										<p class="title">期货冻结保证金:</p>
										<p>
											<span
												class="number">￥{{(($store.state.userInfo.allFuturesFreezAmt + $store.state.userInfo.enableFuturesAmt) * futuresSettingInfo.forceSellPercent).toFixed(2)}}</span>
										</p>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="box box1">
										<i class="color2 iconfont icon-keyongzijin"></i>
										<p class="title">期货可用资金:</p>
										<p class="number">
											￥{{$store.state.hide?'****':$store.state.userInfo.enableFuturesAmt}}</p>
									</div>
								</el-col>
								<el-col :span="6">
									<div class="box box1">
										<i class="color4 iconfont icon-yingkuixuanzhong"></i>
										<p class="title">期货持仓总盈亏:</p>
										<p :class="refresh?'heartBeat':''">
											<span
												:class="$store.state.userInfo.allFuturesProfitAndLose>0?'red number':$store.state.userInfo.allFuturesProfitAndLose<0?'green number':'number'">￥{{$store.state.hide?'****':$store.state.userInfo.allFuturesProfitAndLose}}</span>
										</p>
									</div>
								</el-col>
							</el-row>
						</el-col>
					</el-collapse-item>
				</el-collapse>
			</el-row>
			<el-row v-if="false">
				<el-col :span="12">
					<div class="box-btn text-center">
						<el-button type="primary" @click="toRechange()">充值</el-button>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="box-btn text-center">
						<el-button type="success" @click="toWithdraw()">提现</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<div class="info">
			<layout>
				<div class="info_l" slot="left">
					<div class="accicon iconfont icon-zhanghaoanquan"></div>
					<div class="accinfo">
						<div class="tit">账号信息</div>
						<div class="iteminfo">
							状态：
							<span class="info">
								<i v-if="$store.state.userInfo.isActive === 2" class="iconfont icon-duihao1"
									style="color: rgb(23, 183, 128);"></i>
								<i v-if="$store.state.userInfo.isActive === 3" class="iconfont icon-failure"></i>
								<i v-if="$store.state.userInfo.isActive === 0" class="iconfont icon-dengdai"></i>
							</span>
							<span v-if="$store.state.userInfo.isActive === 1" class="info">
								<i class="iconfont icon-dengdai"></i> 审核中
							</span>
						</div>
						<div class="iteminfo">手机号码：{{$store.state.userInfo.phone}}</div>
						<div v-if="$store.state.userInfo.isActive === 0">
							<el-col>
								<el-button class="btn-statue" type="primary" plain @click="toAuth">去实名认证</el-button>
							</el-col>
						</div>
						<div v-if="$store.state.userInfo.isActive === 1">
							<!-- <div v-if="$store.state.userInfo.isActive === 1"> -->
							<el-col>
								<span class="btn-statue"></span>
							</el-col>
						</div>
						<div v-if="$store.state.userInfo.isActive === 2">
							<div class="iteminfo">真实姓名：{{$store.state.userInfo.realName}}</div>
							<div class="iteminfo">
								身份证：
								<span class="info"
									v-if="$store.state.userInfo.isActive === 2">{{$store.state.userInfo.idCard}}</span>
							</div>
						</div>
						<div v-if="$store.state.userInfo.isActive === 3">
							<el-row>
								<el-col>
									<span class="name">失败原因</span>
									<span class="info">{{$store.state.userInfo.authMsg}}</span>
								</el-col>
							</el-row>
							<el-row>
								<el-col>
									<el-button class="btn-statue" type="primary" plain @click="toAuth">去重新认证</el-button>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>
				<div class="info_r" slot="right">
					<div class="bankicon iconfont icon-yinhangkazhanghu"></div>
					<div class="bankcardinfo">
						<div v-if="!hasBankNo">
							<span>
								<el-button class="btn-statue" type="primary" plain @click="toAddCard">去添加</el-button>
							</span>
						</div>
						<div v-if="hasBankNo">
							<div class="tit">银行卡信息</div>
							<div class="iteminfo">银行名称：{{$store.state.bankInfo.bankName}}</div>
							<div class="iteminfo">支行地址：{{$store.state.bankInfo.bankAddress}}</div>
							<div class="iteminfo">银行卡号：{{$store.state.bankInfo.bankNo}}</div>
						</div>
					</div>
				</div>
			</layout>
		</div>
	</div>
</template>

<script>
	import * as api from "../../../axios/api";
	import ChartBox from "./chart";
	import DetailTable from "./table/detail";
	import echarts from "echarts";
	import layout from "@/components/layout";
	// import DetailTable from './table/detail'

	export default {
		components: {
			ChartBox,
			DetailTable,
			layout,
		},
		props: {
			list: {
				type: Object,
				default() {
					return {
						list: [],
					};
				},
			},
			getData: {
				type: Function,
				default: function () { },
			},
			handleOptions: {
				type: Function,
				default: function () { },
			},
			refresh: {
				type: Boolean,
				default: function () { },
			},
		},
		data() {
			return {
				loading: false,
				activeName: "first",
				hasAuth: false, // 认证
				hasBankNo: false, // 银行卡
				settingInfo: {}, // 设置信息
				indexSettingInfo: {},
				futuresSettingInfo: {},
				bankInfo: {},
				accountActiveNames: ["1"],
				shengoudj:''
			};
		},
		watch: {},
		computed: {
			progressNnum() {
				if (this.$store.state.userInfo.userAmt !== 0) {
					return (
						(this.$store.state.userInfo.enableAmt /
							this.$store.state.userInfo.userAmt) *
						100
					);
				} else {
					return 0;
				}
			},
		},
		mounted() {
			// 防止数据为空
			var timing = setInterval(() => {

				this.drawLine();
				if (this.$store.state.userInfo.userAmt) {
					clearInterval(timing)
				}
			}, 500)


		},
		created() {
			this.getCardDetail();
			this.getSettingInfo();
			this.getIndexSetting();
			this.getFuturesSetting();
            this.getprice();
			if (this.$store.state.userInfo.isActive === 2) {
				this.hasAuth = true;
			}
			if (this.$store.state.bankInfo.bankNo) {
				this.hasBankNo = true;
			}
		},
		methods: {
			async getprice() {
				let opt = {};
				let data = await api.getprice(opt);
				this.shengoudj = data.data;
				console.log(this.shengoudj, "申购");
			},
			async drawLine() {
				var styleName = localStorage.getItem("styleName");
				var color = styleName == "red-bg" ? "#000" : "#fff";
				window.drawLine = this.drawLine;
				var data = "沪深账户：¥ " + this.$store.state.userInfo.userAmt;
				var data1 = "指数账户：¥ " + this.$store.state.userInfo.userIndexAmt;
				var data2 = "期货账户：¥ " + this.$store.state.userInfo.userFuturesAmt;

				var alldata = '￥' + (Number(this.$store.state.userInfo.userAmt) + Number(this.$store.state.userInfo.userIndexAmt) +
					Number(this.$store.state.userInfo.userFuturesAmt)).toFixed(2)
				// console.log(data);
				// 基于准备好的dom，初始化echarts实例
				let myChart = await this.$echarts.init(document.getElementById("chart"));
				// 绘制图表
				myChart.setOption({
					tooltip: {
						color: "#fff",
						trigger: "item",
						formatter: "{a} <br/>{b}: {c} ({d}%)",
					},
					legend: {
						// color:['#fff','#7266BA','#1557A0'],
						orient: "vertical",
						right: 0,
						top: 50,
						data: [data, data1, data2],
						textStyle: {
							fontSize: 10,
							color: color,
						},
					},
					title: {
						text: alldata,
						left: "13%",
						top: "55%",
						textStyle: {
							color: "green",
							fontSize: 12,
							align: "center",
						}
					},
					graphic: {
						type: "text",
						left: "13%",
						top: "35%",
						style: {
							text: "账户总资产",
							textAlign: "center",
							fill: color,
							fontSize: 18,
							fontWeight: 700,
						},
					},

					// color:['#00A358','#7266BA','#1557A0'],
					series: [{
						name: "访问来源",
						type: "pie",
						radius: ["80%", "90%"],
						center: ["25%", "50%"],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: "center",
						},
						color: ["#00A358", "#7266BA", "#1557A0"],
						emphasis: {
							label: {
								show: true,
								fontSize: "12",
								fontWeight: "bold",
								// center:['20%','20%']
							},
						},
						labelLine: {
							show: false,
						},
						data: [{
							value: this.$store.state.userInfo.userAmt,
							name: data
						},
						{
							value: this.$store.state.userInfo.userIndexAmt,
							name: data1
						},
						{
							value: this.$store.state.userInfo.userFuturesAmt,
							name: data2
						},
						],
						rich: {
							total: {
								fontSize: 35,
								fontFamily: "微软雅黑",
								color: "#454c5c",
							},
							active: {
								fontFamily: "微软雅黑",
								fontSize: 16,
								color: "#6c7a89",
								lineHeight: 30,
							},
						},
					},],
				});
			},

			async getSettingInfo() {
				// 网站设置信息
				let data = await api.getSetting();
				if (data.status === 0) {
					// 成功
					this.settingInfo = data.data;
					console.log(data);
				} else {
					this.$message.error(data.msg);
				}
			},
			async getIndexSetting() {
				// 网站设置信息 指数
				let data = await api.getIndexSetting();
				if (data.status === 0) {
					this.indexSettingInfo = data.data;
					console.log(data);
				} else {
					this.$message.error(data.msg);
				}
			},
			async getFuturesSetting() {
				// 网站设置信息 期货
				let data = await api.getFuturesSetting();
				if (data.status === 0) {
					this.futuresSettingInfo = data.data;
					console.log(data);
				} else {
					this.$message.error(data.msg);
				}
			},
			handleSizeChange(size) {
				this.handleOptions({
					pageSize: size
				});
				this.getData();
			},
			handleCurrentChange(page) {
				this.handleOptions({
					pageNum: page
				});
				this.getData();
			},
			toAuth() {
				// 去认证
				this.$router.push("/auth");
			},
			toAddCard() {
				// 去添加
				this.$router.push("/bank");
			},
			async getCardDetail() {
				// 获取银行卡信息
				let data = await api.getBankCard();
				if (data.status === 0) {
					this.$store.state.bankInfo = data.data;
					// this.bankInfo = data.data
					this.hasBankNo = true;
					console.log(data);
				} else {
					// this.$message.error(data.msg)
				}
			},
			toRechange() {
				// 充值
				this.$router.push("/recharge");
			},
			toWithdraw() {
				// 提现
				this.$router.push("/withdraw");
			},
		},
	};
</script>
<style lang="less" scoped>
	/deep/ .Assets-box .box .iconfont {
		font-size: 20px !important;
	}

	.box1 p {
		font-size: 12px !important;
	}

	.allmoney {
		position: relative;

		span {
			position: absolute;
			top: 0;
			left: 0;
		}
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
				// left: 10px;
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
			// font-size: 16px;
			line-height: 30px;

			span {
				// font-size: 12px;
				color: #777;
			}
		}

		.number {
			font-size: 22px;
			margin-top: 4px;
			text-shadow: 1px 2px 2px rgba(24, 24, 24, 0.3);
		}
	}
</style>