<template>
    <div>
        <div>
            <h1 class="text-3xl text-gray-950 font-monte font-bold">Mật khẩu</h1>
            <h3 class="text=lg text-gray-500 font-monte">Tạo mã QR kèm lời chúc cho những người thân yêu
            </h3>
        </div>

        <div class="pt-8 h-full">
            <form class="flex flex-col h-full justify-between" @submit.prevent="handleNext($event)" ref="form_feed">
                <div>
                    <Input title="Mật khẩu" type="password" id="password" placeholder="*****" required
                        :defaultValue="password" />
                </div>
                <div class="flex justify-end gap-3">
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
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Input from "../../../components/input.vue";
import Button from "../../../components/button.vue";
import RightIcon from 'vue-ionicons/dist/ios-arrow-forward.vue'
import LeftIcon from 'vue-ionicons/dist/ios-arrow-back.vue'
import { mapGetters } from "vuex";
import { ref } from "vue";

export default {
    name: "Setting3",
    components: {
        Input,
        Button,
        RightIcon,
        LeftIcon
    },
    setup() {
        const form_feed = ref(null);
        return {
            form_feed,
            password: ""
        }
    },
    computed: {
        ...mapGetters(['get_password']),

        password: {
            get() {
                return this.get_password;
            }
        }
    },
    methods: {
        nextStep() {
            this.$router.push('/create/step4')
        },
        backStep() {
            this.$router.push('/create/step2')
        },
        save() {
            const formData = new FormData(this.form_feed);
            let data = {};

            formData.forEach(function (value, key) {
                data[key] = value;
            });

            console.log(data);

            this.$store.commit("update_password", data.password);
        },
        handleNext() {
            this.save();
            this.nextStep();
        }
    }
}
</script>