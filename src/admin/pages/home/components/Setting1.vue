<template>
    <div>
        <div>
            <h1 class="text-3xl text-gray-950 font-monte font-bold">Thông tin tài khoản</h1>
            <h3 class="text=lg text-gray-500 font-monte">Tạo mã QR kèm lời chúc cho những người thân yêu
            </h3>
        </div>

        <div class="pt-8 h-full">
            <form class="flex flex-col justify-between h-full" @submit.prevent="handleNext($event)" ref="form_feed">
                <div>
                    <Select title="Ngân hàng" id="bank" placeholder="Chọn một ngân hàng" :data="banks"
                        :defaultValue="form.bank" />
                    <Input title="Số tài khoản" type="number" id="acc_number" placeholder="0123456789" required
                        :defaultValue="form.acc_number" />
                    <Input title="Chủ sở hữu" type="text" id="acc_name" placeholder="Trịnh Văn Mớt" required
                        :defaultValue="form.acc_name" />
                </div>
                <div class="flex justify-end">
                    <Button title="Tiếp tục" icon submit>
                        <template v-slot:icon>
                            <RightIcon />
                        </template>
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import Input from "@admin/components/input.vue";
import Select from "@admin/components/select.vue";
import Button from "@admin/components/button.vue";
import RightIcon from 'vue-ionicons/dist/ios-arrow-forward.vue'

import axios from "axios";
import { ref } from "vue";
import { mapGetters } from "vuex";

export default {
    name: 'Setting1',
    components: {
        Button, Input, Select, RightIcon
    },
    data() {
        return {
            banks: []
        }
    },
    setup() {
        const form_feed = ref(null);
        return {
            form_feed,
            form: {
                bank: "",
                acc_number: "",
                acc_name: ""
            }
        }
    },
    mounted() {
        this.fetchData();
    },

    computed: {
        ...mapGetters(['get_account']),

        form: {
            get() {
                return this.get_account;
            }
        }
    },

    methods: {
        async fetchData() {
            this.banks = await this.getBankBins();
        },

        async getBankBins() {
            const response = await axios.get("https://api.vietqr.io/v2/banks");

            if (response.status == 200) {
                const data = response.data.data;
                return data.map(item => ({
                    id: item.id,
                    name: item.name,
                    short_name: item.shortName,
                    bin: item.bin,
                    logo: item.logo
                }));
            } else {
                return []
            }
        },

        nextStep() {
            this.$router.push('/create/step2')
        },

        save() {
            const formData = new FormData(this.form_feed);
            let data = {};

            formData.forEach(function (value, key) {
                data[key] = value;
            });

            console.log(data);

            this.$store.commit("update_account", data);
        },

        handleNext() {
            this.save();
            this.nextStep();
        }
    }
}
</script>