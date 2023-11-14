
import resolve from '@rollup/plugin-node-resolve'
import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'

const override = {
  compilerOptions: {
    "declaration": true,
    "declarationDir": "es",
    "noEmit": true,
  }
}

export default {
  input: 'src/index.ts',
  output: [{
    file: 'es/index.js',
    format: 'es',
  }],
  plugins: [
    ts({
      tsconfigOverride: override
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      preferBuiltins: true
    }),
    json()
  ]
}
