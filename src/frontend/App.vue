<template>
  <div class="min-h-screen bg-gray-200 flex justify-center items-center">
    <div class="flex flex-col sm:flex-row gap-3">
      <div
        class="rounded-xl shadow-xl flex flex-col justify-center items-center"
      >
        <Preview
          :acc_name="acc_name"
          :acc_bank_short="acc_bank_short"
          :acc_num="acc_num"
          :image="image"
          :bank="acc_bank"
        />
      </div>
      <div class="flex flex-row sm:flex-col">
        <button
          @click="save"
          class="fill-gray-600 text=xl p-3 rounded-3xl m-2 hover:bg-blue-400 hover:fill-white"
        >
          <DownloadIcon w="28px" h="28px" class="fill-inherit" />
        </button>

        <button
          @click="copy"
          class="fill-gray-600 text=xl p-3 rounded-3xl m-2 hover:bg-blue-400 hover:fill-white"
        >
          <CopyIcon w="28px" h="28px" class="fill-inherit" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Preview from "./components/preview.vue";
import { getData } from "./utils";
import DownloadIcon from "vue-ionicons/dist/ios-cloud-download.vue";
import CopyIcon from "vue-ionicons/dist/ios-copy.vue";

export default defineComponent({
  name: "App",
  components: {
    Preview,
    DownloadIcon,
    CopyIcon,
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
    // const password = "nghia123";
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
  methods: {
    save() {
      var link = document.createElement("a");
      link.download = "filename.png";
      // @ts-ignore
      link.href = document.getElementById("canvas").toDataURL();
      link.click();
    },

    copy() {
      window.navigator.clipboard.writeText(window.location.href);
    },
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
