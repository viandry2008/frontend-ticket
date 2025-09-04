<template>
  <div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: () => {
    return navigateTo('/auth/login')
  }
})
</script>

<style>

</style>