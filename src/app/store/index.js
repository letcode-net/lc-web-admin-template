/** 状态配置 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: null,
		user: {
			id: null,
			username: "",
			bickname: "",
			avatar: ""
		},
		menus: [],
		activeMenu: {
			pid: null,
			mid: '',
		}
	},
	mutations: {
		// 更新登录数据
		SET_LOGIN_DATA: (state, loginData) => {
			// 访问令牌
			state.token = loginData.token
			sessionStorage.token = state.token;

			// 用户信息
			state.user.id = loginData.user.id;
			state.user.username = loginData.user.username;
			state.user.nickname = loginData.user.nickname;
			state.user.avatar = loginData.user.avatar;
			sessionStorage.user = JSON.stringify(state.user);

			// 用户菜单
			state.menus.splice(0);
            loginData.menus.forEach(menu => {
                state.menus.push(menu);
			});
			sessionStorage.menus = JSON.stringify(state.menus);

			// 菜单选择状态
            state.activeMenu.pid = loginData.menus[0].id;
			state.activeMenu.mid = loginData.menus[0].children[0].url;
			sessionStorage.activeMenu = JSON.stringify(state.activeMenu);
		},
		// 用户选择菜单
		CHOOSE_MENU: (state, menu) => {
			state.activeMenu.pid = menu.pid;
            state.activeMenu.mid = menu.mid;
            sessionStorage.activeMenu = JSON.stringify(state.activeMenu);
		},
		// 退出登录
		LOGOUT: (state) => {
			// 清理用户信息
			state.user.id = null;
			state.user.username = '';
			state.user.nickname = '';
			state.user.avatar = '';
			sessionStorage.removeItem('user');

			// 清理令牌
			state.user.token = '';
			sessionStorage.removeItem('token');

			// 清理菜单信息
			state.menus.splice(0);
			state.activeMenu.pid = null;
			state.activeMenu.mid = '';
			sessionStorage.removeItem('menus');
			sessionStorage.removeItem('activeMenu');
		},
		LOAD_SESSION_SOTRAGE: (state) => {
			// 还原令牌
			if (!state.token) {
				state.token = sessionStorage.token;
			}

			// 还原用户信息
			if (!state.user.id) {
				let sessionUser = sessionStorage.user;
				if (sessionUser && (sessionUser != undefined) && (sessionUser != 'undefined')) {
					sessionUser = JSON.parse(sessionUser);
					state.user.id = sessionUser.id;
					state.user.username = sessionUser.username;
					state.user.nickname = sessionUser.nickname;
					state.user.avatar = sessionUser.avatar;
				}
			}

			// 还原菜单
			if(state.menus.length == 0){
				let sessionMenus = sessionStorage.menus;
                if(sessionMenus && sessionMenus != 'undefined'){
                    sessionMenus = JSON.parse(sessionMenus);
                    sessionMenus.forEach(menu => {
                        state.menus.push(menu);
                    });
                }
			}

			// 还原菜单选项
			if(!state.activeMenu.pid){
				let activeMenu = sessionStorage.activeMenu;
				if(activeMenu && activeMenu != 'undefined'){
					activeMenu = JSON.parse(activeMenu);
					state.activeMenu.pid = activeMenu.pid;
					state.activeMenu.mid = activeMenu.mid;
				}
			}
		},
	},

	actions: {
		// 登录成功
		LoginSuccess({ commit }, loginData) {
			commit('SET_LOGIN_DATA', loginData);
		},

		// 用户选择菜单
		ChooseMenu({ commit }, menu) {
			commit('CHOOSE_MENU', menu);
		},

		// 退出系统
		LogOut({ commit }) {
			commit('LOGOUT', []);
		},

		// 加载本地缓存
		LoadSessionStorage({ commit }) {
			commit('LOAD_SESSION_SOTRAGE', []);
		}
	},
	getters: {
		token: state => state.token,
		user: state => state.user,
		menus: state => state.menus,
		activeMenu: state => state.activeMenu
	}
})

export default store