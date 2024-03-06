<template>
    <div class="bg-background flex flex-col items-center justify-center h-screen">
        <div class="sm:w-80 w-72 flex flex-col">
        <!-- Logo -->
        <img src="..\assets\images\logo-color.png" alt="Logo" class="mb-12 w-56 self-center md:hidden" />
    
        <!-- Title -->
        <p class="text-l mb-4 text-center">
          <span class="font-bold">Inscription</span> 
        </p>
    
        <!-- Email Input -->
        <div class="mb-2 w-full">
          <label for="email" class="block mb-2 text-sm font-medium">Email</label>
          <input type="email" id="email" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 " placeholder="Entrez votre Email" required />
        </div>

        <!-- Username Input -->
        <div class="mb-2 w-full">
          <label for="username" class="block mb-2 text-sm font-medium">Nom d'utilisateur</label>
          <input type="text" id="username" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 " placeholder="Entrez votre Email" required />
        </div>

        <!-- Password Input -->
        <div class="mb-2 w-full">
          <label for="password" class="block mb-2 text-sm">Mot de passe</label>
          <input type="password" id="password" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 " placeholder="•••••••••" required />
        </div>
    
        <!-- Repeat Password Input -->
        <div class="mb-4 w-full">
          <label for="password" class="block mb-2 text-sm">Répétez le mot de passe</label>
          <input type="password" id="password" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 " placeholder="•••••••••" required />
        </div>

        <!-- Connect Button -->
        <button @click="login" class="bg-primary text-white py-3 px-4 rounded-full w-full">
          S'inscrire'
        </button>
    
        <!-- Sign Up Link -->
        <div class="mt-16 text-center">
          <p>Vous avez déjà un compte ?</p>
          <NuxtLink to="/login" class="text-primary">Se connecter</NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    name: 'inscription',
  })
  </script>