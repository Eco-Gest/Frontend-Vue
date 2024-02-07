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
```bash

in package.json

```jsx
"dev": "nuxt dev -o"
```

Allows opening directly in the browser when running `npm run dev`. If you don't like it delete the -o 

## NUXT 

### Components

by default, you actually don't ever need to import any components on Nuxt at all but you're not forced to use their auto import functionality. The other special thing that you probably should know about when it comes to Nuxtcomponents is they did apply convention where if you create a global folder. If you put your component in the global folder NUXT will assume it's a global component. It's interesting to use if for example will a base button, that way it doesn't have to be loaded again. 

But otherwise, for most things, it's true,you probably will avoid this global folder.

Auto-import is cool but then you don't what you're using so for clarity it's interesting to keep importing stuffs manually at the top of the file. Try to keep your components folder as flat as possible and name them well.

### Vuetify
Vuetify is a way to use Material 3  . Vuetify is a no design skills required Open Source UI Library with beautifully handcrafted Vue Components.

```
npm i -D vuetify vite-plugin-vuetify
npm i @mdi/font
```

Next, integrate the following entries into your nuxt.config.ts file:

```
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  //...
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
```

Nuxt allows you to change its Vite config by using its built-in hook vite:extendConfig. In its callback function, add the Vuetify plugin to the array of Vite plugins. To resolve relative asset URLs that are passed to Vuetify components such as VImg (e.g. ~/assets/img/some.png) the transformAssetUrls function needs to be added in the vite entry .

In the next step, initialize Vuetify and add it to the main Vue app instance. This can be done in the plugins folder as any plugin that is placed in this folder will be automatically loaded by Nuxt at startup.

```
 ~/plugins/vuetify.ts
// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
  })
  app.vueApp.use(vuetify)
})
```
Finally, add Vuetify’s root VApp component either in ~/app.vue or ~/layouts/default.vue, for example:
```
 app.vue
<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
```
or
```
 ~/layouts/default.vue
<template>
  <v-app>
    <!-- .... -->
  </v-app>
</template>
```
You should now have access to all Vuetify components and tools in Nuxt app.

more info on https://vuetifyjs.com/en/