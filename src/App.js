import './App.css';
import Converter from './components/converter';
import logo from './logo.png';

function App() {
  return (
    <div className="App">
         <img className="logo" src={logo} alt="logo"/>
         <Converter/>
    </div>
  );
}

export default App;
