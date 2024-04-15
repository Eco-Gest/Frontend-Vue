import { defineStore } from "pinia";
import axios from "~/plugins/axios";
import { State, User } from '@/types';

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', {
    state: (): State => ({
        id: '',
        username: '',
        email: '',
        access_token: '',
        isLoggedIn: false,
    }),
    actions: {
        async login(formData: User) {
            try {
              const result = await $axios.post('/login', {
                email: formData.email,
                password: formData.password,
              });
              localStorage.setItem('token', result.data.access_token);
              this.$state.access_token = result.data.access_token;
              this.$state.isLoggedIn = true;
            } catch (error) {
              this.$state.isLoggedIn = false;
              throw error;
            }
        },
        
        async register(formData: User) {
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

        async getCurrentUser() {
            // let res = await $axios.get('/user')
            // this.$state.id = res.data.data.id
            // this.$state.email = res.data.data.email      
            // this.$state.isLoggedIn = true
        },
      
        async logout() {
            this.resetState()
        },

        resetState() {      
            this.$state.id = ''
            this.$state.full_name = ''
            this.$state.email = ''
            this.$state.access_token = ''
            this.$state.isLoggedIn = false
        },
    },
    persist: true,
})