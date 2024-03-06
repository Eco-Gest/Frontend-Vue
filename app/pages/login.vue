<template>
    <div class="bg-background flex flex-col items-center justify-center h-screen">
        <div class="sm:w-80 w-72 flex flex-col">
        <!-- Logo -->
        <img src="..\assets\images\logo-color.png" alt="Logo" class="mb-12 w-56 self-center md:hidden" />
    
        <!-- Title -->
        <p class="text-l mb-4 text-center">
          Vous avez déjà un compte ?<br />
        <span class="font-bold">Heureux de vous revoir</span> 
        </p>
    
        <!-- Email Input -->
        <div class="mb-2 w-full">
          <label for="email" class="block mb-2 text-sm font-medium">Email</label>
          <input type="email" id="email" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 " placeholder="Entrez votre Email" required />
        </div>

        <!-- Password Input -->
        <div class="mb-2 w-full">
          <label for="password" class="block mb-2 text-sm">Mot de passe</label>
          <input type="password" id="password" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 " placeholder="•••••••••" required />
        </div>
    
        <!-- Forgot Password Link -->
        <div class="mb-2 text-center">
          <NuxtLink to="/forgot-password" class="text-sm text-primary">Mot de passe oublié ?</NuxtLink>
        </div>
    
        <!-- Connect Button -->
        <button @click="login" class="bg-primary text-white py-3 px-4 rounded-full w-full">
          Se connecter
        </button>
    
        <!-- Sign Up Link -->
        <div class="mt-16 text-center">
          <p>Vous souhaitez créer un compte ?</p>
          <NuxtLink to="/signup" class="text-primary">S’inscrire</NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    name: 'Se connecter',
  })
  </script>