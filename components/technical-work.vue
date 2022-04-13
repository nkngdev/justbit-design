<template>
  <div class="under-header four-wr" style="min-height:81vh">
    <div class="four four-second">
      <div class="container text-center">
        <p><img src="~assets/img/error.png" alt="" /></p>
        <p class="four-second-break">{{ $t("page.technical.title") }}</p>
        <!--<p class="four-second-back">###### #### ######### ###### <b>## ##### ## #######</b></p>-->
        <p class="four-second-dont-worry">
          {{ $t("page.technical.description") }}
        </p>
        <div>
          <nuxt-link :to="`/${$root.$i18n.locale}/news`" class="btn btn-submit">
            {{ $t("page.technical.btn-news") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  head() {
    return {
      title: this.$t("meta.technical.title"),
      meta: [{description: this.$t("meta.technical.description")}, {keywords: this.$t("meta.technical.keywords")}]
    };
  }
};
</script>
