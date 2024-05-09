<!-- components/Footer.vue -->
<template>
    <footer class="hidden md:flex border-t p-4 text-primary justify-center">
        <div class="mr-4">Eco’Gest - {{ currentYear }}</div>
        <NuxtLink to="/legal" class="mr-4">Mentions légales</NuxtLink>
        <!-- TODO: ajouter liens vers le github de chacun ?-->
        <a href="#" target="_blank" rel="noopener noreferrer">
            <span class="material-icons">link</span>
        </a>
    </footer>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const currentYear = ref('');
  
  onMounted(() => {
    const year = new Date().getFullYear();
    currentYear.value = year;
  });
  </script>
  
  <style scoped>
  </style>
  