<template>
    <div>
        <div>
            <h1 class="text-3xl text-gray-950 font-monte font-bold">Mật khẩu</h1>
            <h3 class="text=lg text-gray-500 font-monte">Tạo mã QR kèm lời chúc cho những người thân yêu
            </h3>
        </div>

        <div class="pt-8 h-full">
            <form class="flex flex-col h-full justify-between">
                <div>
                    <Input title="Lời chúc" type="password" id="wish" placeholder="Chúc mừng bạn" required />
                    <SelectImage />
                </div>
                <div class="flex justify-end gap-3">
                    <Button @onClick="backStep" type="Alternative" icon_center>
                        <template v-slot:icon_center>
                            <LeftIcon />
                        </template>
                    </Button>
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
import Input from "../../../components/input.vue";
import Button from "../../../components/button.vue";
import RightIcon from 'vue-ionicons/dist/ios-arrow-forward.vue'
import LeftIcon from 'vue-ionicons/dist/ios-arrow-back.vue'
export default {
    name: "Setting3",
    components: {
        Input,
        Button,
        RightIcon,
        LeftIcon
    },
    methods: {
        nextStep() {
            this.$router.push('/create/step4')
        },
        backStep() {
            console.log("ssss");
            this.$router.push('/create/step2')
        }
    }
}
</script>