<script setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import ErrorVue from "@/modules/error/ErrorVue.vue";
</script>

<template>
  <v-app>
    <default-bar />
    <ErrorVue />
    <default-view />
  </v-app>
</template>
