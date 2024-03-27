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
          <input v-model="formData.email" type="email" id="email" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 " :class="{'border-error focus:border-error': v$.email.$error,'border-[#42d392] ': !v$.email.$invalid,}" @change="v$.email.$touch" placeholder="Entrez votre Email" required />
          <span class="text-xs text-error" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
          }}</span>
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
        <div v-if="error" class="text-error py-3 px-4 bg-errorContainer">{{ error }}</div>
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
  
  <script lang="ts" setup>
    definePageMeta({
      name: 'Se connecter',
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
      });

      const rules = computed(() => {
        return {
          email: {
            required: helpers.withMessage('email requis', required),
            email: helpers.withMessage('format d\'email invalide', email),
          },
          password: {
            required: helpers.withMessage('mot de passe requis', required),
          },
        };
      });

      const v$ = useVuelidate(rules, formData);

      const router = useRouter();

      let error = ref('');

      const login = async () => {
        v$.value.$validate();
        if (!v$.value.$error) {
          try {
            await authenticateUser(formData); // call authenticateUser and pass the user object
            // redirect to homepage if user is authenticated
            router.push('/');
          } catch (err) {
            console.error('Error caught during authentication:', err); // Log the error for debugging
            error.value = 'Email ou mot de passe incorrect'; // Set error message if authentication fails
            console.log('Error message set:', error.value); // Log the error message for debugging

          }
        }
      };
  </script>