<template>
  <div class="indicator">
    <button @click="first">&lt;&lt;</button>
    <button @click="prev">&lt;</button>
    <label v-for="page in currentPages">
      <input
        type="radio"
        :name="UUID"
        @change="pageChangeEvent(page)"
        :checked="now === page"
      />
      <span>{{ page }}</span>
    </label>
    <button @click="next">></button>
    <button @click="last">>></button>
  </div>
</template>

<script setup>
import { uuid } from "vue3-uuid";
const UUID = uuid.v1();

const props = defineProps(["items", "paginator"]);

const { now, first, prev, next, last, currentPages, pageChangeEvent } =
  props.paginator;
</script>
