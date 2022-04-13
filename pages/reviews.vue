<template>
  <div>
    <div class="container">

      <h1>{{ $t("page.reviews.title") }}</h1>
      <div class="reviews-top">
        <ul>
          <li v-for="(item, key) in activeReviews" :key="key">
            <a :href="item.linkReview" target="_blank" class="btn btn-blue">
              {{ $t("page.reviews.feedbackOn") }}
              {{ item.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <transition name="faded">
      <loader v-if="getRequestStateReviews('getReviews', 'isPending')"/>
    </transition>
    <div class="reviews">
      <div class="container">
        <no-ssr>
          <reviewsList class="reviews-main"/>
        </no-ssr>
        <reviewsForm/>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import pagination from "~/components/pagination";
import reviewsForm from "~/components/reviews/reviewsForm";
import reviewsList from "~/components/reviews/reviewsList";

export default {
  async asyncData({params, app, seo}) {

  },
  head() {
    return this.$seo({
      title: this.$rest.projectName + " - " + this.$i18n.t("meta.reviews.title"),
      description: this.$i18n.t("meta.reviews.description"),
      openGraph: {
        title: this.$rest.projectName + " - " + this.$i18n.t("meta.reviews.title"),
        description: this.$i18n.t("meta.reviews.description"),
        image: {url: this.$rest.baseUrl + this.$rest.faviconPath}
      }
    });
  },
  components: {reviewsForm, reviewsList, pagination},
  computed: {
    ...mapGetters({
      activeReviews: "partners/activeReviews",
      getRequestStateReviews: "reviews/getRequestState"
    }),
    lang() {
      return this.$root.$i18n.locale;
    }
  },
  created() {
    this.getPartners();
  },
  methods: {
    ...mapActions({
      getPartners: "partners/getPartners"
    })
  }
};
</script>
