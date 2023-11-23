<script setup>
import { computed, onMounted } from "vue";
import { useDataStore } from "@/modules/admin-blogs/store";
import { useRoute } from "vue-router";
const route = useRoute();
const paramsId = parseInt(route.params.id);

const blogStore = useDataStore();
onMounted(() => {
  blogStore.fetchSingleData(paramsId);
});
const blogSingleData = computed(() => blogStore.data);
</script>

<template>
  <div v-if="blogSingleData">
    <p>Id :{{ blogSingleData.id }}</p>
    <p>Title: {{ blogSingleData.title }}</p>
    <p>Author: {{ blogSingleData.author }}</p>
  </div>
</template>
