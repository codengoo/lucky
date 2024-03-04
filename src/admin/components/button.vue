<template>
    <div class="">
        <button :type="submit ? 'submit' : 'button'" @click="$emit('onClick')"
            class="py-2.5 px-5 text-sm font-medium focus:z-10 focus:ring-4 focus:outline-none rounded-lg border text-center inline-flex items-center min-h-11"
            :class="type === 'Alternative'
            ? 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100'
            : 'text-white bg-blue-700 hover:bg-blue-800 border-blue-700 focus:ring-blue-300'">
            <span v-if="icon_start" class="me-2 text-lg flex flex-col justify-center">
                <slot name="icon_start"></slot>
            </span>
            <span v-if="icon_center" class="text-lg flex flex-col justify-center">
                <slot name="icon_center"></slot>
            </span>
            {{ title }}
            <span v-if="icon" class="ms-2 text-lg flex flex-col justify-center">
                <slot name="icon"></slot>
            </span>
        </button>
    </div>
</template>

<script>
export default {
    name: "Button",
    props: {
        title: String,
        type: String,
        icon: Boolean,
        icon_start: Boolean,
        icon_center: Boolean,
        submit: Boolean,
    },

}
</script>