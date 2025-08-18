<template>
  <nav class="text-base gap-6 pt-8 flex justify-center bg-sky-50">
    <NuxtLink :class="linkClass" to="/">Home </NuxtLink>
    <NuxtLink :class="linkClass" to="/today">Today </NuxtLink>
    <NuxtLink :class="linkClass" to="/tomorrow">Tomorrow </NuxtLink>
  </nav>
</template>

<script setup>
const linkClass = "bg-white p-3 rounded-xl shadow";
</script>
