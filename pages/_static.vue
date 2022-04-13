<template>
  <div style="min-height:90vh">
    <div class=" specification-top-wr">
      <div class="container">
        <div class="about-us-top">
          <h1>{{ title }}</h1>
        </div>
      </div>
    </div>
    <transition name="faded">
      <v-runtime-template v-if="load" :template="temp" />
      <loader v-else />
    </transition>
  </div>
</template>
<script>
export default {
  components: {
    routes: () => import("~/components/homepage/routes").then(comp => comp),
    reviews: () => import("~/components/homepage/reviews").then(comp => comp),
    reserves: () => import("~/components/homepage/reserves").then(comp => comp),
    partners: () => import("~/components/homepage/partner").then(comp => comp),
    news: () => import("~/components/news/list").then(comp => comp),
    exchange:()=>import("~/components/homepage/exchangeForms/v2").then(comp=>comp)
  },
  data() {
    return {
      temp: "",
      title: "",
      load: false
    };
  },
  asyncData({params, app, error}) {
    return app.$rest
      .api("public/site/page/static/content", {
        lang: app.i18n.locale,
        link: params.static
      })
      .then(r => {
        r.data.html = r.data.html.replace(/<!/g, "<");
        r.data.html = r.data.html.replace(/!>/g, ">");
        return r.data;
      })
      .catch(() => {
        return null;
      })
      .then(res => {
        if (!res) return error({statusCode: 404, message: app.i18n.t("page.404.title")});
        return {
          title: (res && res.title) || "Error",
          temp: (res && res.html) || "",
          load: true
        };
      });
  }
};
</script>
<style scoped>
.container h2{
  font-size: 24px;
  font-weight: 600;
  padding:18px 0;
}
.container h2{
  font-size: 22px;
  font-weight: 600;
  padding:15px 0;
}
.container h3{
  font-size: 20px;
  font-weight: 600;
  padding:10px 0;
}
.container ul, .container ol{
  padding: inherit;
  list-style:inherit;
}
</style>
