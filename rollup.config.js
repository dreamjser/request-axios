
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'

export default {
  input: 'src/index.ts',
  output: [{
    name: 'requestAxios',
    file: 'lib/index.js',
    format: 'umd',
    plugins: [resolve(), commonjs(), json()]
  }, {
    file: 'es/index.js',
    format: 'es',
  }],
  plugins:[
    ts(),
  ]
}
