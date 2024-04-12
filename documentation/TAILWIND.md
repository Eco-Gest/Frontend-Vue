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

## Configuration
Because Tailwind is a framework for building bespoke user interfaces, it has been designed from the ground up with customization in mind.

By default, Tailwind will look for an optional tailwind.config.js file at the root of your project where you can define any customizations.

For Ecogest we ar eusing it to declare customized colors and font variables. For exemple `class="text-primary"` will style the text isnide the  element with our primary color. 
```
    colors: {
      'white': '#FFFFFF',
      'black': '#000000',
      'background': '#F9FAF4',
      'primary': '#326941',
      'primaryHover': '#147945',
      'surface2': '#EBEFDA',
      'onSurfaceVariant': '#414941',
      'secondaryContainer': '#D3E8D2',
      'error': '#BA1A1A',
      'errorContainer': '#FFDAD6',
    },
```

## Styling with Tailwind
Tailwind CSS provides hundreds of utility classes covering everything from typography to layout, making it easy to rapidly prototype and style web applications without writing custom CSS. By composing these utility classes together, you can create complex layouts and designs with minimal effort, while still maintaining a highly maintainable and consistent codebase.

check the documentation to find the style you want https://tailwindcss.com/docs/installation

## Colors
for Ecogest : in `app/tailwind.config.js` you can put specific variables like the font or the color. So far only used colors from our palette as been put, you can pick the color to use from material-theme.json.

