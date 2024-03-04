<template>
  <div>
    <Header
      title="Mật khẩu"
      subtitle="Tạo mã QR kèm lời chúc cho những người thân yêu"
    />

    <div class="pt-8 h-full">
      <FormSetting @next="handleNext">
        <template v-slot:input_area>
          <Input
            title="Mật khẩu"
            type="password"
            id="password"
            placeholder="*****"
            required
            :defaultValue="password"
          />
        </template>

        <template v-slot:button_area>
          <Button @onClick="backStep" type="Alternative" icon_center>
            <template v-slot:icon_center>
              <LeftIcon />
            </template>
          </Button>
          <Button title="Tạo thôi" icon submit>
            <template v-slot:icon>
              <RightIcon />
            </template>
          </Button>
        </template>
      </FormSetting>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Input from "@admin/components/input.vue";
import Button from "@admin/components/button.vue";
import RightIcon from "vue-ionicons/dist/ios-arrow-forward.vue";
import LeftIcon from "vue-ionicons/dist/ios-arrow-back.vue";
import Header from "./header.vue";
import FormSetting from "./form_setting.vue";

import { MutationTypes } from "@admin/store/mutation";

export default defineComponent({
  name: "Setting3",
  components: {
    Input,
    Button,
    RightIcon,
    LeftIcon,
    Header,
    FormSetting,
  },
  computed: {
    password() {
      return this.$store.state.password;
    },
  },
  methods: {
    backStep() {
      this.$router.push("/create/step2");
    },
    handleNext(data: any) {
      console.log(data);
      this.$store.commit(MutationTypes.UPDATE_PASSWORD, data.password);
      this.$router.push("/create/step4");
    },
  },
});
</script>
