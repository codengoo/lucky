<template>
    <div class="mb-5">
        <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{ title }}</label>
        <select :id="id" :required="required"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option selected>{{ placeholder }}</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        value: String,
        title: String,
        placeholder: String,
        required: Boolean,
        id: String,
    },
    name: 'Select',
}
</script>