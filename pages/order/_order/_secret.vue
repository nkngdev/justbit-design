<template>
  <div class="ordered" style="min-height:70vh;">
    <div class="under-header">
      <div class="form-confirmation right-bg">
        <div class="left-bg">
          <div v-if="orderError" class="container">
            <div class="form-confirmation-manual-bloc">
              <div class="form-confirmation-manual-number">
                <h1>
                  {{ $t("page.user.order.error") }}
                </h1>
                <p>
                  {{ $t("page.user.order.order_id") }}
                  <span>#{{ $route.params.order }}</span>
                </p>
              </div>
            </div>
            <div class="form">
              <div class="padding-block-order" style="text-align: center;">
                <h4>{{ orderError }}</h4>
              </div>
            </div>
          </div>

          <div v-else class="container">
            <div class="form-order-header">
              <h1>
                {{ $t("page.user.order.title") }} <span class="header-blue-color">{{
                  $t("page.user.order." + order.status)
                }}</span>
              </h1>
            </div>

            <div class="form">
              <div v-if="load && order.status" class="">
                <div class="order-main-block ">
                  <div class="form-left-block">
                    <div class="form-left-block_header">
                      <p>Transfer details</p>
                    </div>
                    <div class="form-left-block_item">

                      <ul>
                        <li class="details-currency ">
                          <div class="detail-id">
                            ID:
                            <p>{{ $route.params.order }} </p>
                          </div>
                        </li>
                        <li class="details-currency">
                          <div>
                            <p>You Send, {{ order.route.from.name }}:</p>
                            <span>{{ order.inAmount }} {{ order.route.from.symbol }}</span>
                          </div>
                          <div class="details-currency_logo">
                            <img :src="$rest.urlImg(order.route.from.image).medium" :alt="order.route.from.name">
                          </div>
                        </li>
                        <li class="details-currency">
                          <div>
                            <p>You receive, {{ order.route.to.name }}:</p>
                            <span>{{ order.outAmount }} {{ order.route.to.symbol }}</span>
                          </div>
                          <div class="details-currency_logo">
                            <img :src="$rest.urlImg(order.route.to.image).medium" :alt="order.route.to.name">
                          </div>
                        </li>
                        <li v-for="val in order.fromValues" class="details-currency" :key="val.name + 'fromValues'">
                          <div>
                            <p>{{ val.name }}:</p>
                            <span>{{ val.value }}</span>
                          </div>
                        </li>
                        <li v-for="val in order.toValues" class="details-currency" :key="val.name + 'toValues'">
                          <div>
                            <p>{{ val.name }}:</p>
                            <span>{{ val.value }}</span>
                          </div>
                        </li>
                        <li v-for="val in order.routeValues" class="details-currency-from"
                            :key="val.name + 'routeValues'">
                          <div>
                            <p>{{ val.name }}:</p>
                            <span>{{ val.value }}</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="form-payment-block">
                    <div v-if="order.status === 'new' || order.status === 'waitPayment'" class="payment-data_header">
                      <div class="payment-data_date">
                        <p>{{ $t("page.user.order.actual_until") }}</p>
                        <span>{{ $moment(order.expiresAt).format("DD MMM YYYY, HH:mm") }}</span>
                      </div>
                      <div class="form-order-time-left">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" version="1.1"
                             xmlns="http://www.w3.org/2000/svg">
                          <circle r="14" cx="16" cy="16" fill="transparent" stroke="#E1E4ED"
                                  stroke-dasharray="87.96459430051421" stroke-width="4" stroke-dashoffset="0"/>
                          <circle r="14" cx="16" cy="16" fill="transparent" stroke="#4070F4"
                                  stroke-dasharray="87.96459430051421" stroke-width="4" :stroke-dashoffset="progressBar"
                                  transform="rotate(-90 16 16)"/>
                        </svg>
                        <div>
                          <p>{{ $t("page.user.order.time_left") }}</p>
                          <span>{{ time }}</span>
                        </div>
                      </div>

                    </div>
                    <div v-else class="payment-data_header">
                      <div class="payment-data_date">
                        <p>Order created at</p>
                        <span>{{ $moment(order.createdAt).format("DD MMM YYYY, HH:mm") }}</span>
                      </div>
                    </div>

                    <div class="payment-data_content ">
                      <component
                        :order="order"
                        :verifications-status="verificationsStatus"
                        :is="comps[order.status]"
                        @confirm="
                        changeOrder({
                          orderUID: $route.params.order,
                          orderSecret: $route.params.secret,
                          status: $event
                        })
                      "
                      />
                    </div>
                  </div>
                </div>
                <div v-if="order.status === 'new' || order.status === 'waitPayment'" class="order-footer-block">
                  <p>
                    To cancel the exchange, perform the following step:
                  </p>
                  <button class="btn btn-transparent"
                          @click="changeOrder({
                          orderUID: $route.params.order,
                          orderSecret: $route.params.secret,
                          status: 'deleted'
                        })"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div v-else class="padding-block-order">
                <loader/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";

