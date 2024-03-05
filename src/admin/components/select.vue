<template>
  <div class="mb-5">
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{
      title
    }}</label>
    <select
      :id="id"
      :required="required"
      :name="id"
      :value="defaultValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    >
      <option value="0" selected>{{ placeholder }}</option>
      <option v-if="data" v-for="item in data" :value="item.bin">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { data } from "autoprefixer";

export default {
  name: "Select",
  props: {
    value: String,
    title: String,
    placeholder: String,
    required: Boolean,
    id: String,
    data: Array,
    defaultValue: String,
  },
};
</script>
