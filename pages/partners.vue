<template>
  <div class="partner-page">
      <div class="container">
        <div class="partner-top">
          <h1>{{ $t("page.partners.title") }}</h1>
          <no-ssr>
            <div v-if="getJivoSite">
              <button
                class="btn btn-submit"
                onclick="(window.jivo_api && window.jivo_api.open)
               ? window.jivo_api.open()
               : console.log('jivosite not found')"
              >
                {{ $t("ui.buttons.partners_start_chat") }}
              </button>
            </div>
          </no-ssr>
        </div>
    </div>
    <offerList :offers="offers" />
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import offerList from "~/components/offerList/index.vue";

export default {
  async asyncData({ params, app, seo }) {

  },
  head() {
    return this.$seo({
      title: this.$rest.projectName + " - " + this.$i18n.t("meta.partners.title"),
        description: this.$i18n.t("meta.partners.description"),
      openGraph: {
        title: this.$rest.projectName + " - " + this.$i18n.t("meta.partners.title"),
        description: this.$i18n.t("meta.partners.description"),
        image:{url:this.$rest.baseUrl+this.$rest.faviconPath}
      }
    });
  },
  components: { offerList},
  async asyncData() {
    return {
      offers: ["toUsers", "toPartners", "toShops"]
    };
  },
  computed: {
    ...mapGetters({getJivoSite: "params/getJivoSite"})
  }
};
</script>
