<template>
  <div class="news-bloc ">
    <div class="bg-right">

      <div v-if="news.length" class="container ">
        <transition name="faded">
          <loader v-if="!load"/>
        </transition>
        <div class="zayvki-filter-main">
          <div class="zayvki-filter-main--top">
            <h3 class="title-other">{{ $t("page.news.title") }}</h3>
            <div class="zayvki-filter-main--top__btn-group">
              <button class="btn btn-look" @click="getNewsFull()">{{ $t("page.news.all") }}</button>
            </div>
          </div>
        </div>
        <!--      <div class="news-bloc">-->
        <ul :style="{opacity: load ? 1 : 0.5}">
          <li
            v-for="news in news.slice(0, limit)"
            :key="news._id"
            :style="
            news.title && load
              ? {cursor: 'pointer'}
              : {background: '#EEE', transition: 'all .3s', minHeight: '370px', borderRadius: '5px'}
          "
            @click="$router.push(`/${$root.$i18n.locale}/news/${news.link}`)"
          >
            <div class="news-bloc-img">
              <nuxt-link v-if="news.image && load" :to="`/${$root.$i18n.locale}/news/${news.link}`">
                <img :src="$rest.urlImg(news.image).medium" alt=""/>
              </nuxt-link>
            </div>

            <div v-if="news.title && load" class="news-bloc-info">
              <!--              <span>{{ $t("page.news.category") }}</span>-->
              <p class="news-bloc-title">{{ news.title }}</p>

              <div class="news-bloc-info_item">

                <div class="news-bloc-info_item-photo-name">
                  <div class="news-bloc-info_item-photo">
                    <img src="~assets/img/user-main.svg" alt=""/>
                  </div>

                  <div class="news-bloc-info_item-name">
                    <p>Admin</p>
                    <span>{{ $moment(news.updatedAt).format("DD MMM YYYY в HH:mm") }}</span>
                  </div>

                  <div class="news-bloc-info_item-data">
                <span>
                  <img src="~assets/img/visible.svg" alt=""/>
                  <span>{{ news.views }}</span>
                </span>
                    <!--<a href="" class="news-bloc-flag"><img src="~/assets/img/bookmark.svg" alt=""></a>-->
                  </div>

                </div>
              </div>
            </div>
          </li>
        </ul>
        <!--      </div>-->
        <pagination
          v-if="pagination"
          :current-page="current_page"
          :total-pages="total_pages"
          @page-changed="getNewsFull({page: $event})"
        />
      </div>
      <div v-else class="not-found-news">{{ $t("page.news.news-not-found") }}</div>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import pagination from "~/components/pagination";

export default {
  components: {pagination},
  props: {pagination: {type: Boolean, default: true}, limit: {type: Number, default: 999}},
  computed: {
    ...mapGetters({
      news: "news/getData",
      total_pages: "news/getTotalPages",
      current_page: "news/getCurrentPage",
      load: "news/getLoad"
    }),
    lang() {
      return this.$root.$i18n.locale;
    }
  },
  watch: {
    lang() {
      this.getNewsFull({lang: this.$root.$i18n.locale});
    }
  },
  created() {
    this.getNewsFull({lang: this.$root.$i18n.locale});
  },
  methods: {
    ...mapActions({
      getNewsFull: "news/getNewsFull"
    })
  }
};
</script>
