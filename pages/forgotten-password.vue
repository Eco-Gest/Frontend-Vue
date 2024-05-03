<template>
  <div class="flex flex-col items-center justify-center h-screen">
      <LoadSpinner v-if="isLoading" /> 
      <div class="sm:w-80 w-72 flex flex-col" v-if="!emailSent">
      <h1 class="text-lg mb-6">Entrez votre e-mail afin de recevoir un lien de réinitialisation de votre mot de passe :</h1>
      
        <!-- Email Input -->
        <div class="mb-4 w-full">
          <label for="email" class="block mb- text-sm font-medium">Email</label>
          <input v-model="formData.email" type="email" id="email" class="bg-gray-50 border border-black text-sm rounded-lg  block w-full p-2.5 " :class="{'border-error focus:border-error': v$.email.$error,'border-[#42d392] ': !v$.email.$invalid,}" @change="v$.email.$touch" placeholder="Entrez votre Email" required />
          <span class="text-xs text-error" v-if="v$.email.$error">{{
            v$.email.$errors[0].$message
          }}</span>
        </div>

      <div v-if="errors" class="text-error my-3 py-3 px-4 bg-errorContainer">{{ errors }}</div>
      <button @click="sendResetLink" class="bg-primary text-white py-3 px-4 rounded-full w-full">
        Envoyer le lien par email
      </button>
    </div> 
    <div class="sm:w-80 w-72 flex flex-col" v-else>
      <span class="material-icons mb-2 text-4xl text-primary">check_circle</span>
      <h1 class="text-xl font-bold mb-2">Email envoyé</h1>
      <p>Regardez vos mails et ouvrez le lien pour continuer la réinitialisation de votre mot de passe.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>

      import { ref, reactive, computed } from 'vue';
      import { useRouter } from 'vue-router';
      import { useAuthStore } from '~~/store/auth';
      import { useVuelidate } from '@vuelidate/core';
      import { required, email, helpers } from '@vuelidate/validators';
      import axios from 'axios';
      import LoadSpinner from '~/components/LoadSpinner.vue';
      
      definePageMeta({
        name: 'Mot de passe oublié',
        middleware: 'auth'
      })

      const formData = reactive<{ email: string }>({
        email: '',
      });

      const emailSent = ref<boolean>(false);
      const errors = ref<string>('');

      const rules = computed(() => {
            return {
              email: {
                required: helpers.withMessage('Email requis', required),
                email: helpers.withMessage('Format d\'email invalide', email),
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
            await authStore.resetPasswordRequest(formData.email);
            emailSent.value = true; 
          } catch (error: any) { 
            errors.value = 'Une erreur s\'est produite. Veuillez réessayer.'; 
          } finally {
              isLoading.value = false;
          }
        }
      }
</script>
  