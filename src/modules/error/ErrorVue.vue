<script setup>
import { ref } from "vue";
import { errorMessage } from "../../../utils";
const snackbar = ref(true);
</script>

<template>
  <v-snackbar
    v-if="errorMessage.error"
    v-model="snackbar"
    :color="errorMessage.color"
  >
    <p class="text-center">{{ errorMessage.message }}</p>
  </v-snackbar>
</template>
