<template>
  <form
    class="flex flex-col justify-between h-full"
    ref="form_feed"
    @submit.prevent="handle_next"
  >
    <div>
      <slot name="input_area"></slot>
    </div>

    <div class="flex justify-end gap-2">
      <slot name="button_area"></slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "FormSetting",
  emits: ["next"],
  setup() {
    const form_feed = ref<HTMLFormElement>();

    return {
      form_feed,
    };
  },

  methods: {
    get_form_data() {
      const formData = new FormData(this.form_feed);
      let data = Object.fromEntries(formData.entries()) as Object;

      return data;
    },
    handle_next() {
      this.$emit("next", this.get_form_data());
    },
  },
});
</script>
