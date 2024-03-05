<template>
  <div>
    <Header
      title="Mật khẩu"
      subtitle="Tạo mã QR kèm lời chúc cho những người thân yêu"
    />

    <div class="pt-8 h-full">
      <Form @next="handleNext">
        <template v-slot:input_area>
          <Input
            title="Mật khẩu"
            type="password"
            id="password"
            placeholder="*****"
            required
            :defaultValue="password"
            @update:model-value="handlePassword"
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
      </Form>
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
import Form from "./form.vue";

import { MutationTypes } from "@admin/store/mutation";
import { createCard } from "../utils";

export default defineComponent({
  name: "Setting3",
  components: {
    Input,
    Button,
    RightIcon,
    LeftIcon,
    Header,
    Form,
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

    handlePassword(data) {
      console.log(data);

      this.password = data.password;
      this.$store.commit(MutationTypes.UPDATE_PASSWORD, data);
    },

    handleNext(data: any) {
      console.log(data);
      console.log(this.$store.state);
      createCard(this.$store.state).then((data) => {
        console.log(data);
        
        if (data.ok) {
          this.$store.commit(MutationTypes.UPDATE_LINK, data.link);
          this.$router.push("/create/step4");
        } else {
          alert("Không thể tạo link");
        }
      });
    },
  },
});
</script>