import confirmation from "~/components/order/confirmation";
import waitPayment from "~/components/order/wait";
import hold from "~/components/order/hold";
import returned from "~/components/order/returned";
import deleted from "~/components/order/deleted";
import inProgress from "~/components/order/progress";
import errorPayout from "~/components/order/errorPayout";
import errorPayment from "~/components/order/errorPayout";
import done from "~/components/order/done";
import inProgressPayout from "~/components/order/inProgressPayout";
import {getRequestState, setRequestState} from "@/plugins/utils";

export default {
  data() {
    return {
      radiusProgressBarCircle: 14,
      orderError: null,
      val: true,
      timeout: "",
      comps: {
        waitPayment,
        deleted,
        inProgress,
        errorPayout,
        errorPayment,
        done,
        hold,
        returned,
        inProgressPayout,
        new: confirmation
      }
    };
  },
  computed: {
    ...mapGetters({
      order: "exchange/order",
      getRequestStateExchange: "exchange/getRequestState",
      verificationsStatus: "exchange/verificationsStatus",
      load: "exchange/load"
    }),
    progressBar() {
      const holePeriod = this.$moment(this.order.expiresAt).diff(this.order.createdAt) / 100
      let percenteLeft = (this.$moment(this.order.expiresAt).diff() / holePeriod);
      if ((this.val || !this.val) && percenteLeft < 0) percenteLeft = 0;
      const coeff = Math.PI * (this.radiusProgressBarCircle * 2);
      return (((100 - percenteLeft) / 100) * coeff).toFixed(2);
    },
    time() {
      const diff_ = this.$moment(this.order.expiresAt).diff();
      if ((this.val || !this.val) && diff_ >= 3600000) {
        const HH = Math.floor(this.$moment.duration(diff_).asHours());
        const timeLive = this.$moment(diff_).utc();
        return HH + ":" + timeLive.format("mm:ss");
      } else if ((this.val || !this.val) && diff_ >= 0) {
        const timeLive = this.$moment(diff_).utc();
        return timeLive.format("mm:ss");
      } else {
        return "00:00";
      }
    }
  },

  beforeDestroy() {
    this.$events.$off("ws/emit/updateOrder");
    clearTimeout(this.timeout);
  },
  created() {
    if (process.server)
      return null;

    if (!this.getRequestStateExchange("getOrder", "isPending")) {
      this.getOrder({
        type: "order",
        orderUID: this.$route.params.order,
        orderSecret: this.$route.params.secret,
        vuexActionV2: true
      })
        .catch(err => {
          if (err && err.message) {
            this.orderError = err.message;
          }
          this.orderError = "opps.. Error get order.";
        })
        .then();
    }
    this.checkTimeOut(false);
    this.$events.$on("ws/emit/updateOrder", param => {
      setTimeout(() => {
        if (param.order === this.order._id && !this.getRequestStateExchange("getOrder", "isPending")) {
          this.getOrder({
            type: "order",
            orderUID: this.$route.params.order,
            orderSecret: this.$route.params.secret
          })
            .catch(err => {
              if (err && err.message) {
                this.orderError = err.message;
              }
              this.orderError = "ops.. Error get order. Please try again.";
            })
            .then();
        }
      }, 100);
    });
  },
  methods: {
    ...mapActions({getOrder: "exchange/getOrder", changeOrder: "exchange/changeOrder"}),
    checkTimeOut(val) {
      if (this.min <= 0 && this.sec <= 0) {
        return clearTimeout(this.timeout);
      }
      this.val = val;
      this.timeout = setTimeout(() => this.checkTimeOut(!val), 500);
    }
  }
};
</script>
