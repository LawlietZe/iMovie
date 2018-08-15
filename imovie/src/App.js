import React, { Component } from 'react';
import Header    from './components/Header/Header';
import { BrowserRouter, Route, Link } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter
            basename="/"
            forceRefresh={false}
            keyLength={12}
            >
            <div>
                <Header></Header>
            </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
