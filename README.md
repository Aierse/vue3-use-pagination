# vue3-use-pagination

pagination hooks in vue3

# Installation

> npm i vue3-use-pagination

# Usage

```vue
<template>
  <table>
    <tr v-for="item in paginator.currentItems.value">
      <td>{{ item.name }}</td>
      <td>{{ item.value }}</td>
    </tr>
  </table>
  <v-indicator :paginator="paginator" />
</template>

<script setup>
import { ref } from "vue";
import { usePagination, VueIndicator } from "vue3-use-pagination";

const items = ref([
  {
    name: "sample1",
    value: 10,
  },
  {
    name: "sample2",
    value: 20,
  },
  {
    name: "sample3",
    value: 30,
  },
  {
    name: "sample4",
    value: 40,
  },
  {
    name: "sample5",
    value: 50,
  },
  {
    name: "sample6",
    value: 60,
  },
]);

const paginator = usePagination(items, 3, 10);
</script>
```
