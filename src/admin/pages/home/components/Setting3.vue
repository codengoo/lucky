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
                <Button title="Tiếp tục" is_right />
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
    }
}
</script>