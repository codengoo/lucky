<template>
  <div>
    <Header
      title="Thông tin tài khoản"
      subtitle="Tạo mã QR kèm lời chúc cho những người thân yêu"
    />

    <div class="pt-8 h-full">
      <Form @next="handleNext">
        <template v-slot:input_area>
          <Select
            title="Ngân hàng"
            id="bank"
            placeholder="Chọn một ngân hàng"
            :data="banks"
            :defaultValue="bank"
            @update:model-value="handleBank"
          />
          <Input
            title="Số tài khoản"
            type="number"
            id="acc_number"
            placeholder="0123456789"
            required
            :defaultValue="acc_number"
            @update:model-value="handleAccNumber"
          />
          <Input
            title="Chủ sở hữu"
            type="text"
            id="acc_name"
            placeholder="Trịnh Văn Mớt"
            required
            :defaultValue="acc_name"
            @update:model-value="handleAccName"
          />
        </template>

        <template v-slot:button_area>
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
import Select from "@admin/components/select.vue";
import Button from "@admin/components/button.vue";
import Header from "./header.vue";
import Form from "./form.vue";
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
    Form,
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
    acc_number() {
      return this.$store.state.account.acc_number;
    },
    acc_name() {
      return this.$store.state.account.acc_name;
    },
    bank() {
      return this.$store.state.account.bank;
    },
  },
  methods: {
    fetchData() {
      getBankBins().then((data) => {
        // @ts-ignore
        this.banks = data;
      });
    },

    handleAccNumber(data: string) {
      this.acc_number = data;

      this.$store.commit(MutationTypes.UPDATE_ACCOUNT, {
        bank: this.bank,
        acc_name: this.acc_name,
        acc_number: data,
        bank_short: this.$store.state.account.bank_short,
      });
    },

    handleAccName(data: string) {
      this.acc_name = data;
      this.$store.commit(MutationTypes.UPDATE_ACCOUNT, {
        bank: this.bank,
        acc_name: data,
        acc_number: this.acc_number,
        bank_short: this.$store.state.account.bank_short,
      });
    },

    handleBank(data: string) {
      this.bank = data;

      this.$store.commit(MutationTypes.UPDATE_ACCOUNT, {
        bank: data,
        acc_name: this.acc_name,
        acc_number: this.acc_number,
        // @ts-ignore
        bank_short:
          // @ts-ignore
          this.banks.filter((item) => item.bin === data)[0].shortName,
      });
    },

    handleNext(data: IAccount) {
      console.log(data);
      this.$router.push("/create/step2");
    },
  },
});
</script>
