# BabushkaLessons Frontend Development Project

This project is the frontend for the Educational Platform Babushka Lessons.

## Features

- View courses and contained lessons
- Watch video lessons in embedded player
- Read course documents or download them
- Upload new lessons (only the form)
- Toggle dark mode
- Chat with coding AI (form + temporary backend code)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

### .env file

- Add the following to the .env file:

```sh
VITE_OPENAI_API_KEY=your_openai_api_key
```

### Known Bugs
- Hosted Upload/Edit/Delete not properly going through if backend does not spool up Redis : Host Issue
- User Accounts need to be implemented, currently OAuth based and not touching backend
- Playlists for Upload/Edit/Delete code is there but not connected


### License

This project is completely closed source. All rights reserved.
