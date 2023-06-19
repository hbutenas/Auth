<template>
  <div class="flex h-screen">
    <div class="m-auto">
      <AuthComponent />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const loginAction = ref('true');

const listenAuthAction = (value) => {
  value === 'register' ? loginAction.value = false : loginAction.value = true;
}
</script>