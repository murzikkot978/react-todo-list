import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  output: {
    assetPrefix: '/react-todo-list/',
  },
  plugins: [pluginReact()],
});
