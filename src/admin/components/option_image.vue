<template>
  <div class="cursor-pointer relative w-fit select-none flex-none">
    <div class="h-36 overflow-hidden rounded-xl w-fit">
      <img :src="window.WPLKPath.assets + value" class="h-full" />
    </div>

    <div class="absolute inset-y-2 end-0 pe-2">
      <input
        id="default-radio-1"
        type="radio"
        name="image"
        :value="value"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
        :checked="value === defaultValue"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "OptionImage",
  props: {
    value: String,
    defaultValue: String,
  },
});
</script>
