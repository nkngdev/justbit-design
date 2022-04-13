import {createRequestState, getRequestState, setRequestState} from "../plugins/utils";

export const state = () => ({
  apiRequests: {
    getJivoSite: createRequestState()
  },
  technical_work: false,
  jivosite: {widgetId: "", error: {}},
  captcha: {sitekey: "", module: ""}
});
export const getters = {
  getRequestState,
  getTechnicalWorkStatus: state => state.technical_work,
  getJivoSite: state => state.jivosite.widgetId,
  getCaptchaConf: state => state.captcha
};

export const mutations = {
  setRequestState,
  setWorkStatus: (state, status) => (state.technical_work = status),
  setJivoSite: (state, {widgetId, error}) => (state.jivosite = {widgetId, error}),
  setCaptchaSettings: (state, {captcha_public, captcha_module}) => {
    state.captcha = {
      sitekey: captcha_public,
      module: captcha_module
    };
  }
};

export const actions = {
  async updateSettings({commit}) {
    commit("setRequestState", {getJivoSite: "pending"});
    const res = await this.app.$rest
      .api("public/site/status/get", {})
      .then(r => r.data)
      .catch(error => {
        console.error("public/site/status/get", error);
        commit("setWorkStatus", true);
        commit("setJivoSite", {error});
        commit("setRequestState", {getJivoSite: "rejected"});
      });
    if (!res) {
      return null;
    }
    commit("setJivoSite", {widgetId: res.jivosite});
    commit("setCaptchaSettings", {captcha_module: res.captcha_module, captcha_public: res.captcha_public});
    commit("setRequestState", {getJivoSite: "success"});
    return {widgetId: res.jivosite};
  }
};
