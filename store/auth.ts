// auth.ts
import { defineStore } from "pinia";
import axios from "~/plugins/axios";
import { Auth } from '@/types';
import { useUserStore } from './user'; // import the user store

const $axios = axios().provide.axios;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        access_token: '',
        isLoggedIn: false,
    }),
    actions: {
        async login(formData: Auth) {
            try {
              const result = await $axios.post('/login', {
                email: formData.email,
                password: formData.password              });
              localStorage.setItem('token', result.data.access_token);
              this.$state.access_token = result.data.access_token;
              this.$state.isLoggedIn = true;
            } catch (error) {
              this.$state.isLoggedIn = false;
              throw error;
            }
        },
        
        async register(formData: Auth) {
            try {
              await $axios.post('/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
              });
            } catch (error) {
                throw error;
            }
        },

        async logout() {
            const userStore = useUserStore(); // get the user store instance
            userStore.resetState(); // reset the user store
            this.resetState()
        },

        async resetPasswordRequest(email: string) {
          try {
            await $axios.post('/request-reset-password', {
              email,
            });
          } catch (error) {
            throw error;
          }
        },

        async resetPassword(formData) {
          try {
            await $axios.post('/reset-password', {
              token: formData.token,
              email: formData.email,
              password: formData.password,
              password_confirmation: formData.password_confirmation,
            });
          } catch (error) {
            console.log(error);
            throw error;
          }
        },

        resetState() {      
            this.$state.access_token = ''
            this.$state.isLoggedIn = false
        },
    },
    persist: true,
})