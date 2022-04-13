<template>
  <div>
    <div class=" news-page-top-wr">
      <div class="container news-page-top">
        <h1>{{ $t("page.news.title") }}</h1>
        <p>######################</p>
      </div>
    </div>
    <list />
  </div>
</template>
<script>
import list from "~/components/news/list";

export default {
  async asyncData({ params, app, seo }) {

  },
  components: {list},
  head() {
    return this.$seo({
      title: this.$rest.projectName + " - " + this.$i18n.t("meta.news.title"),
        description: this.$i18n.t("meta.news.description"),
      openGraph: {
        title: this.$rest.projectName + " - " + this.$i18n.t("meta.news.title"),
        description: this.$i18n.t("meta.news.description"),
        image:{url:this.$rest.baseUrl+this.$rest.faviconPath}
      }
    });
  }
};
</script>
