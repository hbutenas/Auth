<template>
  <div>
    <div class="users-content">
      <table class="table caption-top">
        <caption>
          <strong>List of users</strong>
        </caption>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user">
            <th scope="row">{{ user.user_id }}</th>
            <td>{{ user.username }}</td>
            <td>{{ user.role }}</td>
            <td>
              <router-link
                :to="{ name: 'UserDetails', params: { id: user.user_id } }"
              >
                <button type="button" class="button btn-sm update">
                  Update
                </button>
              </router-link>
              <router-link :to="{ params: { id: user.user_id } }">
                <button
                  type="button"
                  class="button btn-sm delete"
                  @click="deleteUser"
                >
                  Delete
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserDetails from '../users/UserDetails.vue';
import { ref } from 'vue';

export default {
  components: {
    UserDetails
  },
  async setup() {
    const users = ref([]);
    try {
      const response = await fetch('http://localhost:5555/api/v1/users', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      users.value = data.response;
    } catch (e) {
      // TODO
      // Complete this, if it failed provide some message..
      console.log('fails');
    }

    const deleteUser = () => {
      console.log('deleting..');
    };
    return { users, deleteUser };
  }
};
</script>

<style scoped>
button {
  border: none;
}
.button.btn-sm.update {
  /* color: #42b983; */
  color: white;
  font-weight: bold;
  background: #42b983;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  font-size: 0.65em;
  margin-right: 30px;
}
.button.btn-sm.delete {
  /* color: #42b983; */
  color: white;
  font-weight: bold;
  background: red;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-decoration: none;
  font-size: 0.65em;
}

/* td:nth-child(4) { */
/* text-align: right; */
/* } */
</style>
