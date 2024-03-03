<script setup>
import Input from "../../../components/input.vue";
import Select from "../../../components/select.vue";
import Button from "../../../components/button.vue";
</script>

<template>
    <div>
        <div>
            <h1 class="text-3xl text-gray-950 font-monte font-bold">Thông tin tài khoản</h1>
            <h3 class="text=lg text-gray-500 font-monte">Tạo mã QR kèm lời chúc cho những người thân yêu
            </h3>
        </div>

        <div class="pt-8 h-full">
            <form class="flex flex-col justify-between h-full">
                <div>
                    <Select title="Ngân hàng" id="bank" placeholder="Chọn một ngân hàng" />
                    <Input title="Số tài khoản" type="number" id="stk" placeholder="0123456789" required />
                    <Input title="Chủ sở hữu" type="text" id="fullname" placeholder="Trịnh Văn Mớt" required />
                </div>
                <Button title="Tiếp tục" is_right />
            </form>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Setting1'
}
</script>