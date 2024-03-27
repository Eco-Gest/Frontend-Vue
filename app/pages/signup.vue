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
        <div class="relative mb-2 w-full">
          <label for="password" class="block mb-2 text-sm">Mot de passe</label>
          <input v-model="formData.password" :type="showPassword ? 'text' : 'password'" id="password" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 "               :class="{
                ' border-error focus:border-error': v$.password.$error,
                'border-[#42d392]': !v$.password.$invalid,
              }"
              @change="v$.password.$touch" placeholder="•••••••••" required />
          <span class="text-xs text-error" v-if="v$.password.$error">{{
            v$.password.$errors[0].$message
          }}</span>
          <div class="absolute top-9 right-0 flex items-center pr-2 cursor-pointer" @click="toggleShowPassword">
            <span class="material-icons">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
          </div>
        </div>
    
        <!-- Repeat Password Input -->
        <div class="relative mb-2 w-full">
          <label for="confirmPassword" class="block mb-2 text-sm">Répétez le mot de passe</label>
          <input v-model="formData.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 "               :class="{
                ' border-error focus:border-error': v$.confirmPassword.$error,
                'border-[#42d392]': !v$.confirmPassword.$invalid,
              }"
              @change="v$.confirmPassword.$touch" placeholder="•••••••••" required />
          <span class="text-xs text-error" v-if="v$.confirmPassword.$error">{{
            v$.confirmPassword.$errors[0].$message
          }}</span>
          <div class="absolute top-9 right-0 flex items-center pr-2 cursor-pointer" @click="toggleShowPassword">
            <span class="material-icons">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
          </div>
        </div>
        <div v-if="errors" class="text-error py-3 px-4 bg-errorContainer">{{ errors }}</div>
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
      import { useUserStore } from '~~/store/user';
      import { useVuelidate } from '@vuelidate/core';
      import { required, email, sameAs, minLength, helpers } from '@vuelidate/validators';
      const userStore = useUserStore();
      const router = useRouter();

      const formData = reactive({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
      });
      
      const errors = ref('');
      const showPassword = ref(false);
      const showConfirmPassword = ref(false);

      const toggleShowPassword = () => {
        showPassword.value = !showPassword.value;
      };

      const toggleShowConfirmPassword = () => {
        showPassword.value = !showPassword.value;
      };



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
          confirmPassword: {
            required: helpers.withMessage('Veuillez répéter le mot de passe', required),
            sameAsPassword: helpers.withMessage('Les mots de passe ne correspondent pas', (value) => {
              return value === formData.password;
            }),
          },
        };
      });

      const v$ = useVuelidate(rules, formData);

      const register = async () => {
        v$.value.$validate();
        if (!v$.value.$error) {
          try {
            console.log(formData);
            await userStore.register(formData);
            router.push('/login')
          } catch (error) {
              console.log(error)
              errors.value  = 'Un erreur s\'est passer veuillez réessayer';
          }
        }
      };

  </script>