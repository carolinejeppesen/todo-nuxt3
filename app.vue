<template>
  <div>
    <Nav />
    <NuxtPage />
  </div>
</template>

<style>
html,
body {
  @apply bg-sky-50;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}
.page-enter-from,
.page-leave-active {
  opacity: 0;
  filter: blur(1rem);
}
</style>
