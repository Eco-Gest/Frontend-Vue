<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <LoadSpinner v-if="isLoading" />
    <div class="sm:w-80 w-72 flex flex-col" v-if="!emailSent">
      <h1 class="text-2xl font-bold mb-2">Nouveau mot de passe</h1>
      <p class="mb-6">Veuillez entrer l'adresse email associée à votre compte et choisir votre nouveau mot de passe.</p>

      <!-- Email Input -->
      <div class="mb-4 w-full">
        <label for="email" class="block mb- text-sm font-medium">Email</label>
        <input v-model="formData.email" type="email" id="email"
          class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 "
          :class="{ 'border-error focus:border-error': v$.email.$error, 'border-[#42d392] ': !v$.email.$invalid, }"
          @change="v$.email.$touch" placeholder="Entrez votre Email" required />
        <span class="text-xs text-error" v-if="v$.email.$error">{{
      v$.email.$errors[0].$message
    }}</span>
      </div>

      <!-- Password Input -->
      <div class="relative mb-2 w-full">
        <label for="password" class="block mb-2 text-sm">Votre nouveau mot de passe</label>
        <input v-model="formData.password" :type="showPassword ? 'text' : 'password'" id="password"
          class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 " :class="{
      ' border-error focus:border-error': v$.password.$error,
      'border-[#42d392]': !v$.password.$invalid,
    }" @change="v$.password.$touch" placeholder="•••••••••" required />
        <span class="text-xs text-error" v-if="v$.password.$error">{{
      v$.password.$errors[0].$message
    }}</span>
        <div class="absolute top-9 right-0 flex items-center pr-2 cursor-pointer" @click="toggleShowPassword">
          <span class="material-icons">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
        </div>
      </div>

      <!-- Repeat Password Input -->
      <div class="relative mb-2 w-full">
        <label for="confirmPassword" class="block mb-2 text-sm">Répétez votre nouveau mot de passe</label>
        <input v-model="formData.confirm_password" :type="showConfirmPassword ? 'text' : 'password'"
          id="confirmPassword" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 " :class="{
      ' border-error focus:border-error': v$.confirm_password.$error,
      'border-[#42d392]': !v$.confirm_password.$invalid,
    }" @change="v$.confirm_password.$touch" placeholder="•••••••••" required />
        <span class="text-xs text-error" v-if="v$.confirm_password.$error">{{
      v$.confirm_password.$errors[0].$message
    }}</span>
        <div class="absolute top-9 right-0 flex items-center pr-2 cursor-pointer" @click="toggleShowConfirmPassword">
          <span class="material-icons">{{ showConfirmPassword ? 'visibility_off' : 'visibility' }}</span>
        </div>
      </div>

      <div v-if="errors" class="text-error my-3 py-3 px-4 bg-errorContainer">{{ errors }}</div>
      <button @click="sendResetLink" class="bg-primary text-white py-3 px-4 rounded-full w-full">
        Changer le mot de passe
      </button>
    </div>
    <div class="sm:w-80 w-72 flex flex-col" v-else>
      <span class="material-icons mb-2 text-4xl text-primary">check_circle</span>
      <h1 class="text-xl font-bold mb-2">Mot de passe modifié</h1>
      <p>Vous pouvez dès à présent vous connecter avec votre nouveau mot de passe.</p>
      <!-- Login Link -->
      <button class="bg-primary text-white mt-2 py-3 px-4 rounded-full w-full">
        <NuxtLink to="/login" class="text-white">Se connecter</NuxtLink>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~~/store/auth';
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import LoadSpinner from '~/components/LoadSpinner.vue';

definePageMeta({
  name: 'Réinitialiser votre mot de passe',
})

const route = useRoute();
const token = route.query.token as string;

interface FormData {
  token: string;
  email: string;
  password: string;
  confirm_password: string;
}

const formData: FormData = reactive({
  token: token,
  email: '',
  password: '',
  confirm_password: '',
});

const emailSent = ref<boolean>(false);
const errors = ref<string>('');
const showPassword = ref<boolean>(false);
const showConfirmPassword = ref<boolean>(false);

const toggleShowPassword = (): void => {
  showPassword.value = !showPassword.value;
};

const toggleShowConfirmPassword = (): void => {
  showConfirmPassword.value = !showConfirmPassword.value;
};


const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Email requis', required),
      email: helpers.withMessage('Format d\'email invalide', email),
    },
    password: {
      required: helpers.withMessage('Mot de passe requis', required),
      regex: helpers.withMessage('Le mot de passe doit contenir au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.', (value: string) => {
        return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}/.test(value);
      }),
    },
    confirm_password: {
      required: helpers.withMessage('Veuillez répéter le mot de passe', required),
      sameAsPassword: helpers.withMessage('Les mots de passe ne correspondent pas', (value: string) => {
        return value === formData.password;
      }),
    },
  };
});

const v$ = useVuelidate(rules, formData);
const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref<boolean>(false);
const sendResetLink = async (): Promise<void> => {
  v$.value.$validate();
  if (!v$.value.$error) {
    isLoading.value = true;
    try {
      await authStore.resetPassword(formData);
      emailSent.value = true;
    } catch (error: any) {

      errors.value = 'Une erreur s\'est produite. Veuillez réessayer.';
    } finally {
      isLoading.value = false;
    }
  }
}
</script>