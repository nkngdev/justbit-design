<template>
  <div>
    <div v-if="order && order.comment" class="form-attention" style="margin: 0.85em 2.585em 0.75em;">
      <h4 class="form-confirmation__main--title">Comment:</h4>
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
        <p class="title">Order is completed.</p>
        <br/>
        <p>Thank you for using our service. Please leave a review about the work of our service!</p>
      </div>
    </div>
  </div>
</template>
<script>
import currency from "~/components/order/subcomponents/currency";
import contactsData from "~/components/order/subcomponents/contactsData";
import verification from "~/components/order/subcomponents/verification";

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
