<template>
  <p v-if="displayError" class="text-center text-red-700 text-xs tracking-wider pt-4">
    {{ errorMessage }}
  </p>

  <!-- Email starts -->
  <div class="mt-">

    <label for="email" class="ml-4 text-accent text-sm tracking-wide font-semibold font-sans">Email</label>

    <div class="flex justify-center">
      <input type="email" class="w-64 h-7 mt-1.5 rounded bg-white text-black" v-model="email" required>
    </div>

  </div>
  <!-- Email ends -->


  <!-- Password starts -->
  <div class="mt-2">

    <label for="password" class="ml-4 text-accent text-sm tracking-wide font-semibold font-sans">Password</label>

    <div class="flex justify-center">
      <input type="password" class="w-64 h-7 mt-1.5 rounded bg-white text-black" v-model="password" required>
    </div>

  </div>

  <!-- Password ends -->
  <div class="mt-10 pb-5 flex justify-center">
    <button class="bg-accent uppercase tracking-widest font-semibold rounded w-36 h-8 text-neutral font-sans"
      @click.prevent="handleLoginSubmit">
      Log in
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/authStore";


const email = ref('');
const password = ref('');
const displayError = ref(false);
const errorMessage = ref('');
const store = useAuthStore();

const handleLoginSubmit = async () => {
  // trim values for empty spacing
  const trimmedEmail = email.value.trim();
  const trimmedPassword = password.value.trim();

  // check if empty values, if yes display errors
  if (!trimmedEmail || !trimmedPassword) {
    // showLoading.value = false;
    displayError.value = true;
    password.value = '';
    return;
  }

  await fetch('http://localhost:5000/sanctum/csrf-cookie', {
    method: 'GET',
    'credentials': 'include'
  });

  // request to api
  const request = await fetch('http://localhost:5000/api/v1/auth/login', {
    method: 'POST',
    'credentials': 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': trimmedEmail,
      'password': trimmedPassword
    })
  });

  const response = await request.json();

  // check if servers database is running
  if (response.message.includes('mysql')) {
    displayError.value = true;
    errorMessage.value = 'Internal server errorr. Try again later'
    password.value = '';
    return;
  }

  if (!response.data.email) {
    displayError.value = true;
    errorMessage.value = 'Invalid email address or password';
    password.value = '';
    return;
  }
  // set the auth state
  store.setAuth(
    response.data.email,
    response.data.profile.first_name ? response.data.profile.first_name : '',
    response.data.profile.last_name ? response.data.profile.last_name : '',
  );

  await navigateTo('/dashboard')
}


</script>