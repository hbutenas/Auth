<template>
  <div class="container">
    <div class="container move-back">
      <button
        class="back"
        @click="
          {
            $router.go(-1);
          }
        "
      >
        Back
      </button>
    </div>
    <form @submit.prevent="handleSubmit">
      <!-- error message -->
      <p class="error-message" v-if="failedLogin">
        Username or email address already exists
      </p>

      <!-- email -->
      <label for="email" id="username">Email</label>
      <input type="email" required v-model="email" />

      <!-- username -->
      <label for="username" id="username">Username</label>
      <input type="text" required v-model="username" />

      <!-- password -->
      <label for="username" id="password">Password</label>
      <input type="password" required v-model="password" />

      <div class="submit">
        <button>Register</button>
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
    let email = ref('');
    let password = ref('');
    let failedLogin = ref(false);

    const handleSubmit = async () => {
      if (
        username.value.trim() === '' ||
        password.value.trim() === '' ||
        email.value.trim() === ''
      ) {
        failedLogin.value = true;
      }

      const response = await fetch(
        'http://localhost:5555/api/v1/auth/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            email: email.value,
            username: username.value,
            password: password.value
          })
        }
      );
      if (!response.ok) failedLogin.value = true;

      if (response.status === 201) {
        await router.push({ name: 'Home' });
      }
    };

    return {
      username,
      password,
      email,
      failedLogin,
      handleSubmit
    };
  }
};
</script>

<style scoped>
form {
  max-width: 650px;
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
  text-align: right;
}
.error-message {
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  color: #ff0000;
  text-align: center;
}
.container.move-back {
  display: grid;
  grid-template-columns: repeat(12, 0.2fr);
}
.back {
  grid-column: 4/5;
  margin-left: 30px;
  width: 100px;
}
</style>
