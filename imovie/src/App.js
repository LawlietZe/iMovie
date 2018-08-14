import React, { Component } from 'react';
import Header    from './components/Header/Header';
import Container from './components/Container/Container';
import Search from './components/Search/Search';
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
            {/* <Route exact path="/" component={Container} />
            <Route path="/search" component={Search} /> */}
            </div>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
