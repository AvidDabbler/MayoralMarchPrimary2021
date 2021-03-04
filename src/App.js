import './App.css';
import './tailwind.min.css'
import Map from './Map'
import Buttons from './Buttons';
import React,{useEffect} from "react";
import ReactGA from "react-ga";

function App() {
  useEffect(() => {
    ReactGA.initialize('G-GD3RK5WKFH');
    ReactGA.pageview(window.location.pathname);
  })

  return (
    <div className="App">
      <Map />
      <Buttons />
    </div>
  );
}

export default App;
