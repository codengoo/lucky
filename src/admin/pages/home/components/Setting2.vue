<template>
  <div>
    <Header
      title="Phong bao"
      subtitle="Tạo mã QR kèm lời chúc cho những người thân yêu"
    />

    <div class="pt-8 h-full">
      <Form @next="handleNext">
        <template v-slot:input_area>
          <Input
            title="Lời chúc"
            type="text"
            id="wish"
            placeholder="Chúc mừng bạn"
            required
            :defaultValue="wish"
            @update:model-value="handleWish"
          />
          <SelectImage
            @update:model-value="handleImage"
            :data="images"
            :defaultValue="image"
          />
        </template>

        <template v-slot:button_area>
          <Button @onClick="backStep" type="Alternative" icon_center>
            <template v-slot:icon_center>
              <LeftIcon />
            </template>
          </Button>
          <Button title="Tiếp tục" icon submit>
            <template v-slot:icon>
              <RightIcon />
            </template>
          </Button>
        </template>
      </Form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Input from "@admin/components/input.vue";
import Button from "@admin/components/button.vue";
import SelectImage from "@admin/components/select_image.vue";
import RightIcon from "vue-ionicons/dist/ios-arrow-forward.vue";
import LeftIcon from "vue-ionicons/dist/ios-arrow-back.vue";
import Form from "./form.vue";
import Header from "./header.vue";

import { MutationTypes } from "@admin/store/mutation";

export default defineComponent({
  name: "Setting2",
  components: {
    Input,
    SelectImage,
    Button,
    RightIcon,
    LeftIcon,
    Form,
    Header,
  },

  computed: {
    wish() {
      return this.$store.state.wish;
    },
    image() {
      return this.$store.state.image;
    },
  },

  setup() {
    return {
      images: [
        { url: "images/preview.png" }, 
        { url: "images/preview_2.png" },
        { url: "images/preview_3.png" },
        { url: "images/preview_4.png" },
      ],
    };
  },
  methods: {
    backStep() {
      this.$router.push("/create");
    },

    handleWish(data) {
      console.log(data);

      this.wish = data;
      this.$store.commit(MutationTypes.UPDATE_WISH, data);
    },

    handleImage(data) {
      console.log(data);

      this.image = data;
      this.$store.commit(MutationTypes.UPDATE_IMAGE, data);
    },

    handleNext(data: any) {
      console.log(data);
      this.$store.commit(MutationTypes.UPDATE_WISH, data.wish);
      this.$router.push("/create/step3");
    },
  },
});
</script>
