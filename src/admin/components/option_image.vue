<template>
    <div class="cursor-pointer relative w-fit select-none flex-none">
        <div class="h-36 overflow-hidden rounded-xl w-fit">
            <img :src="window.WPLKPath.assets + 'images/preview.png'" class="h-full" />
        </div>

        <div class="absolute inset-y-2 end-0 pe-2">
            <input checked id="" type="checkbox" value="" name="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 ">
        </div>
    </div>
</template>

<script>
export default {
    name: "OptionImage",
}
</script>