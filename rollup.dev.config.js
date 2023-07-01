
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import json from '@rollup/plugin-json'

export default {
  input: 'src/index.ts',
  output: [{
    file: 'src/index.js',
    format: 'es',
  }],
  watch: {
    include: ['src/**', 'example/**'],
  },
  plugins:[
    ts({
      clean: true,
    }),
    resolve(),
    commonjs(),
    json(),
    serve({
      port: 8090,
      openPage: '/example/index.html'
    }),
    livereload()
  ]
}
