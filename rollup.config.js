import commonjs from 'rollup-plugin-commonjs'
import nodeGlobals from 'rollup-plugin-node-globals'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'src/client.tsx',
  output: {
    file: 'dist/bundle.js',
    format: 'iife'
  },
  plugins: [
    commonjs(),
    nodeGlobals(),
    resolve({
      extensions: ['.js', '.ts', '.tsx']
    }),
    typescript(),
    uglify()
  ]
}
