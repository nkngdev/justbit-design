<template>
  <form v-if="info" action="#" class="form">
    <div class="form-v2-wr">
      <div class="form-v2">
        <div class="receive">
          <div class="padding-block">
            <div class="form--title ">
              <h4>{{ $t("page.main.from.title") }}</h4>
              <div class="" v-if="currentRoute && currentRoute.from">
                <p v-if="currentRoute.from.min && currentRoute.from.min !== '0'">
                  {{ $t("page.main.from.min") + "&nbsp;" }}
                  <span>{{ fixedNumber("ceil", currentRoute.from.decimal, currentRoute.from.min) }} </span>
                </p>
                <p
                  v-if="
                  currentRoute.from.min &&
                    currentRoute.from.min !== '0' &&
                    currentRoute.from.max &&
                    currentRoute.from.max !== '0'
                "
                >
                  &nbsp;-&nbsp;
                </p>
                <p v-if="currentRoute.from.max && currentRoute.from.max !== '0'">
                  {{ $t("page.main.from.max") + "&nbsp;" }}
                  <span> {{ fixedNumber("floor", currentRoute.from.decimal, currentRoute.from.max) }} </span>
                </p>
                <img src="~assets/img/arr.svg" alt/>

              </div>

            </div>

            <div class="form-v2--input">
              <input
                v-model="val1"
                :style="{color: val1 === 'Неверные данные' ? 'red' : ''}"
                type="number"
                placeholder="0.00"
                @input="correctTo"
              />
              <img v-if="from.image" :alt="from.name" :src="$rest.urlImg(from.image).small"/>

            </div>
          </div>

          <div class="currency--choice">
            <ul>
              <li>
                <a :class="{active: symbolFrom === ''}" @click="symbolFrom = ''">{{ $t("page.main.from.all") }}</a>
              </li>
              <li>
                <a :class="{active: symbolFrom === 'USD'}" @click="symbolFrom = 'USD'">USD</a>
              </li>
              <li>
                <a :class="{active: symbolFrom === 'EUR'}" @click="symbolFrom = 'EUR'">EUR</a>
              </li>
              <li>
                <a :class="{active: symbolFrom === 'RUB'}" @click="symbolFrom = 'RUB'">RUB</a>
              </li>
              <li>
                <a :class="{active: symbolFrom === 'UAH'}" @click="symbolFrom = 'UAH'">UAH</a>
              </li>
              <!--              <li v-for="sym in fromSymbolList" :key="sym">-->
              <!--                <a :class="{active: symbolFrom === sym}" @click="symbolFrom = sym">{{ sym }}</a>-->
              <!--              </li>-->
            </ul>
          </div>
          <div class="form-v2__currency--list padding-block">
            <ul>
              <li v-for="ro in fromList" :key="ro.routeId" @click="from = ro.from">
                <a :class="{active: from && ro.from && from.xml === ro.from.xml}">
                  <span class="cur--logo">
                    <img :alt="ro.from.name" :src="$rest.urlImg(ro.from.image).small"/>
                  </span>
                  <p>{{ ro.from.name + " " + ro.from.symbol }}</p>
                  <span class="cur--check">
                    <img
                      v-if="from && ro.from && from.xml === ro.from.xml"
                      src="~assets/img/tick-inside-circle.svg"
                      alt="+"
                    />
                  </span>
                </a>
              </li>
            </ul>
          </div>

        </div>
        <div class="give">
          <div class="padding-block">

          <div class="form--title">
            <h4>{{ $t("page.main.to.title") }}</h4>
            <div>
              <p
                v-if="currentRoute && currentRoute.rate && currentRoute.rate.amount"
                :style="{color: limitAmount ? 'red' : ''}"
              >
                {{ $t("page.main.to.reserve") + "&nbsp;" }}
                <span>{{ fixedNumber("floor", currentRoute.to.decimal, currentRoute.rate.amount) }} </span>
              </p>
              <img src="~assets/img/arr.svg" alt/>

            </div>
          </div>
          <div v-if="!matchedRoute.routeId" class="form-v2--input">
            <input placeholder="0.00" disabled="disabled"/>
          </div>
          <div v-else class="form-v2--input">
            <input
              v-model="val2"
              :style="{color: limitAmount ? 'red' : ''}"
              type="number"
              placeholder="0.00"
              @input="correctFrom"
            />
            <img v-if="to.image" :alt="to.name" :src="$rest.urlImg(to.image).small"/>
          </div>
          </div>
          <div class="currency--choice">
            <ul>
              <li>
                <a :class="{active: symbolTo === ''}" @click="symbolTo = ''">{{ $t("page.main.to.all") }}</a>
              </li>
              <li>
                <a :class="{active: symbolTo === 'USD'}" @click="symbolTo = 'USD'">USD</a>
              </li>
              <li>
                <a :class="{active: symbolTo === 'EUR'}" @click="symbolTo = 'EUR'">EUR</a>
              </li>
              <li>
                <a :class="{active: symbolTo === 'RUB'}" @click="symbolTo = 'RUB'">RUB</a>
              </li>
              <li>
                <a :class="{active: symbolTo === 'UAH'}" @click="symbolTo = 'UAH'">UAH</a>
              </li>
              <!--              <li v-for="sym in toSymbolList" :key="sym">-->
              <!--                <a :class="{active: symbolTo === sym}" @click="symbolTo = sym">{{ sym }}</a>-->
              <!--              </li>-->
            </ul>
          </div>
          <div class="form-v2__currency--list padding-block">
            <ul>
              <li v-for="ro in toList" :key="ro.routeId" @click="to = ro.to">
                <a :class="{active: to && ro.to && to.xml === ro.to.xml}">
                  <span class="cur--logo">
                    <img :alt="ro.to.name" :src="$rest.urlImg(ro.to.image).small"/>
                  </span>
                  <p>
                    {{ ro.to.name + " " + ro.to.symbol }}
                    <span class="cur--sum"> {{ ro.rate.amount }} {{ ro.to.symbol }}</span>
                  </p>

                  <span class="cur--check">
                    <img
                      v-if="to && ro.to && to.xml === ro.to.xml"
                      src="~assets/img/tick-inside-circle.svg"
                      alt="+"
                    />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="!matchedRoute.routeId" class="dataInput">
          <div class="form--title">
            <h4>{{ $t("page.main.details.title") }}</h4>
            <img src="~assets/img/arr.svg" alt/>
          </div>
          <div>
            <div class="help_block">
              <span class="file_icon">
                <img src="~assets/img/exchange.svg" alt="Money"/>
              </span>
              <h3>{{ $t("page.main.details.pleaseSelectRoute") }}</h3>
              <p>{{ $t("page.main.details.select_p_1") }}</p>
              <p>{{ $t("page.main.details.select_p_2") }}</p>
              <span class="arrow_icon">
            <img src="~assets/img/arr.svg" alt/>
              </span>
            </div>
          </div>
        </div>
        <div v-else-if="!loadRouteGetOne" class="dataInput">
          <div class="form--title">
            <h4>{{ $t("page.main.details.title") }}</h4>
            <img src="~assets/img/arr.svg" alt/>
          </div>
          <div>
            <div class="help_block">
              <span class="file_icon">
                <loader :responsive="true" width="100" height="100"/>
              </span>
              <h3>{{ $t("page.main.details.pleaseWait") }}</h3>
              <p>{{ $t("page.main.details.loading_p_1") }}</p>
              <p>{{ $t("page.main.details.loading_p_2") }}</p>
            </div>
          </div>
        </div>
        <div v-else-if="errorloadRouteGetOne" class="dataInput">
          <div class="form--title">
            <h4>{{ $t("page.main.details.title") }}</h4>
            <img src="~assets/img/arr.svg" alt/>
          </div>
          <div>
            <div class="help_block">
              <h3>{{ $t("page.main.details.errorRoute") }}</h3>
              <p>{{ $t("page.main.details.error_p_1") }}</p>
              <p>{{ $t("page.main.details.error_p_2") }}</p>
            </div>
          </div>
        </div>
        <div v-else class="dataInput">
          <div class="form--title">
            <h4>{{ $t("page.main.details.title") }}</h4>
            <div>
              <p>
                {{ $t("page.main.to.rate") }}
                <span v-if="rateIn > 10">{{ Number((+rateIn || 1).toFixed(2)) }}:</span>
                <span v-else-if="rateIn > 1">
                  {{ Number((+rateIn || 1).toFixed(3)) }}:
                </span>
                <span v-else>{{ Number((+rateIn || 1).toFixed(4)) }}:</span>
                <span v-if="rateOut > 10">{{ Number((+rateOut || 1).toFixed(2)) }}</span>
                <span v-else-if="rateOut > 1">
                  {{ Number((+rateOut || 1).toFixed(3)) }}
                </span>
                <span v-else>{{ Number((+rateOut || 1).toFixed(4)) }}</span>
              </p>
              <!--              <p>-->
              <!--                Резерв:-->
              <!--                <span>{{ currentRoute.rate.amount }}</span>-->
              <!--                <span>{{ currentRoute.to.symbol }}</span>-->
              <!--              </p>-->
              <img src="~assets/img/arr.svg" alt/>
            </div>
          </div>
          <div class="dataInput--info">
            <ul>
              <li>
                <div class="dataInput--info__item">
                  <span v-if="currentRoute.from.image" class="data--logo">
                    <img :src="$rest.urlImg(currentRoute.from.image).small" alt/>
                  </span>
                  <p class="data--name">
                    {{ currentRoute.from.name }}
                    <span class="data--sum">{{ val1 || 0 }} {{ currentRoute.from.symbol }}</span>
                  </p>

                  <span class="data--img">
                   <img src="~assets/img/arr.svg" alt/>
                  </span>
                </div>
              </li>
              <li>
                <div class="dataInput--info__item">
                  <span v-if="currentRoute.to.image" class="data--logo">
                    <img :src="$rest.urlImg(currentRoute.to.image).small" alt/>
                  </span>
                  <p class="data--name">
                    {{ currentRoute.to.name }}
                    <span class="data--sum">{{ val2 || 0 }} {{ currentRoute.to.symbol }}</span>
                  </p>

                  <span class="data-down data--img">
                 <img src="~assets/img/arr.svg" alt/>
                  </span>
                </div>
              </li>
            </ul>

          </div>
          <p v-if="currentRoute.from.verification" style="color: #4bb56b;padding-bottom: 10px;">
            {{ $t("page.main.details.needVerifCurrency") + " " }}
            {{ currentRoute.from.name + " " + currentRoute.from.symbol }}
          </p>
          <p
            v-for="instruction in instructions"
            :key="instruction._id"
            class="form-attention"
            v-html="instruction.content"
          />
          <div class="dataInput--inputs">
            <h4 class="dataInput--titleSub">
              {{ $t("page.main.details.enter_form") }}
            </h4>
            <div v-for="field in currentRoute.from.fields" :key="field.id" class="form-v2--input-enter-form">
              <input
                v-model="fromValues[field._id]"
                :style="{
                  border: !fromValues[field._id] || fromValues[field._id].match(field.regexp) ? '' : '1px solid red'
                }"
                :placeholder="field.name"
                type="text"
              />
              <img :src="$rest.urlImg(currentRoute.from.image).small" alt="wallet"/>
            </div>
            <div v-for="field in currentRoute.to.fields" :key="field.id" class="form-v2--input-enter-form">
              <!--              <span>{{ field.name }}</span>-->
              <input
                v-model="toValues[field._id]"
                :style="{
                  border: !toValues[field._id] || toValues[field._id].match(field.regexp) ? '' : '1px solid red'
                }"
                :placeholder="field.name"
                type="text"
              />
              <img :src="$rest.urlImg(currentRoute.to.image).small" alt="wallet"/>
            </div>
            <div v-for="field in currentRoute.fields" :key="field.id" class="form-v2--input-enter-form">
              <input
                v-model="routeValues[field._id]"
                :style="{
                  border: !routeValues[field._id] || routeValues[field._id].match(field.regexp) ? '' : '1px solid red'
                }"
                :placeholder="field.name"
                type="text"
              />
              <!--              <img src="~assets/img/mail.png" alt="mail" />-->
              <img/>
            </div>
            <div class="dataInput--label">
              <input id="cbx" v-model="agree" type="checkbox"/>

              <label for="cbx">
                {{ $t("page.main.details.agree") }}
                <p>&ensp;</p>
                <nuxt-link :to="'/' + $root.$i18n.locale + '/rules/'">
                  {{ $t("page.main.details.agree_link") }}
                </nuxt-link>
                .
              </label>

            </div>
            <loader v-if="!load" :responsive="true" width="100" height="100"/>

            <button
              v-else
              :style="{opacity: currentRoute.routeId ? 1 : 0.5}"
              class="btn btn-submit btn-submitForm"
              @click.prevent="from && to && currentRoute.routeId && create()"
            >
              {{ $t("page.main.details.submit") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import {BigNumber} from "bignumber.js";

export default {
  props: {
    isWidget: {
      type: Boolean,
      default: false
    },
    widgetFrom: {type: String, default: () => ""},
    widgetTo: {type: String, default: () => ""},
    widgetAmount: {type: [String, Number], default: () => ""},
    widgetWidth: {type: [String, Number], default: () => ""}
  },
  data() {
    return {
      loadRouteGetOne: false,
      errorloadRouteGetOne: false,
      limitAmount: false,
      sendAmount: "in", // in - user want take some money, out - get some money
      errorRoutes: "",
      from: "",
      to: "",
      val1: "",
      val2: "",
      amount: "",
      fromValues: {},
      toValues: {},
      routeValues: {},
      email: "",
      symbolFrom: "",
      symbolTo: "",
      valid: 1,
      agree: false,
      currentRoute: {
        to: {},
        from: {},
        rate: {}
      }
    };
  },
  computed: {
    ...mapGetters("exchange", ["info", "load"]),
    ...mapGetters("user", {profile: "info"}),
    rateIn() {
      if (!this.currentRoute || !this.currentRoute.rate || !this.currentRoute.rate.in) return 0;
      let rate = new BigNumber(this.currentRoute.rate.in);
      let discountPercent = 0;
      const discount = this.currentRoute.from.discounts.find(el => Number(el.amountMoreThan) <= this.val1);
      if (discount && discount.discountPercent) {
        discountPercent = Number(discount.discountPercent);
      }
      rate = rate.minus(
        rate.multipliedBy(
          new BigNumber(1)
            .div(rate)
            .multipliedBy(discountPercent)
            .div(100)
        )
      );
      return rate;
    },
    rateOut() {
      if (!this.currentRoute || !this.currentRoute.rate || !this.currentRoute.rate.out) return 0;

      let rate = new BigNumber(this.currentRoute.rate.out);

      return rate;
    },
    fromList() {
      let obj = {};
      if (!this.info) return 0; // techworks
      return this.info
        .map(el => {
          return {
            ...el,
            can: this.info.some(m => el.from.xml === m.from.xml && this.to.name === m.to.xml)
          };
        })
        .filter(el => {
          if (obj[el.from.xml]) {
            return false;
          } else {
            obj[el.from.xml] = true;
            return true;
          }
        })
        .filter(el => !this.symbolFrom || this.symbolFrom === el.from.symbol)
        .sort(function (a, b) {
          return a.from.positionIn > b.from.positionIn ? 1 : -1;
        });
    },
    toList() {
      let obj = {};
      return this.info
        .filter(el => {
          if (obj[el.to.xml]) {
            return false;
          } else {
            obj[el.to.xml] = true;
            return true;
          }
        })
        .map(el => {
          return {
            ...el,
            can: this.info.some(m => el.to.xml === m.to.xml && this.from.xml === m.from.xml)
          };
        })
        .filter(el => (!this.symbolTo || this.symbolTo === el.to.symbol) && el.can)
        .sort(function (a, b) {
          return a.to.positionOut > b.to.positionOut ? 1 : -1;
        });
    },
    fromSymbolList() {
      let obj = {};
      this.info.forEach(el => (obj[el.from.symbol] = true));
      return Object.keys(obj);
    },
    toSymbolList() {
      let obj = {};
      this.info.forEach(el => (obj[el.to.symbol] = true));
      return Object.keys(obj);
    },
    matchedRoute() {
      return (
        this.info.find(el => this.from.xml === el.from.xml && this.to.xml === el.to.xml) || {
          from: {},
          rate: {},
          to: {}
        }
      );
    },
    instructions() {
      if (this.currentRoute) {
        return this.currentRoute.instructions
          .filter(item => {
            return item.step === "createOrder";
          })
          .map(item => {
            let resultContent = "";
            const content = item.content.split("##");
            for (let i = 0; i < content.length; i++) {
              if (content[i].length === 2) {
                if (content[i] !== this.$i18n.locale) {
                  i++;
                }
              } else {
                resultContent += content[i];
              }
            }
            return {...item, content: resultContent};
          });
      } else {
        return [];
      }
    }
  },
  watch: {
    from: {
      deep: true,
      handler() {
        this.changeCurrency();
      }
    },
    to: {
      deep: true,
      handler() {
        this.changeCurrency();
      }
    }
  },
  async created() {
    await this.routes();
    let from = this.$route.query.from || this.widgetFrom;
    let to = this.$route.query.to || this.widgetTo;
    let amount = this.$route.query.amount || this.widgetAmount;
    if ((!from || !to) && this.fromList && this.toList) {
      this.from = this.fromList[0].from;
      process.nextTick(() => {
        const toCurr = this.toList.find(({can}) => can);
        if (toCurr) this.to = toCurr.to;
      });
    }
    if (amount) {
      if (amount > 0) {
        this.val1 = Math.abs(amount);
      }
      if (amount < 0) {
        this.val2 = Math.abs(amount);
      }
    }
    if (!this.info || !this.info[0]) {
      this.errorRoutes = "Routes not found";
    }
    if (!this.info) return 0; // techworks
    let f_f = this.info.find(el => el.from.xml === from);
    let f_t = this.info.find(el => el.to.xml === to);
    if (from && f_f) this.from = {...f_f.from};
    if (to && f_t) this.to = {...f_t.to};
  },

  methods: {
    ...mapActions({
      routes: "exchange/routes",
      createOrder: "exchange/createOrder"
    }),
    setVal2() {
      this.val2 = Number(this.currentRoute.rate.amount);
      this.correctFrom();
    },
    setMaxValueTo() {
      this.val2 = Number(this.currentRoute.rate.amount);
      this.correctFrom();
    },
    correctFrom() {
      let coef = new BigNumber(this.rateOut).dividedBy(this.rateIn) || 1;
      let num = new BigNumber(this.val2 || 0)
        .plus(this.currentRoute.rate.outFeeAmount)
        .dividedBy(coef)
        .decimalPlaces(this.currentRoute.from.decimal !== undefined ? this.currentRoute.from.decimal : 2);
      if (num.lte(0)) return (this.val1 = 0);

      if (new BigNumber(this.val2).isGreaterThan(this.currentRoute.rate.amount)) {
        this.limitAmount = true;
      } else {
        this.limitAmount = false;
      }
      this.sendAmount = "out";
      this.val1 = num;
      process.nextTick(() => {
        let coef1 = new BigNumber(this.rateOut).dividedBy(this.rateIn) || 1;
        if (!coef1.eq(coef)) {
          this.correctFrom();
        }
      });
    },
    async create() {
      let {routeId} = this.currentRoute;
      if (
        this.currentRoute.from.fields.some(el => el.required && !this.fromValues[el._id]) &&
        this.currentRoute.to.fields.some(el => el.required && !this.toValues[el._id]) &&
        this.currentRoute.fields.some(el => el.required && !this.routeValues[el._id])
      )
        return this.$store.dispatch("notify/add", {
          message: this.$t("page.main.messages.checkFields"),
          type: "warning"
        });
      if (!this.agree)
        return this.$store.dispatch("notify/add", {
          message: this.$t("page.main.messages.mustBeAgree"),
          type: "warning"
        });
      let fromValues = Object.keys(this.fromValues).map(el => ({
        key: el,
        value: this.fromValues[el]
      }));
      let toValues = Object.keys(this.toValues).map(el => ({
        key: el,
        value: this.toValues[el]
      }));
      let routeValues = Object.keys(this.routeValues).map(el => ({
        key: el,
        value: this.routeValues[el]
      }));
      let order = {
        routeId,
        fromValues,
        toValues,
        routeValues,
        agreement: true,
        email: this.email,
        lang: this.$root.$i18n.locale,
        amount: this.sendAmount === "out" ? -this.val2 : this.val1,
        vuexActionV2: true // vuex param
      };
      let res = await this.createOrder(order).catch(err => {
        this.$swal("", err.message, "error");
      });
      if (res) {
        if (!this.profile) {
          let orders = JSON.parse(localStorage.getItem("orders"));
          if (orders) orders.push(res);
          else orders = [res];
          localStorage.setItem("orders", JSON.stringify(orders));
        }
        this.$router.push(`/${this.$root.$i18n.locale}/order/${res.uid}/${res.secret}`);
      }
    },
    correctTo() {
      if (!this.currentRoute || !this.currentRoute.rate || !this.currentRoute.rate.out || !this.currentRoute.rate.in) {
        this.val2 = 0;
        return null;
      }
      let coef = new BigNumber(this.rateOut).dividedBy(this.rateIn) || 1;
      let num = BigNumber(this.val1 || 0)
        .multipliedBy(coef)
        .minus(this.currentRoute.rate.outFeeAmount)
        .decimalPlaces(this.currentRoute.to.decimal !== undefined ? this.currentRoute.to.decimal : 2);
      if (num.lte(0)) return (this.val2 = 0);

      if (num.isGreaterThan(this.currentRoute.rate.amount)) {
        this.limitAmount = true;
      } else {
        this.limitAmount = false;
      }

      this.sendAmount = "in";
      this.val2 = num;
    },
    async changeCurrency() {
      let query = {};
      if (this.from.xml) query.from = this.from.xml;
      if (this.to.xml) query.to = this.to.xml;
      if (!this.isWidget) this.$router.push({query});
      if (!this.matchedRoute || !this.matchedRoute.routeId) {
        return false;
      }
      this.loadRouteGetOne = false;
      this.errorloadRouteGetOne = false;
      const res = await this.$rest
        .api("public/exchanger/route/get/one", {
          id: this.matchedRoute.routeId,
          lang: this.$i18n.locale
        })
        .catch(err => {
          this.errorloadRouteGetOne = true;
          this.loadRouteGetOne = true;
          return Promise.reject(err);
        });
      if (res.success) this.currentRoute = res.data.route;
      process.nextTick(() => {
        this.loadRouteGetOne = true;
        this.errorloadRouteGetOne = false;
      });
      this.correctTo();
    },
    fixedNumber(type, decimal, number) {
      const divN = Number(10 ** decimal);
      let n = 0;
      if (type === "floor") {
        n = Math.floor(number * divN) / divN;
      } else if (type === "ceil") {
        n = Math.floor(number * divN) / divN;
      } else {
        n = Number(Number(number).toFixed(decimal));
      }
      if (decimal <= 2 && decimal > 0) {
        n = n.toFixed(2);
      } else if (decimal === 0) {
        n = n.toFixed(0);
      }
      return n;
    }
  }
};
</script>

<style lang="scss" scoped>
.dropper img {
  width: 25px;
  height: 25px;
  margin: 5px;
}

.dropper li {
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.dropper li:hover {
  background: rgba(0, 150, 255, 0.1);
}

.dropper {
  width: 100%;
}

.dropper .bp-dropdown__btn {
  width: 100%;
}

.help_block {
  text-align: center;

  h3 {
    font-size: 20px;
    margin: 10px 0;
    color: #656565;
    font-weight: 400;
    font-family: "Roboto-Regular";
  }

  p {
    font-size: 14px;
    color: #a0a3b1;
  }

  .arrow_icon {
    display: block;
    padding: 20px;
  }

  .file_icon {
    display: block;
    padding-top: 30px;
    padding-bottom: 10px;
  }
}
</style>
