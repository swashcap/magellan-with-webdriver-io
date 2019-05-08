import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
  <div>
    <h1>Hello, World!</h1>
    <p>This is a sample React application.</p>
  </div>
)

const el = document.getElementById('app')

if (el) {
  ReactDOM.render(<App />, el)
}
