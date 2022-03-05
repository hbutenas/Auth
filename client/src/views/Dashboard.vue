<template>
  <div class="container">
    <h3 class="text-center">Dashboard</h3>
    <p>{{ $store.state.username }}</p>
    <p>{{ $store.state.user_id }}</p>
    <p>{{ $store.state.role }}</p>
  </div>
</template>
<script>
export default {
  setup() {
  }
};
</script>
<style scoped>
/* .container-fluid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(60px, auto);
}
header {
  grid-column: 4/5;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  display: inline;
  text-decoration: none;
  margin: 15px;
} */
</style>
