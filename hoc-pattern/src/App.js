import React from 'react';
import Welcome from './component/Welcome'
import './App.css';

class App extends React.Component{
  render(){
    return(
      <div className="text-center">
        <h2> HOC pattern</h2>
        <Welcome user="umar" isLoaded={true} />
      </div>
    )
  }
}

export default App;
