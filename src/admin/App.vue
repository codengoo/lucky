<script setup>
import Input from "./components/input.vue";
import Select from "./components/select.vue";
import Button from "./components/button.vue";
</script>

<template>
    <div class="mt-20">
        <div class="w-full flex justify-center">
            <div class="h-[70vh] bg-white shadow-lg border border-gray-200 rounded-2xl overflow-hidden flex">
                <div class="max-w-96 rounded-r-2xl overflow-hidden ">
                    <img class="h-full" :src="window.WPLKPath.assets + 'images/preview.png'">
                </div>

                <div class="p-8">
                    <div>
                        <h1 class="text-3xl text-gray-950 font-monte font-bold">Thông tin tài khoản</h1>
                        <h3 class="text=lg text-gray-500 font-monte">Tạo mã QR kèm lời chúc cho những người thân yêu
                        </h3>
                    </div>

                    <div class="py-8 h-full">
                        <form class="flex flex-col justify-between h-full">
                            <div>
                                <Select title="Ngân hàng" id="bank" placeholder="Chọn một ngân hàng" />
                                <Input title="Số tài khoản" type="number" id="stk" placeholder="0123456789" required />
                                <Input title="Chủ sở hữu" type="text" id="fullname" placeholder="Trịnh Văn Mớt"
                                    required />
                            </div>
                            <Button title="Tiếp tục" is_right />
                        </form>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'App'
}
</script>