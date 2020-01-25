import React from 'react';
import './App.css';
import ContactBook from './Components/ContactBook/ContactBook';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/ContactBook/NavBar';

function App() {
  return (
    <div className="App">
        <NavBar />
        <br/>
        <ContactBook />
    </div>
  );
}

export default App;
