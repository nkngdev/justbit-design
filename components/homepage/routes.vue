<template>
  <div class="choose">
    <div class="container">
      <h4 class="title">{{ $t("page.about.choose") }}</h4>
      <ul>
        <li v-for="route in routes" :key="route.id">
          <a
            class="btn-submit"
            :href="
              onlySeo
                ? `/exchange/${route.seo.friendlyURL}`
                : `/${$root.$i18n.locale}?from=${route.from.xml}&to=${route.to.xml}`
            "
          >
            <p>
              <b>Вывод {{ route.from.name }} на {{ route.to.name }}</b>
            </p>
            <!--todo russian world ^^^ (2)-->
            <span>{{ route.from.name }} {{ route.from.symbol }} - {{ route.to.name }} {{ route.to.symbol }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from "vuex";

export default {
  props: {
    onlySeo: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({routesInfo: "exchange/info"}),
    routes() {
      if (!this.routesInfo) return [];
      return this.routesInfo.filter(el => {
        if (!this.onlySeo) return true;
        return Boolean(el.seo.friendlyURL);
      });
    }
  },
  async created() {
    await this.getRoutes();
  },
  methods: {
    ...mapActions({
      getRoutes: "exchange/routes"
    })
  }
};
</script>
