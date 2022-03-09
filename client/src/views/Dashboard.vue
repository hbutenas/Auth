<template>
  <div class="container m-4">
    <h3>Dashboard</h3>
    <h6>
      {{ $store.state.username }}
      <a href="" @click="handleLogout">Logout</a>
    </h6>
    <aside>
      <nav>
        <ul v-if="$store.state.role === 'Owner'">
          <li><a href="" @click.prevent="loadUsers">Users</a></li>
        </ul>
        <ul v-else>
          <p>BBD</p>
        </ul>
      </nav>
    </aside>
    <section>
      <div v-if="displayUsers">
        <suspense>
          <Users />
        </suspense>
      </div>
    </section>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Users from './users/Users.vue';
export default {
  components: {
    Users
  },
  setup() {
    const router = useRouter();
    const displayUsers = ref(false);
    const handleLogout = async () => {
      try {
        const response = await fetch(
          'http://localhost:5555/api/v1/auth/logout',
          {
            method: 'POST',
            credentials: 'include'
          }
        );

        if (!response.ok) router.push({ name: 'WentWrong' });
        router.push({ name: 'Home' });
      } catch (e) {
        router.push({ name: 'WentWrong' });
      }
    };

    const loadUsers = async () => {
      displayUsers.value = true;
    };
    return { handleLogout, loadUsers, displayUsers };
  }
};
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-auto-rows: minmax(200px, auto);
}
h3 {
  color: #42b983;
  display: grid;
  justify-content: start;
  font-size: 1.5em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
h6 {
  grid-column: 6/7;
  align-items: end;
}
h6 a {
  color: #42b983;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
aside {
  grid-row: 2/7;
  grid-column: 1/2;
  text-align: start;
}
ul li {
  padding-bottom: 20px;
  list-style-type: none;
}
li a {
  color: #42b983;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  text-decoration: none;
}
section {
  display: grid;
  grid-row: 2/7;
  grid-column: 2/7;
}
</style>
