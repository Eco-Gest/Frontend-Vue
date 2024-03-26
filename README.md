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

### router
Create a 'pages' folder and create our views. In the app.vue, simply add this code
```
<template>
  <NuxtPage />
</template>
```
NuxtPage is like a slot for our page to automatically go into

more on routing https://nuxt.com/docs/getting-started/routing 

### Tailwind 
Tailwind CSS is a utility-first CSS framework that provides a set of low-level utility classes to build designs directly in your markup. Unlike traditional CSS frameworks that offer pre-designed components, Tailwind focuses on providing a flexible set of atomic utility classes that you can compose to create your own custom designs.

Here's a simple example of how you might use Tailwind classes in HTML:

```html
<div class="bg-blue-500 p-4">
  <p class="text-white font-bold">This is a blue box with white text.</p>
</div>
```

In this example, bg-blue-500 sets the background color to a shade of blue, p-4 adds padding, and text-white font-bold styles the text. By combining these classes, you can create diverse and responsive designs directly in your markup.

more about on https://tailwindcss.com/docs/installation

for Ecogest : in app/tailwind.config.js you can put specific variables like the font or the color. So far only used colors from our palette as been put, you can pick the color to use from material-theme.json.

http://localhost:8080/api

"username": "atuny0",
"password": "9uQFF1Lh",