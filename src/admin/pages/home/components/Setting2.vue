<template>
    <div>
        <div>
            <h1 class="text-3xl text-gray-950 font-monte font-bold">Phong bao</h1>
            <h3 class="text=lg text-gray-500 font-monte">Tạo mã QR kèm lời chúc cho những người thân yêu
            </h3>
        </div>

        <div class="pt-8 h-full">
            <form class="flex flex-col h-full justify-between">
                <div>
                    <Input title="Lời chúc" type="text" id="wish" placeholder="Chúc mừng bạn" required />
                    <SelectImage />
                </div>
                <div class="flex justify-end gap-3">
                    <Button title="Trước" @clickNext="backStep" back/>
                    <Button title="Tiếp tục" @clickNext="nextStep"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Input from "../../../components/input.vue";
import SelectImage from "../../../components/select_image.vue";
import Button from "../../../components/button.vue";

export default {
    name: "Setting2",
    components: {
        Input,
        SelectImage,
        Button
    },
    methods: {
        nextStep(){
            this.$router.push('/create/step3')
        },
        backStep(){
            console.log("ssss");
            this.$router.push('/create')
        }
    }
}
</script>