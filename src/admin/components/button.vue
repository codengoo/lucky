<template>
    <div class="">
        <button v-if="back" type="button" @click="$emit('clickNext')"
            class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
            {{ title }}
        </button>
        <button v-else type="button" @click="$emit('clickNext')"
            class="py-2.5 px-5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 border border-blue-700 focus:outline-none focus:ring-blue-300 rounded-lg text-center inline-flex items-center">
            {{ title }}

            <svg class="w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        back: Boolean,
    },
    name: "Button"
}
</script>