import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
import cpy from 'rollup-plugin-cpy';
import del from 'rollup-plugin-delete';
import json from 'rollup-plugin-json';
import pkg from './package.json';
import progress from 'rollup-plugin-progress';
import resolve from 'rollup-plugin-node-resolve';

const extensions = [ '.js', '.jsx', '.ts', '.tsx' ];

const name = String(pkg.name).replace(/-/g, '');

export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [],

  plugins: [
    // Progressbar in console (default: {clearline: true})
    progress(),

    // A string or an array of patterns of files and folders to be deleted. Default is []
    // Match anything in 'dist' directory'
    del({ targets: ['dist/*', 'public/*.js'] }),

    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Convert JSON files to ES Modules
    json({ include: './package.json', preferConst: true, compact: true }),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'], exclude: 'node_modules/**' }),

    // Remove comments, trim trailing spaces, compact empty lines, and normalize line endings
    cleanup({extensions: ['ts', 'js']}),

    // Rollup plugin to easily copy files and folders
    cpy({ files: ['dist/index.esm.js', 'dist/index.esm.js.map'], dest: 'public/' })
  ],

  output: [{
    file: pkg.main,
    format: 'cjs',
    sourcemap: true
  }, {
    file: pkg.module,
    format: 'es',
    sourcemap: true
  }, {
    file: pkg.browser,
    format: 'iife',
    sourcemap: true,
    name,

    // https://rollupjs.org/guide/en#output-globals-g-globals
    globals: {},
  }],
};
