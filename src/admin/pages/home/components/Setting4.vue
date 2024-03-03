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
                        <Button title="Copy" />
                        <Button title="Open" />
                       </div>
                    </div>

                </div>
                <div class="flex justify-end">
                    <Button title="Hoàn thành" @clickNext="nextStep" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Input from "../../../components/input.vue";
import Button from "../../../components/button.vue";
export default {
    name: "Setting3",
    components: {
        Input,
        Button
    },
    methods: {
        nextStep() {
            this.$router.push('/create')
        }
    }
}
</script>