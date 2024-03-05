<template>
  <div class="min-h-screen bg-gray-200 flex justify-center items-center">
    <div class="rounded-xl shadow-xl flex flex-col justify-center items-center">
      <Preview
        :acc_name="acc_name"
        :acc_bank_short="acc_bank_short"
        :acc_num="acc_num"
        :image="image"
        :bank="acc_bank"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Preview from "./components/preview.vue";
import { getData } from "./utils";

export default defineComponent({
  name: "App",
  components: {
    Preview,
  },
  data() {
    return {
      acc_name: "Nghia",
      acc_num: "123456",
      acc_bank: "970415",
      acc_bank_short: "VietinBank",
      wish: "Chúc mừng bạn",
      image: "images/preview_4.png",
    };
  },
  mounted() {
    // getData("17", "nghia123").then((data) => {
    //   if (data) {
    //   }
    // });
  },
});
</script>

<style>
div#footer {
  display: none;
}
div#header {
  display: none;
}
</style>
