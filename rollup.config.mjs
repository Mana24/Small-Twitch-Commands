import { defineConfig } from 'rollup';
import styles from "rollup-plugin-styles";
import copy from "rollup-plugin-copy";
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';

const production = !process.env.ROLLUP_WATCH;

export default defineConfig([{
   input: "src/content/content-script.js",
   output: {
      file: "dist/content-script.js",
      format: 'iife',
      assetFileNames: "[name][extname]"
   },
   plugins: [
      styles({ mode: ['extract', 'content-styles.css'] }),
      copy({
         targets: [
            { src: 'manifest.json', dest: 'dist' },
            { src: 'assets/*.png', dest: 'dist' }
         ]
      })
   ]
},
{
   input: "src/options/main.js",
   output: {
      file: "dist/options.js",
      format: 'iife',
      assetFileNames: "[name][extname]",
      sourcemap: !production
   },
   plugins: [
      alias({
         entries: [
            { find: 'react', replacement: 'preact/compat' },
            { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
            { find: 'react-dom', replacement: 'preact/compat' },
            { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' }
         ]
      }),
      resolve({ browser: true, extensions: ['.js', '.mjs', '.jsx', '.json', '.node'] }),
      commonjs(),
      babel({
         babelHelpers: 'bundled',
         exclude: 'node_modules/**'
      }),
      styles({ mode: ['extract', 'option-styles.css'] }),
      copy({ targets: [{ src: 'src/options/options.html', dest: 'dist' }] })
   ]
}])