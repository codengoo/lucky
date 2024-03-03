<template>
    <div>
        <div>
            <h1 class="text-3xl text-gray-950 font-monte font-bold">Xong rùi!</h1>
            <h3 class="text=lg text-gray-500 font-monte">Tạo mã QR kèm lời chúc cho những người thân yêu
            </h3>
        </div>

        <div class="pt-8 h-full">
            <form class="flex flex-col h-full justify-between">
                <div>
                    <div class="flex items-end gap-2">
                        <Input title="Lời chúc" type="password" id="wish" placeholder="Chúc mừng bạn" required
                            disabled />
                        <div class="mb-5 flex gap-2">
                            <Button @onClick="nextStep" icon_center type="Alternative">
                                
                                <template v-slot:icon_center>
                                    <OpenIcon />
                                </template>
                            </Button>
                            <Button @onClick="nextStep" icon_center>
                                <template v-slot:icon_center>
                                    <CopyIcon />
                                </template>
                            </Button>
                        </div>
                    </div>

                </div>
                <div class="flex justify-end gap-3">
                    <Button title="Hoàn thành" @onClick="nextStep" icon>

                        <template v-slot:icon>
                            <CheckIcon />
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
import CheckIcon from "vue-ionicons/dist/ios-happy.vue"
import CopyIcon from "vue-ionicons/dist/ios-copy.vue"
import OpenIcon from "vue-ionicons/dist/ios-open.vue"
export default {
    name: "Setting3",
    components: {
        Input,
        Button,
        CheckIcon,
        CopyIcon,
        OpenIcon
    },
    methods: {
        nextStep() {
            this.$router.push('/create')
        }
    }
}
</script>