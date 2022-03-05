<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <!-- error message -->
      <p class="error-message" v-if="failedLogin">
        Username or password incorrect
      </p>

      <!-- username -->
      <label for="username" id="username">Username</label>
      <input type="text" required v-model="username" />

      <!-- password -->
      <label for="username" id="password">Password</label>
      <input type="password" required v-model="password" />

      <div class="submit">
        <button>Sign in</button>
      </div>

      <!-- register -->
      <div class="register">
        <p>Still not registered user?</p>
        <br />
        <router-link :to="{ name: 'Register' }">Register now</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();
    let username = ref('');
    let password = ref('');
    let failedLogin = ref(false);

    const handleSubmit = async () => {
      if (username.value.trim() === '' || password.value.trim() === '') {
        failedLogin.value = true;
      }

      const response = await fetch('http://localhost:5555/api/v1/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username.value,
          password: password.value
        })
      });

      if (!response.ok) failedLogin.value = true;

      if (response.status === 200) {
        await router.push({ name: 'Dashboard' });
      }
    };

    return { username, password, failedLogin, handleSubmit };
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
.submit {
  text-align: center;
}
.error-message {
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  color: #ff0000;
  text-align: center;
}

.register p,
a {
  color: #42b983;
  display: inline-block;
  /* margin: 25px 0 15px; */
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}

.register {
  text-align: right;
}
</style>
