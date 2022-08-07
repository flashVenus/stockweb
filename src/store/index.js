import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	userInfo: {
		phone: ''
	},
	bankInfo: {}, // 银行卡信息
	siteInfo: {}, // 站点基本信息发
	loginIsShow: false,
	haslogin: false, // 是否登录
	hide: false, // 数字隐藏显示
	userMenu: '2-1',
	productSetting: null,
	systemColor: '',
	userPositionData: {}, //卖出数据
	language: ''
}



export default new Vuex.Store({
	state,
	mutations: {
		setSystemColor(state, data) {
			state.systemColor = data
		},
		setUserInfo(state,data){
			state.userInfo = data
		},
		setLanguage(state, data) {
			state.language = data
		},
		setUserPositionData(state, data) {
			if (!data) {
				state.userPositionData = {}
				return
			}
			state.userPositionData = data

		},
		showMQPanel (state, v) {
			console.log(state.userInfo, state.user)
			if (_MEIQIA) {
			  if (v && !state.mqPanelShow) {
				_MEIQIA('metadata', {
				  comment: state.userInfo.nickName, // 备注
				  name: state.userInfo.realName, // 名字
				  tel: state.userInfo.phone // 电话
				});
				_MEIQIA('showPanel')
				state.mqPanelShow = true
			  } else {
				_MEIQIA('hidePanel')
				state.mqPanelShow = false
			  }
			}
		  }
	}
})
