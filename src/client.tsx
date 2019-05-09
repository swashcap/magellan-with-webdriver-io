import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
  <div className="app">
    <h1>Hello, World!</h1>
    <p>This is a sample React application.</p>
    <form action="/login" method="POST">
      <div>
        <label htmlFor="username">Username:</label>
        <input id="username" name="username" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Log In</button>
    </form>
  </div>
)

const el = document.getElementById('app')

if (el) {
  ReactDOM.render(<App />, el)
}
