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

## NUXT 

### Components

by default, you actually don't ever need to import any components on Nuxt at all but you're not forced to use their auto import functionality. The other special thing that you probably should know about when it comes to Nuxtcomponents is they did apply convention where if you create a global folder. If you put your component in the global folder NUXT will assume it's a global component. It's interesting to use if for example will a base button, that way it doesn't have to be loaded again. 

But otherwise, for most things, it's true,you probably will avoid this global folder.

Auto-import is cool but then you don't what you're using so for clarity it's interesting to keep importing stuffs manually at the top of the file. Try to keep your components folder as flat as possible and name them well.

