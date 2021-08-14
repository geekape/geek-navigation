import Vuex from "vuex";

const store = new Vuex.Store({
  state: {
    category: [],
    seletedMenuParentId: '',
    seletedMenuId: '',
  },

  getters: {

  },

  mutations: {
    saveCategory(state, payload) {
      localStorage.setItem('category', JSON.stringify(payload))
      state.category = payload
    },
    saveSeletedId(state, payload) {
      state.seletedMenuParentId = payload?.parentId
      state.seletedMenuId = payload?.id
    }
  },

  actions: {
  }
});


// 需要返回一个函数
export default () => store;

