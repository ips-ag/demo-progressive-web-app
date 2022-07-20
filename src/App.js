import React , { useEffect }from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    console.log(process.env.REACT_APP_VERSION)
}, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width="250px" className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
