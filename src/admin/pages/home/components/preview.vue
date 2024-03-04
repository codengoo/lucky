<template>
    <div class="max-w-96 rounded-2xl overflow-hidden shadow-xl">
        <img class="h-full" :src="window.WPLKPath.assets + 'images/preview.png'">
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Preview',
})
</script>