// user.ts
import { defineStore } from "pinia";
import axios from "~/plugins/axios";
import { State } from '@/types';

const $axios = axios().provide.axios;

export const useUserStore = defineStore('user', {
    state: (): State => ({
        id: '',
        username: '',
        email: '',
    }),
    actions: {
        async getCurrentUser() {
            // let res = await $axios.get('/user')
            // this.$state.id = res.data.data.id
            // this.$state.email = res.data.data.email      
        },

        resetState() {      
            this.$state.id = ''
            this.$state.username = ''
            this.$state.email = ''
        },
    },
    persist: true,
})