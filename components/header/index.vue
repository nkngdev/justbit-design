<template>
  <header class="header">
        <div v-if="favoriteRates.length" class="course">
          <ul>
            <li v-for="rate in favoriteRates" :key="rate.id">
              <div>
                <p class="course-header">
                  <span>{{ rate.name }}</span>
                  <span>{{ rate.service }}</span>
                </p>
                <p class="course-footer green">
                  <span>{{ rate.rate.toFixed(2) }}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
    <div class="container-1">
      <div class="logo">
        <nuxt-link :to="'/' + $root.$i18n.locale + '/'">
          <img :src="$rest.logoPath" alt=""/>
        </nuxt-link>
      </div>

      <nav>
        <div class="burger" @click="changeMenu(!showMenu)">
          <div class="burger-icon"/>
        </div>
        <ul :class="{'menu-open': showMenu}" class="menu">
          <li>
            <nuxt-link :to="'/' + $i18n.locale + '/reviews/'">
              {{ $t("ui.header.reviews") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="'/' + $i18n.locale + '/partners/'">
              {{ $t("ui.header.partners") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="'/' + $i18n.locale + '/rules/'">
              {{ $t("ui.header.rules") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="'/' + $i18n.locale + '/faq/'">
              {{ $t("ui.header.faq") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="'/' + $i18n.locale + '/news/'">
              {{ $t("ui.header.news") }}
            </nuxt-link>
          </li>
          <li v-for="b in buttons" v-if="b.lang === $i18n.locale && b.isHeaderMenu" :key="b.id">
            <nuxt-link :to="'/' + $i18n.locale + '/' + b.link + '/'">
              {{ b.nameLink }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <div class="right-block">
        <div class="dropdown-lang">
          <div class="inner_dropdown" @click="isShow=!isShow">
            <div class="dropdown-lang-inner-img">
              <img :src="icon">
            </div>
            <div class="dropdown-lang-img-arrow">
              <img src="~/assets/img/arrow_down.svg">
            </div>
          </div>
          <ul v-if="isShow">
            <li v-for="locale in $i18n.locales" :key="locale.code">
              <nuxt-link
                :to="
                                            switchLocalePath(locale.code).indexOf('/' + locale.code) === 0
                                              ? switchLocalePath(locale.code)
                                              : '/' + locale.code + switchLocalePath(locale.code)
                                          "
                :class="{
                                            'active-lang-link': locale.code === lang,
                                            pointer: true
                                          }"
              >
                <div @click="isShow=false" class="dropdown-lang-inner-img">
                  <div v-if="locale.code==='ru'">
                    <img src="~/assets/img/flag/ru.svg">
                    <span>{{ locale.name }}</span>
                  </div>
                  <div v-else>
                    <img src="~/assets/img/flag/us.svg">
                    <span>{{ locale.name }}</span>
                  </div>
                </div>
              </nuxt-link>

            </li>
          </ul>
        </div>
        <logo-sign/>
      </div>
    </div>


  </header>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import logoSign from "~/components/header/logosign";

export default {
  data: () => {
    return {
      isShow: false
    };
  },
  components: {
    logoSign
  },

  computed: {
    lang() {
      return this.$i18n.locale;
    },
    icon() {
      if (this.$i18n.locale === 'ru') {
        return require('~/assets/img/flag/ru.svg')
      } else {
        return require('~/assets/img/flag/us.svg')
      }
    },

    ...mapGetters({
      showMenu: "menu/menu",
      buttons: "menu/buttons",
      link: "rules/getLink"
    }),
    ...mapGetters({favoriteRates: "exchange/favoriteRates"})
  },
  created() {
    this.favRoutes();
    this.getButtons();
  },
  methods: {
    ...mapMutations({changeMenu: "menu/menu"}),
    ...mapActions({
      favRoutes: "exchange/favRoutes",
      getButtons: "menu/buttons",
      menuAllChange: "menu/all"
    })
  }
};
</script>
