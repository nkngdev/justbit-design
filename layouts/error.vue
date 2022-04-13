<template>
  <div class="under-header four-wr" style="min-height:81vh">
    <div class="four four-first">
      <div class="container text-center">
        <h1 class="four-title">{{ error.statusCode }}</h1>
        <p class="four-first-wrong">{{ error.message }}</p>
        <div>
          <nuxt-link :to="`/${$i18n.locale}`" class="btn btn-submit">
            {{ $t("page.404.back") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "~/assets/sass/style.scss";
body {
  margin: 0 auto;
}
</style>

<script>
import login from "~/components/header/logosign";

export default {
  components: {login},
  props: {
    error: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>
