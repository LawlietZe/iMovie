import React, { Component } from 'react';
import Header    from './components/Header/Header';
import Detail    from './components/Detail/Detail';
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
                <Route exact path="/" component={Header}></Route>
                <Route path="/detail" component={Detail}></Route>
            </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
