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
      acc_name: "",
      acc_num: "",
      acc_bank: "",
      acc_bank_short: "",
      wish: "",
      image: "",
    };
  },
  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("card") || "";
    const password = prompt("Nhập mật khẩu") || "";

    getData(id, password).then((data) => {
      if (data) {
        this.acc_name = data.acc_name;
        this.acc_num = data.acc_num;
        this.acc_bank = data.acc_bank;
        this.acc_bank_short = data.acc_bank_short;
        this.wish = data.wish;
        this.image = data.image;
      }
    });
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
