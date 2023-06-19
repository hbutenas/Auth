<template>
  <!-- Navbar component which shows navbar -->
  <NavbarComponent />

  <!-- Github component which displays latest changes -->
  <GithubComponent />
</template>


<script setup>

definePageMeta({
  middleware: 'auth'
});

</script>