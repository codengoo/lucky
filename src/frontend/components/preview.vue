<template>
  <div class="w-80 rounded-2xl overflow-hidden min-h-[70vh]">
    <canvas id="canvas" ref="canvas" width="100%" height="100%" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Preview",
  props: {
    bank: String,
    acc_name: String,
    acc_num: String,
    acc_bank_short: String,
    image: String,
  },

  data() {
    return {
      bg: "",
      qr: "",
      context: "",
    };
  },

  setup() {
    const canvas = ref();
    return { canvas };
  },
  watch: {
    name: function (val) {
      this.draw();
    },
    num: function (val) {
      this.qr.src = `https://img.vietqr.io/image/${this.bank}-${this.acc_num}-qr_only.png`;
      this.draw();
    },
    bank: function (val) {
      this.qr.src = `https://img.vietqr.io/image/${this.bank}-${this.acc_num}-qr_only.png`;
      this.draw();
    },
    image: function (val) {
      this.bg.src = window.WPLKPathx.assets + val;
    },
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      if (this.canvas) {
        const rect = canvas.parentNode.getBoundingClientRect();
        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.bg = new Image();
        this.qr = new Image();
        this.bg.src = window.WPLKPathx.assets + this.image;
        this.qr.src = `https://img.vietqr.io/image/${this.bank}-${this.num}-qr_only.png`;

        this.bg.onload = () => {
          this.draw();
        };

        this.qr.onload = () => {
          this.draw();
        };
      }
    },

    draw() {
      this.drawImage();
      this.drawQR();
      this.drawText();
    },

    drawImage() {
      this.context.drawImage(
        this.bg,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    },

    drawQR() {
      this.context.drawImage(this.qr, 10, 10, 110, 110);
    },

    drawText() {
      this.context.font = "bold 36px Lato";
      this.context.fillStyle = "#FFFFFF";
      this.context.fillText(this.acc_name, 20, this.canvas.height - 100);
      this.context.font = "bold 21px Lato";
      this.context.fillText(this.acc_bank_short, 20, this.canvas.height - 70);
      this.context.font = "bold 21px Lato";
      this.context.fillText(this.acc_num, 20, this.canvas.height - 50);
    },
  },
});
</script>
