<template>
  <faq />
</template>
<script>
import faq from "~/components/faq";

export default {
  components: { faq },
  async asyncData({ params, app, seo }) {
    
  },
  head() {
    return this.$seo({
      name: this.$rest.projectName + " - " + this.$i18n.t("meta.faq.title"),
      title: this.$rest.projectName + " - " + this.$i18n.t("meta.faq.title"),
      description: this.$i18n.t("meta.contacts.description"),
      openGraph: {
      title: this.$rest.projectName + " - " + this.$i18n.t("meta.faq.title"),
      description: this.$i18n.t("meta.faq.description"),
        image:{url:this.$rest.baseUrl+this.$rest.faviconPath}
      }
    });
  }
};
</script>
