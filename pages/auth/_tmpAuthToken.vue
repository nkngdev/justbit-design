<template>
  <div v-if="!error" class="pelen">
    <loader />
    <div>Please wait...</div>
  </div>
  <div v-else class="pelen">
    <div>Error auth token is not valid try again.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {error: null};
  },
  mounted() {
    this.$rest
      .api("admin/users/profile/auth/token", {tmpAuthToken: this.$route.params.tmpAuthToken})
      .then(() => {
        this.$router.push({path: `/${this.$root.$i18n.locale}/user/profile/`});
      })
      .catch(err => {
        console.error("Error Auth,", err);
      });
  }
};
</script>

<style scoped>
.pelen {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 35px;
  font-weight: bold;
}
</style>
