<template>
  <div>
    <div>
      <h1 class="text-3xl text-gray-950 font-monte font-bold">{{ title }}</h1>
      <h3 class="text=lg text-gray-500 font-monte">{{ subtitle }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    subtitle: String,
  },
});
</script>
