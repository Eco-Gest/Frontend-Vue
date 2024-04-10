# ECOGEST x NUXT 3
## init project

In the past, if you were familiar with using Vue CLI and related tools, the current equivalent process has been rewritten for the updated tooling chain of Nuxt 3. To initiate this, use the following command: 

```bash
npx nuxi
```

If you're unfamiliar with the NPX command, it allows you to run one-off terminal-like command line packages, avoiding the need to install packages globally. This is beneficial as it prevents unnecessary clutter on your computer with packages that are seldom used. The specified command initializes a new project.

Create app
```bash
npx nuxi init app
```

in package.json

```jsx
"dev": "nuxt dev -o"
```

Allows opening directly in the browser when running `npm run dev`. If you don't like it delete the -o 


## Components

by default, you actually don't ever need to import any components on Nuxt at all but you're not forced to use their auto import functionality. The other special thing that you probably should know about when it comes to Nuxt components is they did apply convention where if you create a global folder. If you put your component in the global folder NUXT will assume it's a global component. It's interesting to use if for example will a base button, that way it doesn't have to be loaded again. 

But otherwise, for most things, it's true, you probably will avoid this global folder.

Auto-import is cool but then you don't what you're using so for clarity it's interesting to keep importing stuffs manually at the top of the file. Try to keep your components folder as flat as possible and name them well.

## Router
### Pages
Create a 'pages' folder and create our views. In the app.vue, simply add this code
```
<template>
  <NuxtPage />
</template>
```
NuxtPage is like a slot for our page to automatically go into, no need for a route.js file

more on routing https://nuxt.com/docs/getting-started/routing 

### Navigation

The `<NuxtLink>` component links pages between them. It renders an `<a>` tag with the href attribute set to the route of the page.

```
    <NuxtLink to="/account">
          Account
    </NuxtLink>
```

### Route name
**note:** For the Ecogest's project we need to know the current route name to display it on our top bar on mobile. But the route name is equal to the file name so  we used the meta data
```
<script setup>
definePageMeta({
  name: 'Profil',
})
</script>
```

> Page metadata refers to information associated with a web page that provides additional context or instructions to browsers, search engines, and other web services. This metadata is typically invisible to users but plays an important role in how the page is understood and displayed by various systems.
>
### Middleware

Nuxt provides a customizable route middleware framework you can use throughout your application, ideal for extracting code that you want to run before navigating to a particular route.

For Ecogest we need to protect our routes of unauthentificated users. In the folder middleware we have a `auth.js` file for that:

```
import { useUserStore } from '~~/store/user'

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    
    // If user is authenticated and trying to access login or register page, redirect to home
    if ((to.fullPath === '/login' || to.fullPath === '/register') && userStore.isLoggedIn) {
        return navigateTo('/')
    }

    // If user is not authenticated and trying to access any other page, redirect to login
    if (!userStore.isLoggedIn && to.fullPath !== '/login') {
        return navigateTo('/login')
    }
})
```

## Composition API vs Options API in Vue.js

Vue.js offers two primary ways to structure components: the Options API and the Composition API. Here's a breakdown of their differences:

### Options API

- **Object-Based**: In the Options API, a Vue component is typically defined as an object with various properties such as `data`, `methods`, `computed`, `watch`, etc.
- **Separation of Concerns**: It follows a separation of concerns approach where data, methods, and lifecycle hooks are all defined separately.
- **Template Integration**: Components created with the Options API usually have their template, script, and styles together in a single file.
- **Ease of Learning**: The Options API is generally easier for beginners to grasp as it provides a more structured and guided approach to building components.

Example:

```javascript
export default {
  data() {
    return {
      message: 'Hello, Vue!'
    }
  },
  methods: {
    greet() {
      alert(this.message);
    }
  }
}
```

### Composition API

- **Function-Based**: The Composition API allows developers to organize component logic into reusable functions rather than object properties.
- **Better Organization**: It offers more flexibility in organizing code logic by allowing developers to group related code together.
- **Composition Functions**: Components built with the Composition API consist of composition functions, which can be reused across multiple components.
- **Improved Code Reusability**: With the Composition API, developers can encapsulate logic more effectively, resulting in improved code reusability and maintainability.

```javascript
import { reactive, computed } from 'vue';

export default {
  setup() {
    const state = reactive({
      message: 'Hello, Vue!'
    });

    const greet = () => {
      alert(state.message);
    };

    return {
      state,
      greet
    };
  }
}

