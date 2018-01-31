import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import JsxDemo from './jsx'
import ReduxDemo from './redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <pre>
          <JsxDemo/>
        </pre>
        <pre>
          <ReduxDemo/>
        </pre>
      </div>
    );
  }
}

export default App;
