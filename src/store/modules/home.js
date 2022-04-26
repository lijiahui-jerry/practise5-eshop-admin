import mockRequest from "@/utils/mockRequest";

const state = {
  list: {}
}

const mutations = {
  SET_DATA(state, list) {
    state.list = list
  }
}

const actions = {
  async getData({commit}) {
    let res = await mockRequest.get('/home/list')

    if (res.code === 200) {
      commit('SET_DATA', res.data)
    }
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
