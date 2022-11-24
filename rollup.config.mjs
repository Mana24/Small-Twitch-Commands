import { defineConfig } from 'rollup';
import styles from "rollup-plugin-styles";
import copy from "rollup-plugin-copy";
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';

const production = !process.env.ROLLUP_WATCH;

const contentScriptConfig = (manifestFile, outputFolder) => ({
   input: "src/content/content-script.js",
   output: {
      file: `${outputFolder}/content-script.js`,
      format: 'iife',
      assetFileNames: "[name][extname]",
      sourcemap: !production
   },
   plugins: [
      styles({ mode: ['extract', 'content-styles.css'] }),
      copy({
         targets: [
            { src: manifestFile, dest: `${outputFolder}`, rename: 'manifest.json' },
            { src: 'assets/*.png', dest: `${outputFolder}` }
         ]
      })
   ]
})
const optionsPageOutput = (outputFolder) => ({
   file: `${outputFolder}/options.js`,
   format: 'iife',
   assetFileNames: "[name][extname]",
   sourcemap: !production
})

export default defineConfig([
   contentScriptConfig('manifest.v3.json', 'dist/v3'),
   contentScriptConfig('manifest.v2.json', 'dist/v2'),
   {
      input: "src/options/main.js",
      output: [optionsPageOutput('dist/v3'), optionsPageOutput('dist/v2')],
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
         copy({ targets: [{ src: 'src/options/options.html', dest: ['dist/v3', 'dist/v2'] }] })
      ]
   }])