<template>
  <div :style="{opacity: load ? 1 : 0.5}">
    <div class="under-header one-new-top-wr">
      <div class="container">
        <p class="one-new-top-back">
          <nuxt-link to="/news"> {{ $t("ui.buttons.back") }}</nuxt-link>
        </p>
        <h1>{{ news.title }}</h1>
        <!--To Do: add localization date-->
        <p v-if="news.image" class="one-new-top-date">{{ $moment(news.createdAt).format("DD MMM YYYY") }}</p>
      </div>
    </div>
    <div class="one-new">
      <div class="one-new-info">
        <div class="container">
          <div class="one-new-info-item">
            <div class="one-new-info-left" style="width:100%" v-html="news.content" />
          </div>
        </div>
      </div>
      <div class="one-new_bg">
        <div class="container">
          <div class="one-new_comments">
            <div class="title">{{ $t("page.news.news.comment") }}</div>
            <form action="" class="form form_reviews-new">
              <div class="form_reviews-new_wr">
                <h4 class="title text-center">
                  {{ $t("page.news.news.comment") }}
                </h4>
                <div class="form_reviews-new_base">
                  <p>
                    <input v-model="com.name_author" :placeholder="$t('page.news.your_name')" type="text" />
                  </p>
                  <p>
                    <textarea
                      id=""
                      v-model="com.message"
                      :placeholder="$t('page.news.news.text_review')"
                      name=""
                      cols="30"
                      rows="10"
                    />
                  </p>
                  <div class="text-center">
                    <button
                      class="btn btn-submit"
                      @click.prevent="
                        com.news_id = news._id;
                        createComment(com);
                      "
                    >
                      {{ $t("page.news.news.put_comment_2") }}
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <ul v-if="news.comments">
              <li v-for="comment in news.comments.slice(start, end)" :key="comment.id">
                <div class="one-new_comments_bloc">
                  <div class="one-new_comments_bloc-photo">
                    <img src="~assets/img/user.svg" alt="" />
                  </div>
                  <div class="one-new_comments_bloc-main">
                    <p class="one-new_comments_bloc-name">
                      <b>{{ comment.name_author }}</b>
                    </p>
                    <p class="one-new_comments_bloc-txt">
                      {{ comment.message }}
                    </p>
                  </div>
                  <div class="one-new_comments_bloc-date">
                    <span>
                      {{ $moment(comment.createdAt).format("DD MMM YYYY") }}
                    </span>
                  </div>
                </div>
              </li>
              <li v-if="!news.comments || !news.comments.length">
                <div class="one-new_comments_bloc">
                  {{ $t("page.news.news.no_comments") }}
                </div>
              </li>
            </ul>
          </div>
          <pagination :current-page="current" :total-pages="total" @page-changed="current = $event" />
        </div>
      </div>
    </div>
    <div class="container">
      <list :limit="3" :pagination="false" />
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import list from "~/components/news/list";
import pagination from "~/components/pagination";

export default {
  components: { list, pagination},
    head() {
     if(!this.seo || !this.seo.title){
       return null;
     }
     return this.$seo({
       title: this.$rest.projectName + " - " + this.seo.title,
        description: this.$i18n.t("meta.news.description"),
        openGraph:{
          title:this.seo.title,
          description:this.seo.description,
          content:this.seo.content,
          image:this.$rest.fsPath+this.seo.img
        }
      })
  },
  data() {
    return {
      com: {
        name_author: "",
        message: "",
        news_id: ""
      },
      current: 1,
      limit: 10
    };
  },
  async asyncData({ params, app, seo }) {
    const res = await app.$rest
      .api("public/news/get/one", {
        link: params.id,
        lang: app.i18n.locale
      })
      .catch(() => {
        return null;
      });
    if (res && res.success && res.data){
      let news = res.data;
      return {
        seo:{
          title:news.title,
          img:news.image.files[0].url,
          description:news.description,
          content:news.content
        }
      }

    }
  },
  computed: {
    ...mapGetters("news", {
      news: "getOneNews",
      load: "getLoad"
    }),
    lang() {
      return this.$root.$i18n.locale;
    },
    total() {
      return this.news.comments ? Math.ceil(this.news.comments.length / this.limit) : 10;
    },
    start() {
      return (this.current - 1) * this.limit;
    },
    end() {
      return this.start + (this.limit - 1);
    }
  },
  methods: {
    ...mapActions("news", ["getOneNews", "createComment"])
  },
  // eslint-disable-next-line vue/order-in-components
  watch: {
    lang() {
      this.getOneNews({link: this.$route.params.id, lang: this.lang}).then(r => (r ? "" : this.$router.back()));
    }
  },
  // eslint-disable-next-line vue/order-in-components
  created() {
    this.getOneNews({link: this.$route.params.id, lang: this.lang}).then(r => (r ? "" : this.$router.back()));
  }
};
</script>
