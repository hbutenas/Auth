<template>
  <form class="w-72 bg-primary rounded-lg shadow-lg shadow-[#FFFFFF]" @submit.prevent="$emit('authEmit')">
    <div class="flex pt-3">

      <div class="flex-1 text-center text-accent text-sm tracking-wide font-semibold font-sans">
        <button class="uppercase tracking-widest" @click.prevent="loginAction = true">
          Login
        </button>
      </div>

      <p class="-m-1">|</p>

      <div class="flex-1 text-center text-accent text-sm tracking-wide font-semibold font-sans">
        <button class="uppercase tracking-widest" @click.prevent="loginAction = false">
          Register
        </button>
      </div>
    </div>
    <slot>
      <LoginComponent v-if="loginAction" />
      <RegisterComponent v-else />
    </slot>

  </form>
</template>

<script setup>

import { ref } from "vue";
const loginAction = ref(true);

</script>
