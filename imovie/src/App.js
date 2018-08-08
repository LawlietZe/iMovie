import React, { Component } from 'react';
import Header    from './components/Header/Header';
import Container from './components/Container/Container';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Container></Container>
      </div>
    );
  }
}
export default App;
