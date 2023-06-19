<template>
  <p v-if="displayError" class="text-center text-red-700 text-xs tracking-wider pt-4">
    {{ errorMessage }}
  </p>

  <!-- Email starts -->
  <div class="mt-5">

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

  <!-- Password starts -->
  <div class="mt-2">

    <label for="password" class="ml-4 text-accent text-sm tracking-wide font-semibold font-sans">Confirm
      password</label>

    <div class="flex justify-center">
      <input type="password" class="w-64 h-7 mt-1.5 rounded bg-white text-black" v-model="confirmedPassword" required>
    </div>

  </div>

  <!-- Password ends -->
  <div class="mt-10 pb-5 flex justify-center">
    <button class="bg-accent uppercase tracking-widest font-semibold rounded w-36 h-8 text-neutral font-sans"
      @click.prevent="handleRegistrationSubmit">
      Register
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/authStore";

const email = ref('');
const password = ref('');
const confirmedPassword = ref('');
const displayError = ref(false);
const errorMessage = ref('');
const store = useAuthStore();

const handleRegistrationSubmit = async () => {
  // trim values for empty spacing
  const trimmedEmail = email.value.trim();
  const trimmedPassword = password.value.trim();
  const trimmedConfirmedPassword = confirmedPassword.value.trim();

  // check if empty values, if yes display errors
  if (!trimmedEmail || !trimmedPassword || !confirmedPassword) {
    displayError.value = true;
    email.value = '';
    password.value = '';
    confirmedPassword.value = '';
    errorMessage.value = 'Email and password required'
    return;
  }

  // request to api
  // request to api
  const request = await fetch('http://localhost:5000/api/v1/auth/register', {
    method: 'POST',
    'credentials': 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': trimmedEmail,
      'password': trimmedPassword,
      'password_confirmation': trimmedConfirmedPassword
    })
  });

  const response = await request.json();

  // Failed to register user
  if (response.message !== 'User successfully created') {
    // Email is taken
    if (response.message === 'The email has already been taken.') {
      displayError.value = true;
      email.value = '';
      password.value = '';
      confirmedPassword.value = '';
      errorMessage.value = 'Email address is taken'
      return;
    } else {
      displayError.value = true;
      email.value = '';
      password.value = '';
      confirmedPassword.value = '';
      errorMessage.value = 'Passwords does not match';
      return;
    }
  } else {
    displayError.value = true;
    email.value = '';
    password.value = '';
    confirmedPassword.value = '';
    errorMessage.value = 'Account successfully created';
    return;
  }


}
</script>