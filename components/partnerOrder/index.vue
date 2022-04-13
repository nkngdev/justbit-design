<template>
  <div v-if="load" class="form form-payment-condition">
    <div class="form-wr">
      <div v-if="partnerOrder.status === 'done'" class="form-payment-condition--top text-center success">
        <p>Payment was Successful</p>
      </div>
      <div v-if="partnerOrder.status === 'new'" class="form-payment-condition--top text-center processing">
        <p>Payment Processing</p>
      </div>
      <div v-if="partnerOrder.status === 'errorPayment'" class="form-payment-condition--top text-center processing">
        <p>Payment is hold</p>
      </div>
      <div v-if="partnerOrder.status === 'returned'" class="form-payment-condition--top text-center refunded">
        <p>Payment Refunded</p>
      </div>
      <div v-if="partnerOrder.status === 'deleted'" class="form-payment-condition--top text-center deleted">
        <p>Payment Deleted</p>
      </div>
      <div class="form-payment-condition--main">
        <div class="form-payment-condition--main__top">
          <p class="title">
            <img :src="$rest.urlImg(partnerOrder.route.to.image).medium" alt="" />
            {{ partnerOrder.route.to.name }}
          </p>
          <ul>
            <li>
              To receive:
            </li>
            <li>
              <b>{{ partnerOrder.outAmount }} {{ partnerOrder.route.to.symbol }}</b>
            </li>
          </ul>
        </div>
        <div class="form-payment-condition--main__data">
          <ul>
            <li v-for="elTo in toValues" :key="elTo._id">
              <p>
                {{ elTo.name }}
                <span> {{ elTo.value }}</span>
              </p>
            </li>
            <li v-for="el in routeValues" :key="el._id">
              <p>
                {{ el.name }}
                <span> {{ el.value }}</span>
              </p>
            </li>
            <li class="total">
              <p>
                {{ $t("page.exchange.order.confirmation.total") }}:
                <span><b>{{ partnerOrder.inAmount }} USD</b></span>
              </p>
            </li>
          </ul>
        </div>
        <div class="text-center partner-margin">
          <nuxt-link :to="'/' + $root.$i18n.locale + '/user/partner-system'">
            <button class="btn btn-submit">
              Go back
            </button>
          </nuxt-link>
        </div>
      </div>
      <!--<div class="form-information-sent-received-wr">
        <div class="form-information-sent-received_img">
          <img :src="$rest.fsPath + $rest.unpackImg(partnerOrder.route.to.image.files).medium.url" alt="" />
        </div>
        <div class="form-information-sent-received_info ">
          <p class="title">{{ partnerOrder.route.to.name }}</p>
          <ul>
            <li>
              Amount(USD)
              <span>{{ partnerOrder.inAmount }} USD </span>
            </li>
                        <li>
                          {{ $t("page.exchange.order.confirmation.exchange") }}
                          <span>{{ partnerOrder.outAmount }} {{ partnerOrder.route.to.symbol }}</span>
                        </li>
          </ul>
          <div>
            {{ $t("page.exchange.order.confirmation.total") }}:
            <span>{{ partnerOrder.outAmount }} {{ partnerOrder.route.to.symbol }}</span>
          </div>
        </div>
      </div>-->
    </div>

  </div>

  <div v-else class="form">
    <loader v-if="!load" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  computed: {
    routeValues() {
      if (this.partnerOrder)
        return this.partnerOrder.routeValues.filter(item => {
          return item;
        });
    },
    toValues() {
      if (this.partnerOrder)
        return this.partnerOrder.toValues.filter(item => {
          return item;
        });
    },
    ...mapGetters({partnerOrder: "exchangePartner/getPartnerOrder", load: "exchangePartner/getLoad"})
  },
  created() {
    this.getPartnerOrder({
      orderUID: this.$route.params.partnerOrder,
      orderSecret: this.$route.params.secret
    });
  },
  methods: {
    ...mapActions({
      getPartnerOrder: "exchangePartner/getPartnerOrder"
    })
  }
};
</script>
<style>
.partner-margin {
  margin: 15px;
}
</style>
