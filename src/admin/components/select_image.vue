<template>
  <div class="flex flex-row overflow-x-scroll gap-4 py-5">
    <OptionImage
      v-for="item in data"
      @update:model-value="handleChange"
      :value="item.url"
      :defaultValue="defaultValue"
    />
  </div>
</template>

<script>
import OptionImage from "./option_image.vue";
export default {
  name: "SelectImage",
  components: {
    OptionImage,
  },
  props: {
    data: Array,
    defaultValue: String
  },
  methods: {
    handleChange(data) {
      this.$emit("update:model-value", data);
    },
  },
};
</script>
