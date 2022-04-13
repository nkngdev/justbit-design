<template>
  <div class="container container-dashed partner-block">
    <div v-if="info.length" class="our-partner">

      <ul>
        <li v-for="pa in info" :key="pa.id">
          <a :href="pa.link" target="_blank">
            <img :src="$rest.fsPath + pa.image.files.big.url" alt="" />

          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters({info: "partners/info"})
  },
  created() {
    this.getPartners();
  },
  methods: {
    ...mapActions({getPartners: "partners/getPartners"})
  }
};
</script>

<style scoped>
ul {
  padding: 23px 0px 20px 0px;
}
</style>
