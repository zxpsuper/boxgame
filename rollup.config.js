// rollup.config.js
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import common from 'rollup-plugin-commonjs'
const pkg = require('./package.json')
export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.main,
            format: 'umd',
            name: 'Tool',
        },
        {
            file: pkg.module,
            format: 'esm',
        },
    ],
    plugins: [json(), resolve(), common(), babel()],
}
