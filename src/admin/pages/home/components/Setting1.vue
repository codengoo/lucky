<template>
  <div>
    <Header
      title="Thông tin tài khoản"
      subtitle="Tạo mã QR kèm lời chúc cho những người thân yêu"
    />

    <div class="pt-8 h-full">
      <FormSetting @next="handleNext">
        <template v-slot:input_area>
          <Select
            title="Ngân hàng"
            id="bank"
            placeholder="Chọn một ngân hàng"
            :data="banks"
            :defaultValue="account.bank"
          />
          <Input
            title="Số tài khoản"
            type="number"
            id="acc_number"
            placeholder="0123456789"
            required
            :defaultValue="account.acc_number"
          />
          <Input
            title="Chủ sở hữu"
            type="text"
            id="acc_name"
            placeholder="Trịnh Văn Mớt"
            required
            :defaultValue="account.acc_name"
          />
        </template>

        <template v-slot:button_area>
          <Button title="Tiếp tục" icon submit>
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
import Select from "@admin/components/select.vue";
import Button from "@admin/components/button.vue";
import Header from "./header.vue";
import FormSetting from "./form_setting.vue";
import RightIcon from "vue-ionicons/dist/ios-arrow-forward.vue";

import { getBankBins } from "../utils";
import { IAccount } from "@/admin/store/state";
import { MutationTypes } from "@admin/store/mutation";

export default defineComponent({
  name: "Setting1",
  components: {
    Input,
    Select,
    Button,
    Header,
    RightIcon,
    FormSetting,
  },
  data() {
    return {
      banks: [],
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  methods: {
    fetchData() {
      getBankBins().then((data) => {
        // @ts-ignore
        this.banks = data;
      });
    },

    handleNext(data: IAccount) {
      console.log(data);
      this.$store.commit(MutationTypes.UPDATE_ACCOUNT, data);
      this.$router.push("/create/step2");
    },
  },
});
</script>
