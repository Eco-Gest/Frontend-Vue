# PINIA

Pinia started as an experiment to redesign what a Store for Vue could look like with the Composition API

Pinia uses “stores” in order to manage state. A Store is compromised of:

- state (The data that we want to share)
- getters (A way for us to get the data from the state, read only)
- actions (Methods that we can use to modify/mutate the data in the state)
- ~~mutations~~ One of the differences between Pinia and Vuex is that Pinia does not have explicit mutations defined in the store. They were removed from the store definition due to being too verbose. Read till the end to find out how to monitor mutations in your app.
  
Another differences between Pinia and Vuex is that Pinia is modular. What that means is that Pinia encourages users to have different stores, each corresponding to a different logic in our app. This is a great approach because it follows the separation of concern principle. 

## Create a Pinia Store
Create a new directory called store in the src directory of your Nuxt.js project. Inside the store directory, create a file named index.ts and define your Pinia store:

```typescript
// src/store/index.ts

import { defineStore } from 'pinia'

export const useMyStore = defineStore({
  id: 'myStore',
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
})
```

## Use the Pinia Store in Components
Now that you have created your Pinia store, you can use it in your Vue.js components. For example, you can create a simple counter component:

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { useMyStore } from '@/store'

export default {
  setup() {
    const store = useMyStore()

    return {
      count: store.count,
      increment: store.increment
    }
  }
}
</script>
```

## Pinia for Ecogest

Here is the logic of the user store  with our store and our actions (getter and actions are in the same section in Pinia) : 
```js
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
            // code to call API
        },
        
        async register(formData) {
            // code to call API
        },

        async getCurrentUser() {
            // code
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
```

then in our `login` component (this is a simplier version for you to understand):
```js
  <script lang="ts" setup>
     import { useUserStore } from '~~/store/user';

     const userStore = useUserStore();

     const login = async () => {
          try {
            await userStore.login(formData);
            router.push('/')
          } catch (error) {
            errors.value  = 'Email ou mot de passe incorrect';
          }
      };
</script>
```