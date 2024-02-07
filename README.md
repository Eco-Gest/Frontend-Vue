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