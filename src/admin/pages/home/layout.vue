<template>
    <div>
        <div class="mt-20">
            <div class="w-full flex justify-center">
                <div class="h-[70vh] bg-white shadow-lg border border-gray-200 rounded-3xl overflow-hidden flex">
                    <div class="p-2 ps-5 flex justify-center items-center">
                        <Preview />
                    </div>
                    <router-view class="p-8 pl-10 max-w-96 re-scroll flex flex-col" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import Preview from "./components/preview.vue";

export default defineComponent({
    name: "HomeLayout",
    components: {
        Preview
    }
})
</script>