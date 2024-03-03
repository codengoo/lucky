<template>
    <div class="flex flex-row overflow-x-scroll gap-4">
        <OptionImage />
        <OptionImage />
        <OptionImage />
        <OptionImage />
        <OptionImage />
        <OptionImage />
    </div>
</template>

<script>
import OptionImage from "./option_image.vue";
export default {
    name: 'SelectImage',
    components: {
        OptionImage
    }
}
</script>