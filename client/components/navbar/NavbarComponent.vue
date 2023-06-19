<template>
  <div class="container m-auto mt-10">

    <div class="flex justify-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0">
          <div class="rounded-full">
            <kbd class="kbd text-secondary text-md">{{ emailFirstLetter }}</kbd>

            <!-- Updated profile message -->
            <div class="toast toast-top toast-end mt-20 animate-pulse">
              <div v-if="profileFailedUpdate" class="alert h-8 alert-warning">
                <div>
                  <span>Nothing to update</span>
                </div>
              </div>

              <div v-if="profileSuccessfullyUpdated" class="alert h-8 alert-success">
                <div>
                  <span>Profile successfully updated</span>
                </div>
              </div>
            </div>

          </div>

        </label>

        <ul tabindex="0"
          class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-secondary">

          <li>
            <!-- Button to open modal -->
            <label for="profile-modal">Profile</label>

          </li>

          <li>
            <NuxtLink to="/" @click="handleLogout">Logout</NuxtLink>
          </li>

        </ul>
      </div>
    </div>

    <div class="flex mt-10 justify-center">
      <p v-if="firstName" class="text-md font-sans font-semibold tracking-wider">Welcome back, <span
          class="text-primary">{{
            firstName }}</span></p>
      <!-- TODO complete the message when user <profile> is not done-->
      <p v-else class="text-md font-sans font-semibold tracking-wider">
      </p>
    </div>


    <div class="flex">
      <input type="checkbox" id="profile-modal" class="modal-toggle" />
      <ProfileComponent class="modal" @updatingProfile="handleUpdatedProfile" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/authStore";

const store = useAuthStore();

const emailFirstLetter = ref(store.getAuth.email.charAt(0).toUpperCase());
const firstName = ref(store.getAuth.firstName);
const profileSuccessfullyUpdated = ref(false);
const profileFailedUpdate = ref(false);

// Receiving value from child component, according to the true or false the message will be displayed
const handleUpdatedProfile = (value) => {
  console.log(value);
  // Check if the value is true - if it is - display a notification that profile is updated
  if (value === 'success') {
    console.log('suveikiau');
    // Update the firstName after update
    firstName.value = store.getAuth.firstName;

    profileSuccessfullyUpdated.value = true;

    setTimeout(() => {
      profileSuccessfullyUpdated.value = false;
    }, 4500);
    // Display the notification, that profile is successfully updated
  } else {
    profileFailedUpdate.value = true;

    setTimeout(() => {
      profileFailedUpdate.value = false;
    }, 4500);
  }

  // Display notification that profile was not updated
}

const handleLogout = async () => {
  // reset state
  store.setAuth('', '', '');

  // make request to api to log out
  await fetch('http://localhost:5000/api/v1/auth/logout', {
    method: 'POST',
    'credentials': 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });


  // make sure that redirected back to /
  return navigateTo('/');
}
</script>