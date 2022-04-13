<template>
  <div class="form-confirmation__bottom--verification"  v-if="order.route.from.verification">
    <p>
      Check and confirm your payment data:
    </p>
    <verif-modal
      v-if="show_verif"
      :currency-id="order.route.from._id"
      :text="order.route.from.verificationText"
      :data-verification="order.fromValues ? String(order.fromValues.map(d => d.value).join(' ')) : ''"
      @close="
        checkFullVerif();
        show_verif = false;
      "
    />
    <verif-modal
      v-if="show_verif2"
      :currency-id="null"
      :text="order.route.verificationText"
      :data-verification="userData || ''"
      @close="
        checkFullVerif();
        show_verif2 = false;
      "
    />

    <div
      v-if="order.route.from.verification"
      :class="{
        'go-to-verif': !verifications.verificationCurrency.status,
        'success-verif': verifications.verificationCurrency.status === 'approve'
      }"
      class="form-confirmation__bottom--verification__item"
    >
      <div>
        <img src="~assets/img/dollar.svg" alt="dollar" />
<!--                <img src="~assets/img/doc-green.svg" alt="doc" />-->

<!--        <p>{{ $t("page.exchange.order.confirmation.verification") }}:</p>-->
        <span> {{ order.route.from.name }} {{ order.route.from.symbol }} </span>
      </div>
      <p v-if="!verifications.verificationCurrency.status">
        <a @click="show_verif = true">{{ $t("page.exchange.order.confirmation.passVerification") }}</a>
      </p>
      <p v-else-if="verifications.verificationCurrency.status === 'pending'">
        {{ $t("page.exchange.order.confirmation.inProcess") }} <img src="~assets/img/proces.svg" alt="proces" />
      </p>
      <p v-else-if="verifications.verificationCurrency.status === 'approve'">
        {{ $t("page.exchange.order.confirmation.success") }} <img src="~assets/img/trip.svg" alt="trip" />
      </p>
    </div>

    <div
      v-if="order.route.verification"
      :class="{
        'go-to-verif': !verifications.verificationUser.status,
        'success-verif': verifications.verificationUser.status === 'approve'
      }"
      class="form-confirmation__bottom--verification__item"
    >
      <div>
        <img v-if="verifications.verificationUser.status === 'approve'" src="~assets/img/doc-green.svg" alt="doc" />
        <img v-else src="~assets/img/doc.svg" alt="doc" />
<!--        <p>{{ $t("page.exchange.order.confirmation.verification") }}:</p>-->
        <span>{{ $t("page.exchange.order.confirmation.personalVerification") }} </span>
      </div>
      <p v-if="!verifications.verificationUser.status">
        <a @click="show_verif2 = true">{{ $t("page.exchange.order.confirmation.passVerification") }}</a>
      </p>
      <p v-else-if="verifications.verificationUser.status === 'pending'">
       {{ $t("page.exchange.order.confirmation.inProcess") }} <img src="~assets/img/proces.svg" alt="proces" />
      </p>
      <p v-else-if="verifications.verificationUser.status === 'approve'">
        {{ $t("page.exchange.order.confirmation.success") }} <img src="~assets/img/trip.svg" alt="trip" />
      </p>
    </div>
  </div>
</template>

<script>
import verifModal from "~/components/modals/verif";

export default {
  components: {verifModal},
  props: {
    order: {
      type: Object,
      required: true
    },
    verificationsStatus: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timerUpdate: null,
      show_verif: false,
      show_verif2: false,
      fullVerifed: false,
      verifications: {
        verificationCurrency: {
          status: null
        },
        verificationUser: {
          status: null
        }
      }
    };
  },
  computed: {
    userData() {
      let userData = [];
      for (let i1 in this.order.routeValues) {
        if (
          this.order.routeValues.hasOwnProperty(i1) &&
          this.order.routeValues[i1] &&
          this.order.routeValues[i1].value &&
          this.order.routeValues[i1].value.length > 0
        ) {
          if (
            ["first name", "last name", "name", "surname", "patronymic", "имя", "фамилия", "отчество"].indexOf(
              (this.order.routeValues[i1].name || "").toLowerCase()
            ) !== -1
          )
            userData.push(this.order.routeValues[i1].value);
        }
      }
      return userData.join(" ");
    }
  },
  created() {
    if (this.verificationsStatus) {
      this.verifications.verificationCurrency = this.verificationsStatus.verificationCurrency || {status: null};
      this.verifications.verificationUser = this.verificationsStatus.verificationUser || {status: null};
    }
    if (!this.order.route.from.verification && !this.order.route.verification) {
      this.updateStatusVerif(true);
      return;
    }
    if (!this.order.route.verification || this.verifications.verificationUser.status === "approve") {
      if (!this.order.route.from.verification || this.verifications.verificationCurrency.status === "approve") {
        this.updateStatusVerif(true);
      }
    }

    this.timerUpdate = setInterval(() => {
      if (this.order.route.from.verification || this.order.route.verification) {
        this.checkFullVerif();
      }
    }, 8000);
  },
  beforeDestroy() {
    clearInterval(this.timerUpdate);
  },
  methods: {
    updateStatusVerif(newStatus) {
      if (this.fullVerifed !== newStatus && newStatus) {
        this.$emit("updateVerifStatus", true);
        clearInterval(this.timerUpdate);
      }
    },
    checkFullVerif() {
      this.$rest
        .api("public/exchanger/verification/find/by-order-id", {orderId: this.order._id})
        .then(r => r.data.verifications)
        .then(verifications => {
          // console.log(verifications)
          this.verifications.verificationCurrency = verifications.verificationCurrency || {status: null};
          this.verifications.verificationUser = verifications.verificationUser || {status: null};
          if (!this.order.route.from.verification && !this.order.route.verification) {
            this.updateStatusVerif(true);
            return;
          }
          if (this.order.route.verification && this.verifications.verificationUser.status !== "approve") {
            return;
          }
          if (this.order.route.from.verification && this.verifications.verificationCurrency.status !== "approve") {
            return;
          }

          this.updateStatusVerif(true);
        });
    }
  }
};
</script>
