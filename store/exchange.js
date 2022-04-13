import {createRequestState, getRequestState, setRequestState} from "../plugins/utils";

export const state = () => ({
  apiRequests: {
    getOrder: createRequestState()
  },
  info: null,
  load: true,
  errorData: "",
  order: {},
  verificationsStatus: {},
  favoriteRates: []
});

export const getters = {
  getRequestState,
  info: state => state.info,
  load: state => state.load,
  errorData: state => state.errorData,
  favoriteRates: state => state.favoriteRates,
  order: state => state.order,
  verificationsStatus: state => state.verificationsStatus
};

export const mutations = {
  setRequestState,
  info: (state, data) => (state.info = data),
  errorData: (state, error) => (state.errorData = error),
  load: (state, load) => (state.load = load),
  favoriteRates: (state, data) => (state.favoriteRates = data),
  order: (state, data) => (state.order = data),
  verificationsStatus: (state, verificationsStatus) => (state.verificationsStatus = verificationsStatus)
};

export const actions = {
  async routes({commit, dispatch}) {
    commit("load", false);
    const apiResult = await this.app.$rest
      .api("public/exchanger/route/get")
      .then(r => r.data)
      .catch(error => {
        return dispatch(
          "notify/add",
          {
            type: "plain",
            message: error.message,
            code: error.errorCode
          },
          {root: true}
        );
      });
    commit("load", true);
    if (apiResult) {
      let routesIsShow = apiResult.routes.filter(element => element.isShowWeb === true);
      commit("info", routesIsShow);
      return routesIsShow;
    }
    return null;
  },
  async favRoutes({commit, dispatch}) {
    commit("load", false);
    const apiResult = await this.app.$rest
      .api("public/exchanger/favorite/get")
      .then(r => r.data)
      .catch(error => {
        dispatch(
          "notify/add",
          {
            type: "error",
            message: error.message
          },
          {root: true}
        );
        return null;
      });
    commit("load", true);
    if (apiResult) {
      commit("favoriteRates", apiResult.rates);
    }
  },
  async createOrder({commit, dispatch}, {routeId, fromValues, toValues, routeValues, email, agreement, amount, lang, vuexActionV2}) {
    commit("load", false);
    const partner = localStorage.getItem("partner");
    const apiResult = await this.app.$rest
      .api("public/exchanger/order/create", {
        routeId,
        fromValues,
        toValues,
        routeValues,
        email,
        agreement,
        amount,
        lang,
        partner: partner || undefined
      })
      .then(r => r.data)
      .catch(error => {
        if (!vuexActionV2) {
          return dispatch(
            "notify/add",
            {
              type: "error",
              message: error.message
            },
            {root: true}
          );
        }
        commit("load", true);
        return Promise.reject(error);
      });
    commit("load", true);
    if (apiResult) {
      return apiResult;
    }
    return false;
  },
  async getOrder({commit, dispatch}, {type, orderUID, orderSecret, vuexActionV2}) {
    commit("setRequestState", {getOrder: "pending"});
    commit("load", false);
    const apiResult = await this.app.$rest
      .api("public/exchanger/order/get", {
        type,
        orderUID,
        orderSecret
      })
      .then(r => r.data)
      .catch(error => {
        commit("setRequestState", {getOrder: "rejected"});
        if (!vuexActionV2) {
          dispatch(
            "notify/add",
            {
              type: "error",
              message: error.message
            },
            {root: true}
          );
          return null;
        }
        commit("load", true);
        return Promise.reject(error);
      });
    commit("load", true);

    if (apiResult) {
      commit("setRequestState", {getOrder: "success"});

      if (
        apiResult.order.route.from.paymentDetails &&
        apiResult.order.route.from.paymentDetails.merchant &&
        apiResult.order.route.from.paymentDetails.merchant.template
      )
        apiResult.order.route.from.paymentDetails.merchant.template = JSON.parse(
          apiResult.order.route.from.paymentDetails.merchant.template,
          function (key, value) {
            if (typeof value === "string" && value.startsWith("/Function(") && value.endsWith(")/")) {
              value = value.substring(10, value.length - 2);
              return eval("( function " + value + ")");
            }
            if (key === "type") {
              return eval(value);
            }
            return value;
          }
        );

      commit("verificationsStatus", apiResult.verifications || {});
      commit("order", apiResult.order);
    }
  },
  async changeOrder({commit, dispatch}, {orderUID, orderSecret, status}) {
    commit("load", false);
    await this.app.$rest
      .api("public/exchanger/order/update-status", {orderUID, orderSecret, status})
      .then(r => r.data)
      .catch(error => {
        dispatch(
          "notify/add",
          {
            type: "error",
            message: error.message
          },
          {root: true}
        );
        return null;
      });
    dispatch("getOrder", {orderSecret, orderUID});
  }
};
