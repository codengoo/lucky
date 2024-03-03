<template>
    <div ref="el">
        <div>
            <h1 class="text-3xl text-gray-950 font-monte font-bold">Thông tin tài khoản</h1>
            <h3 class="text=lg text-gray-500 font-monte">Tạo mã QR kèm lời chúc cho những người thân yêu
            </h3>
        </div>

        <div class="pt-8 h-full">
            <form class="flex flex-col justify-between h-full">
                <div>
                    <Select title="Ngân hàng" id="bank" placeholder="Chọn một ngân hàng" :data="banks" />
                    <Input title="Số tài khoản" type="number" id="stk" placeholder="0123456789" required />
                    <Input title="Chủ sở hữu" type="text" id="fullname" placeholder="Trịnh Văn Mớt" required />
                </div>
                <div class="flex justify-end">
                    <Button title="Tiếp tục" @onClick="nextStep" icon>
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
    mounted() {
        this.setup();
    },
    methods: {
        async setup() {
            // this.banks = await this.getBankBins();
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
        }
    }
}
</script>