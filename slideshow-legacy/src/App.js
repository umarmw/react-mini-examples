import React from 'react';
import './App.css';
import 'h8k-components';

import Slides from './components/Slides';
const title = "Slideshow App";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (<div>
      <h8k-navbar header={title}></h8k-navbar>
      <div className="App">
          <Slides slides={this.props.slides} />
      </div>
  </div>)
  }
}


export default App;