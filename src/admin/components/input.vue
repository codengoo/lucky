<template>
    <div class="mb-5">
        <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{ title }}</label>
        <div class="relative">
            <input :type="type" :required="required" :id="id" :placeholder="placeholder"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 hidden-input-btn">

            <div class="absolute inset-y-0 end-0 pe-2.5 flex items-center cursor-pointer">
                <button>
                    <svg class="w-6 h-6 text-gray-800 hover:text-blue-600" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                            d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        type: String,
        required: Boolean,
        id: String,
        placeholder: String,
    },
    name: "Input"
}
</script>