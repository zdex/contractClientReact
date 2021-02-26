import logo from './logo.svg';
import './App.css';
import web3 from './web3Client';
//import ethereum from './web3Client';

 function App() {
  console.log("web3 version: " + web3.version);
  web3.eth.getAccounts().then(accts => console.log("accts are: " + accts));
  //const accounts = await ethereum.request({ method: 'eth_accounts' });
  //console.log("eth accounts: " + accounts);
  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
