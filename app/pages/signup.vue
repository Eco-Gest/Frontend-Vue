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
          <input v-model="formData.email" type="email" id="email" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 " :class="{'border-error focus:border-error': v$.email.$error,'border-[#42d392] ': !v$.email.$invalid,}" @change="v$.email.$touch" placeholder="Entrez votre Email" required />
          <span class="text-xs text-error" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
          }}</span>
        </div>

        <!-- Username Input -->
        <div class="mb-2 w-full">
          <label for="username" class="block mb-2 text-sm font-medium">Nom d'utilisateur</label>
          <input v-model="formData.username" type="text" id="username" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 " :class="{
                ' border-error focus:border-error': v$.username.$error,
                'border-[#42d392]': !v$.username.$invalid,
              }"
              @change="v$.username.$touch" placeholder="Entrez votre nom d'utilisateur" required />
        </div>

        <!-- Password Input -->
        <div class="mb-2 w-full">
          <label for="password" class="block mb-2 text-sm">Mot de passe</label>
          <input v-model="formData.password" type="password" id="password" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 "               :class="{
                ' border-error focus:border-error': v$.password.$error,
                'border-[#42d392]': !v$.password.$invalid,
              }"
              @change="v$.password.$touch" placeholder="•••••••••" required />
          <span class="text-xs text-error" v-if="v$.password.$error">{{
            v$.password.$errors[0].$message
          }}</span>
        </div>
    
        <!-- Repeat Password Input -->
        <div class="mb-2 w-full">
          <label for="repeatedPassword" class="block mb-2 text-sm">Répétez le mot de passe</label>
          <input v-model="formData.repeatedPassword" type="repeatedPassword" id="repeatedPassword" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 "               :class="{
                ' border-error focus:border-error': v$.repeatedPassword.$error,
                'border-[#42d392]': !v$.repeatedPassword.$invalid,
              }"
              @change="v$.repeatedPassword.$touch" placeholder="•••••••••" required />
          <span class="text-xs text-error" v-if="v$.repeatedPassword.$error">{{
            v$.repeatedPassword.$errors[0].$message
          }}</span>
        </div>
        <div v-if="error" class="text-error py-3 px-4 bg-errorContainer">{{ error }}</div>
        <!-- Connect Button -->
        <button @click="register" class="bg-primary text-white py-3 px-4 rounded-full w-full">
          S'inscrire
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

      import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
      import { useAuthStore } from '~/store/auth'; // import the auth store we just created
      import { useVuelidate } from '@vuelidate/core';
      import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';

      const { authenticateUser} = useAuthStore(); // use authenticateUser action from  auth store

      const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

      const formData = reactive({
        email: '',
        username: '',
        password: '',
        repeatedPassword: '',
      });

      const rules = computed(() => {
        return {
          email: {
            required: helpers.withMessage('email requis', required),
            email: helpers.withMessage('format d\'email invalide', email),
          },
          username: {
            required: helpers.withMessage('nom d\'utilisateur requis', required),
            regex: helpers.withMessage('Le nom d\'utilisateur doit contenir entre 5 et 29 caractères alphanumériques ou underscores.', (value) => {
            return /^[A-Za-z0-9_]{5,29}$/.test(value);}),
          },
          password: {
            required: helpers.withMessage('mot de passe requis', required),
            regex: helpers.withMessage('Le mot de passe doit contenir au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.', (value) => { return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}/.test(value);}),
          },
          repeatedPassword: {
            required: helpers.withMessage('Veuillez répéter le mot de passe', required),
            sameAsPassword: helpers.withMessage('Les mots de passe ne correspondent pas', (value) => {
              return value === formData.password;
            }),
          },
        };
      });

      const v$ = useVuelidate(rules, formData);

      const router = useRouter();

      let error = ref('');

      const register = async () => {
        v$.value.$validate();
        if (!v$.value.$error) {
          try {
            await registerUser(formData); 
            router.push('/login');
          } catch (err) {
            console.error('Error caught during registration:', err);
            error.value = 'Erreur lors de l\'inscription'; 
            console.log('Error message set:', error.value); 
          }
        }
      };

  </script>