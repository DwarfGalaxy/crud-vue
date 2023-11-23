<script setup>
import { ref } from "vue";
import { errorMessage } from "../../../utils";
const snackbar = ref(true);
const text = ref("My timeout is set to 2000.");
const timeout = 2000;
</script>

<template>
  <div class="text-center">
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      v-if="errorMessage.error"
      :color="errorMessage.color"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
