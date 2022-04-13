<template>
  <div class="user-page">
    <div class="profile-top-wr">
      <div class="container">
        <!--        <h1>{{ $t("page.user.nav.profile") }}</h1>-->
        <div class="profile-nav">
          <ul>
            <li>
              <nuxt-link
                :to="`/${$root.$i18n.locale}/user/profile`"
                active-class="profile-nav-active"
              >{{ $t("ui.buttons.profile") }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="`/${$root.$i18n.locale}/user/requisites`" active-class="profile-nav-active">
                {{ $t('ui.buttons.requisites') }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="`/${$root.$i18n.locale}/user/partner-system`"
                active-class="profile-nav-active"
              >
                {{ $t("ui.buttons.affiliate") }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link
                :to="`/${$root.$i18n.locale}/user/orders`"
                active-class="profile-nav-active"
              >
                {{ $t("ui.buttons.requests") }}
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="`/${$root.$i18n.locale}/user/api`" active-class="profile-nav-active">
                {{ $t("ui.buttons.api") }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <nuxt-child />
  </div>
</template>
<script>
import {mapActions} from "vuex";

export default {
  created() {
    this.checkAuth();
    this.timeout = setInterval(this.checkAuth, 30000);
  },
  beforeDestroy() {
    clearInterval(this.timeout);
  },
  methods: {
    ...mapActions({
      checkAuthAPI: "user/checkAuth"
    }),
    async checkAuth() {
      const session = await this.checkAuthAPI();
      if (session === 403) {
        return this.$router.replace("/" + this.$i18n.locale + "/");
      }
    }
  },
  head() {
    return {
      title: this.$rest.projectName + " - " + this.$t("meta.user.title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("meta.user.description")
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.$t("meta.user.keywords")
        }
      ]
    };
  }
};
</script>
