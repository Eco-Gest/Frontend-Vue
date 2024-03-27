import { defineStore } from "pinia";
import axios from "~/plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', {
    state: () => ({
        id: '',
        username: '',
        email: '',
        access_token: '',
        isLoggedIn: false,
    }),
    actions: {
        async login(formData) {
            console.log('je rentre dans le store user')
            await $axios.post('/login', {
              email: formData.email,
              password: formData.password,
            }).then((result) => {
                console.log('je rentre dans le then, result:')
                console.log(result.data.access_token)
                localStorage.setItem('token',result.data.access_token)
                this.$state.access_token = result.data.access_token
                this.$state.isLoggedIn = true;
            });
        },
        
        async register(formData) {
            await $axios.post('/register', {
              username: formData.username,
              email: formData.email,
              password: formData.password,
            })
        },

        async getCurrentUser() {
            // let res = await $axios.get('/user')
            // this.$state.id = res.data.data.id
            // this.$state.full_name = res.data.data.full_name
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