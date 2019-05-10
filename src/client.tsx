import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'

const el = document.getElementById('app')

if (el) {
  ReactDOM.render(<App />, el)
}
