import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageInput from './Components/ImageInput/ImageInput';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';


const particlesOpts = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: ""
    }
  };

  onInputChange = (event) => console.log(event.target.value);
  
  onButtonSubmit = () => console.log("click");

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOpts}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageInput
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}/>
              {/*
              <FaceRecignition />*/}
      </div>
    );
  }
}

export default App;
