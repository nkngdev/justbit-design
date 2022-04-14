<template>
  <footer class="footer">
    <div class="footer-bottom">
      <div class="container">
        <p style="margin-left: 15px;">
          {{ $t("ui.footer.dev_by") }}
          <a href="https://just-bit.com/" target="_blank" style="padding: 0;color:#282E38;">
            {{ $t("ui.footer.box_exchanger") }}
          </a>
        </p>
        <ul>
          <li v-for="b in buttons" v-if="b.lang === $root.$i18n.locale && b.isFooterMenu" :key="b.id">
            <nuxt-link :to="'/' + $root.$i18n.locale + '/' + b.link">
              {{ $t("ui.footer.about") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="'/' + $root.$i18n.locale + '/rules'">
              {{ $t("ui.footer.rules") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="'/' + $root.$i18n.locale + '/contacts'">
              {{ $t("ui.footer.contacts") }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed: {...mapGetters("menu", ["menu", "buttons"])}
};
</script>
