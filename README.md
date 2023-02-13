# React Easy WYSIWYG

A simple, convenient frontend for [tiptap](https://tiptap.dev/), which itself builts upon [ProseMirror](https://prosemirror.net/).

Icons from [Lucide icons](https://lucide.dev/).

![screenshot from the React-easy-wysiwyg demo](demo.png)

## Why?

Tiptap, by design, only provides the barebones tools to built a text editor. For my personal website I built a wrapper, and decided I might as well release it for others to use.

## Demo

To view the demo, clone the repo, run `npm i` to install dependencies and then run `npm run demo`.

## Usage

> This package is ESM only, and is built targetting ES2019.

`npm install react-easy-wysiwyg`

```jsx
import Editor from "react-easy-wysiwyg";

// Assuming you can import CSS directly, like with Vite, CRA or Next.js
import "react-easy-wysiwyg/styles.css";

const App = () => {

  return (<>
    <h1>My wonderful app</h1>
    <Editor />
  </>)
}
```

### Next.js

If using the `app` directory, available in Next.js 13, you'll need to [mark it's parent as a Client Component](https://beta.nextjs.org/docs/rendering/server-and-client-components#convention).

### Customizing

There are several options to customize the look of the Editor.

#### Styles

This is the easiest, and the one you'll probably always want. It can be as simple as redefining CSS Custom properties. The code below shows the default properties as registered on `:root`.

```css
.rew-container {
  /* Styling defaults */
  --rew-background-color: #282336;
  --rew-color: #fff;

  /* Styling inline code */
  --rew-inline-code-background-color: #000;
  --rew-inline-code-color: #cfcfcf;
  --rew-inline-code-font: monospace;

  /* Styling code blocks */
  --rew-code-background-color: #000;
  --rew-code-color: #cfcfcf;
  --rew-code-font: monospace;

  /* Styling the borders */
  --rew-accent: #ff7edb;
  /* Color of menu seperators */
  --rew-seperator: rgba(255,126,219,.2);
  /* Color of indicators for quote blocks */
  --rew-highlight: rgba(255,126,219,.2);
  /* Background color of 'active' buttons */
  --rew-selected: rgba(255,126,219,.2)
}
```

The module is built using [CSS Modules](https://github.com/css-modules/css-modules), so naming collissions are unlikely. Several 'plain' namespaced classNames are exposed for further styling:

```css
.rew-container {
  /* The outermost <div>, containing both the menu and the wrapper */
}
.rew-menu {
  /* The menu bar at the top, containing all buttons */
}
.rew-wrapper {
  /* The <div> wrapping the content-editable <div> rendered by tiptap */
}
```

On top of this, the `.ProseMirror` class can be used for styling the content itself. By default, your 'normal' styles are inherited.

#### Buttons

This module allows for custom buttons if you don't like the look of the default icons from [Lucide icons](https://lucide.dev/). To do so, just provide a buttons prop to the editor:

```jsx
// All possible options. You only have to provide the ones you want to override.
const altButtons = {
  bold: "B",
  italic: "I",
  underline: "U",
  strikethrough: "S",
  heading1: "H1",
  heading2: "H2",
  heading3: "H3",
  heading4: "H4",
  heading5: "H5",
  heading6: "H6",
  code: "C",
  bulletList: "L",
  orderedList: "LO",
  codeBlock: "CB",
  blockquote: "BQ",
  horizontalRule: "M",
  undo: "U",
  redo: "R",
  link: "L",
  unlink: "UL",
  save: "Sa",
};

<Editor buttons={altButtons} />
```

If any alt is not defined, the default icon will render.

The content can be any _node_ that react can render (which is basically anything). No logic for rendering is provided, so if using React components, you must pass the rendered result, not the component itself:

```jsx
const Bold = () => <span>B</span>;
const Italic = () => <span>I</span>;

<Editor buttons={{
  bold: <Bold />, // ✅
  italic: Italic, // ❌
}} />
```
