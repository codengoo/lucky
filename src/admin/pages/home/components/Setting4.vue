<template>
  <div>
    <Header
      title="Xong rùi!"
      subtitle="Tạo mã QR kèm lời chúc cho những người thân yêu"
    />

    <div class="pt-8 h-full">
      <FormSetting @next="handleNext">
        <template v-slot:input_area>
          <div class="flex items-end gap-2">
            <Input
              title="Link của bạn đây"
              type="text"
              id="link"
              :defaultValue="link"
              disabled
            />

            <div class="mb-5 flex gap-2">
              <Button @onClick="open" icon_center type="Alternative">
                <template v-slot:icon_center>
                  <OpenIcon />
                </template>
              </Button>
              <Button @onClick="copy" icon_center>
                <template v-slot:icon_center>
                  <CopyIcon />
                </template>
              </Button>
            </div>
          </div>
        </template>

        <template v-slot:button_area>
          <Button title="Hoàn thành" @onClick="handleNext" icon>
            <template v-slot:icon>
              <CheckIcon />
            </template>
          </Button>
        </template>
      </FormSetting>
    </div>
  </div>
</template>

<script>
import Input from "@admin/components/input.vue";
import Button from "@admin/components/button.vue";
import Header from "./header.vue";
import FormSetting from "./form_setting.vue";

import CheckIcon from "vue-ionicons/dist/ios-happy.vue";
import CopyIcon from "vue-ionicons/dist/ios-copy.vue";
import OpenIcon from "vue-ionicons/dist/ios-open.vue";

export default {
  name: "Setting3",
  components: {
    Input,
    Button,
    CheckIcon,
    CopyIcon,
    OpenIcon,
    Header,
    FormSetting,
  },
  computed: {
    link() {
      return this.$store.state.link;
    },
  },
  methods: {
    copy() {
      window.navigator.clipboard.writeText(this.$store.state.link);
    },
    open() {
      window.open(this.$store.state.link);
    },
    handleNext() {
      this.$router.push("/create");
    },
  },
};
</script>
