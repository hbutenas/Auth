<template>
  <div class="flex">
    <div class="modal-box rounded shadow-md shadow-[#FFFFFF] w-96">

      <h3 class="text-primary text-sm tracking-wide font-semibold mb-3">Update profile</h3>

      <form class="flex flex-col">
        <label for="" class="tracking-wide">First name</label>
        <input type="text" class="bg-white text-black rounded my-2" v-model="firstName">
        <label for="" class="tracking-wide">Last name</label>
        <input type="text" class="bg-white text-black rounded my-2" v-model="lastName">
      </form>


      <div class="modal-action">
        <label for="profile-modal" class="btn btn-sm btn-success" @click="handleUpdateProfile">Update</label>
        <label for="profile-modal" class="btn btn-sm btn-error">Close</label>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/store/authStore";
const store = useAuthStore();

const firstName = ref(store.getAuth.firstName);
const lastName = ref(store.getAuth.lastName);

const emits = defineEmits([
  'updatingProfile'
]);

const handleUpdateProfile = async () => {

  // To avoid unnecessary requests, double check if the firstName and lastName does not match with the previous ones
  if (firstName.value === store.getAuth.firstName && lastName.value === store.getAuth.lastName) {
    // send back to parent that nothing was updated
    emits('updatingProfile', 'failed');
    return;
  } if (firstName.value !== store.getAuth.firstName && lastName.value === store.getAuth.lastName) { // First name was updated, last name not
    await updateProfileRequest('firstName');
    return;
  } else if (lastName.value !== store.getAuth.lastName && firstName.value === store.getAuth.firstName) { // Last name was updated, first name not
    await updateProfileRequest('lastName');
    return;
  } else { // Both of them were updated
    await updateProfileRequest('fully');
  }
}

const updateProfileRequest = async (updatableProperty) => {
  if (updatableProperty === 'firstName') {
    // send request to update profile
    await fetch('http://localhost:5000/api/v1/profile', {
      method: 'PATCH',
      'credentials': 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'first_name': firstName.value,
        'lastName': store.getAuth.lastName
      })
    });

    // update  store
    store.setAuth(store.getAuth.email, firstName.value, store.getAuth.lastName);

    // send back to parent that profile was updated
    emits('updatingProfile', 'success');
  } else if (updatableProperty === 'lastName') {
    // send request to update profile
    await fetch('http://localhost:5000/api/v1/profile', {
      method: 'PATCH',
      'credentials': 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'first_name': store.getAuth.firstName,
        'lastName': lastName.value
      })
    });

    // update  store
    store.setAuth(store.getAuth.email, store.getAuth.firstName, lastName.value);

    // send back to parent that profile was updated
    emits('updatingProfile', 'success');
  } else {
    // send request to update profile
    await fetch('http://localhost:5000/api/v1/profile', {
      method: 'PATCH',
      'credentials': 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'first_name': firstName.value,
        'lastName': lastName.value
      })
    });

    // update  store
    store.setAuth(store.getAuth.email, firstName.value, lastName.value);

    // send back to parent that profile was updated
    emits('updatingProfile', 'success');
  }
}


</script>