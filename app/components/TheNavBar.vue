<template>
  <div class="min-h-screen flex flex-col">

    <!-- Desktop Navbar -->
    <nav class="hidden md:flex fixed top-0 left-0 right-0 justify-between text-onSurfaceVariant items-center bg-surface2 p-4">
      <!-- Logo on the left -->
      <div class="flex-shrink-0">
        <!-- Replace 'your-logo.png' with the path to your logo image -->
        <img src="..\assets\images\logo-color.png" alt="Logo" class="h-10">
      </div>

      <div class="flex-grow flex items-center justify-center">
        <!-- Replace with searchbar implementation -->
        <div class="relative">
          <input type="text" placeholder="Rechercher..." class="p-2 pl-8 md:pr-5 lg:pr-60 rounded-full">
          <span class="absolute inset-y-0 right-5 flex items-center pl-2">
            <span class="material-icons">search</span>
          </span>
        </div>
      </div>

      <!-- Menu icons on the right -->
      <div class="flex items-center space-x-12">
        <NuxtLink to="/" exact active-class="text-primary" class="hover:text-primary">
          <span class="material-icons">home</span>
        </NuxtLink>

        <NuxtLink to="/challenge" exact active-class="text-primary" class="hover:text-primary justify-center">
          <span class="material-icons">emoji_events</span>
        </NuxtLink>

        <NuxtLink to="/postcreate" exact active-class="text-primary" class="hover:text-primary bg-secondaryContainer rounded-md rounded-md p-3 flex justify-center">
          <span class="material-icons">add</span>
        </NuxtLink>

        <NuxtLink to="/notification" exact active-class="text-primary" class="hover:text-primary justify-center">
          <span class="material-icons">notifications</span>
        </NuxtLink>

        <NuxtLink to="/account" exact active-class="text-primary" class="hover:text-primary justify-center">
          <span class="material-icons">person</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Mobile Top Bar -->
    <nav class="md:hidden fixed top-0 left-0 right-0 bg-surface2 p-7 text-onSurfaceVariant">
      <div class="flex justify-between items-center">
        <!-- Back Arrow (Assuming you are using Vue Router for navigation) -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <span class="material-icons">arrow_back</span>
          <h1 class="text-2xl">{{ $route.name }}</h1>
        </NuxtLink>

        <template v-if="$route.name !== 'Accueil'">
          <NuxtLink to="/settings" class="hover:text-primary flex justify-center items-center">
            <span class="material-icons">settings</span>
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/notification" class="hover:text-primary flex justify-center items-center">
            <span class="material-icons">notifications</span>
          </NuxtLink>
        </template>
      </div>
    </nav>

    <!-- Mobile Navbar -->
    <nav class="fixed bottom-0 left-0 right-0 bg-surface2  md:hidden">
      <div class="flex justify-between text-onSurfaceVariant py-5 ">
        <NuxtLink to="/"  exact active-class="text-primary" class="w-1/5 hover:text-primary flex justify-center items-center">
          <span class="material-icons">home</span>
        </NuxtLink>

        <NuxtLink to="/challenge" exact active-class="text-primary" class="w-1/5 hover:text-primary flex justify-center items-center">
          <span class="material-icons">emoji_events</span>
        </NuxtLink>

        <NuxtLink to="/postcreate" exact active-class="text-primary" class="w-1/5 hover:text-primary bg-secondaryContainer rounded-md p-3 flex justify-center items-center">
          <span class="material-icons">add</span>
        </NuxtLink>

        <NuxtLink to="/search" exact active-class="text-primary" class="w-1/5 hover:text-primary flex justify-center items-center">
          <span class="material-icons">search</span> 
        </NuxtLink>

        <NuxtLink to="/account" exact active-class="text-primary" class="w-1/5 hover:text-primary flex justify-center items-center">
          <span class="material-icons">person</span> 
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
</script>

<style>
</style>
