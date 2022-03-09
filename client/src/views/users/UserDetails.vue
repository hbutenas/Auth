<template>
  <div>
    <form>
      <label>Email</label>
      <input type="email" v-model="email" />
      <label>Username</label>
      <input type="text" v-model="username" />
      <label>Role</label>
      <input type="text" v-model="role" />
      <div>
        <button>Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import { onBeforeMount } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  props: ['id'],
  setup(props) {
    const router = useRouter();
    const username = ref('');
    const email = ref('');
    const role = ref('');

    onBeforeMount(async () => {
      try {
        const response = await fetch(
          'http://localhost:5555/api/v1/users/' + props.id,
          {
            method: 'GET',
            credentials: 'include'
          }
        );
        const data = await response.json();

        username.value = data.response[0].username;
        email.value = data.response[0].email;
        role.value = data.response[0].role;
      } catch (e) {
        // console.error(e);
        console.log('Something went wrong userDetails..');
      }
    });
    return { username, email, role };
  }
};
</script>

<style scoped>
form {
  max-width: 570px;
  margin: 100px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #42b983;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
input:focus {
  outline: none;
}
button {
  background: #42b983;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
</style>
