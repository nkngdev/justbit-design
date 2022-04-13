<template>
  <div>
    <rulesTopSection @onChangeRule="onChangeRule" />
    <div class="container">
      <div class="specification">
        <transition name="faded">
          <div v-if="load" class="specification-info">
            <h5 class="title">
              <b>{{ rules.title }}</b>
            </h5>
            <div style="white-space:pre-wrap" v-html="rules.content" />
          </div>
        </transition>
      </div>
    </div>
    <div class="reviews-bloc specification-news-bloc">
      <list :pagination="false" :limit="3" />
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import rulesTopSection from "~/components/rules/rulesTopSection";
import list from "~/components/news/list";

export default {
  components: {rulesTopSection, list},
  head() {
    if (!this.seo || !this.seo.title) {
      return null;
    }
    return this.$seo({
      title: this.$rest.projectName + " - " + this.seo.title,
      description: this.seo.content,
      openGraph: {
        title: this.seo.title,
        description: this.seo.content,
        content: this.seo.content,
        image: this.seo.image
      }
    });
  },
  async asyncData({params, app, seo}) {
    const res = await app.$rest
      .api("public/rule/get", {
        link: params.link,
        lang: app.i18n.locale
      })
      .catch(() => {
        return null;
      });

    if (res && res.success && res.data) {
      let rule = res.data.rule;
      return {
        seo: {
          title: rule.title,
          description: rule.content.replace(/<\/?[^>]+>/ig, " "),
          content: rule.content.replace(/<\/?[^>]+>/ig, " "),
          image: {url: app.$rest.fsPath + app.$rest.faviconPath}
        }
      }
    }
  },
  data() {
    return {
      link: null
    };
  },
  computed: {
    ...mapGetters({
      titles: "rules/getData",
      rules: "rules/getRule",
      total_pages: "rules/getTotalPages",
      current_page: "rules/getCurrentPage",
      load: "rules/getLoad"
    }),
    lang() {
      return this.$root.$i18n.locale;
    }
  },
  watch: {
    // lang() {
    //   this.getRule({ link: this.$route.params.link, lang: this.lang }).then(
    //     r => {
    //       if (!r) this.$router.replace(`/${this.lang}/rules/`);
    //     }
    //   );
    // }
  },
  created() {
    this.getRule({link: this.$route.params.link, lang: this.lang});
  },
  methods: {
    onChangeRule(link) {
      this.$router.push(`/${this.lang}/rules/${link}`);
    },
    ...mapActions({
      getRules: "rules/getTitleRules",
      getRule: "rules/getRule"
    })
  }
};
</script>
