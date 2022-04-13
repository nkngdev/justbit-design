<template>
  <div class="pelen">
    <loader />
    <div>Please wait...</div>
  </div>
</template>

<script>
export default {
  fetch({redirect, app, query, params}) {
    console.log("Fetch hook partner redirect;");
    if (process.client) {
      console.log("Set partner to localStorage: ", params.partner);
      localStorage.setItem("partner", params.partner);
    }
    let {from, to} = {from: query.cur_from || query.from, to: query.cur_to || query.to};
    return redirect(301, {
      path: "/" + app.i18n.locale,
      query: {
        from,
        to,
        ref: (!process.client) ? params.partner : undefined
      }
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
