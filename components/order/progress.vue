<template>
  <div>

      <div v-if="order && order.comment" class="form-attention">
        <h4>Comment:</h4>
        {{ order.comment }}
      </div>
      <p
        v-for="instruction in instructions"
        :key="instruction._id"
        class="form-attention"
        v-html="instruction.content"
      />

    <div>
      <div class="form-manual-must text-center">
        <p class="title">Waiting for application payment.</p>
        <br/>
        <p>Waiting flow of funds for application. As soon as application will pay we automatically start processing your order.</p>
      </div>
    </div>
  </div>
</template>
<script>
import currency from "~/components/order/subcomponents/currency";
import contactsData from "~/components/order/subcomponents/contactsData";

export default {
  components: {
    currency,
    contactsData
  },
  props: {
    order: {
      type: Object,
      default: () => ({})
    },
    isPaymentType: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    instructions() {
      if (this.order)
        return this.order.route.instructions
          .filter(item => {
            return item.step === "resultOrder";
          })
          .map(item => {
            let resultContent = "";
            const content = item.content.split("##");
            for (let i = 0; i < content.length; i++) {
              if (content[i].length === 2) {
                if (content[i] !== this.$i18n.locale) {
                  i++;
                }
              } else {
                resultContent += content[i];
              }
            }
            return {...item, content: resultContent};
          });
    }
  }
};
</script>
