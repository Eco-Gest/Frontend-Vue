// post.ts
// post.ts
import { defineStore } from "pinia";
import axios from "~/plugins/axios";
import type { State } from '@/types/post';

const $axios = axios().provide.axios;

export const usePostStore = defineStore('post', {
    state: () : State => ({
        posts: [],
        currentPost : null
    }),
    actions: {
        /**
         * Fetches all posts from the server.
         */
        async fetchPosts() {
            try {
                const response = await $axios.get('/posts');
                this.posts = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        /**
         * Fetches a single post from the server by its ID.
         * @param id - The ID of the post to fetch.
         */
        async fetchPost(id) {
            console.log(id);
            console.log('fetching post');
            try {
                const response = await $axios.get(`/posts/${id}`);
                console.log(response.data);
                this.$state.currentPost = response.data;
                console.log(this.$state.currentPost.user);
            } catch (error) {
                console.error(error);
            }
        },
        // async createPost(post) {
        //     try {
        //         const response = await $axios.post('/posts', post);
        //         this.posts.push(response.data);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // },
        // async updatePost(post) {
        //     try {
        //         const response = await $axios.put(`/posts/${post.id}`, post);
        //         const index = this.posts.findIndex(p => p.id === post.id);
        //         if (index !== -1) {
        //             this.posts[index] = response.data;
        //         }
        //     } catch (error) {
        //         console.error(error);
        //     }
        // },
        // async deletePost(id) {
        //     try {
        //         await $axios.delete(`/posts/${id}`);
        //         this.posts = this.posts.filter(p => p.id !== id);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
    },
    getters: {
        getPostById: (state) => (id) => {
            console.log(id);
            console.log(state.posts);
            console.log("getting post by id")
             return state.posts.find(post => post.id === id);
        }
    },
    persist: true,
})