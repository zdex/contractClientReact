import React, { Component, useState, useEffect } from "react";
import "./App.css";
import web3 from "./web3Client";
import lottery from "./lottery";
//import ethereum from './web3Client';

/*class App extends Component {

  constructor(props) {
    super(props);
    this.state = {manager:''};
  }
  async componentDidMount() {
    console.log("web3 version: " + web3.version);
    web3.eth.getAccounts().then((accts) => console.log("accts are: " + accts));

    //const accounts = await ethereum.request({ method: 'eth_accounts' });
    //console.log("eth accounts: " + accounts);
    const manager = await lottery.methods.manager().call().then(result => this.setManager(result));
    console.log(" manager: " + manager);

  
    console.log("updated manager:" + this.state.manager);
    
  }
  render() {
    return (
    <div>
      <h2>Lottery Contract</h2>
      <h3>Managed by manager: {this.state.manager}</h3>
      </div>
    );
  }
  setManager(manager) {
    this.setState({manager: manager}, () => {
      console.log("manager set: " + this.state.manager);           
  });
  }
}
*/

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [message, setMessage] = useState('');
 
  useEffect(() => {
    async function asyncCalls() {
      debugger
      await lottery.methods.findManager().call().then(result => {
        debugger
        setManager(result)});
      debugger
      console.log("manager is: " + manager);
      //await lottery.methods.players(0).call().then(result => setPlayers(result));
      await web3.eth.getBalance(lottery.options.address).then(result => {
        debugger
        setBalance(result)});      
    }
 
    asyncCalls();
  }, [])
 
  const onSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting for the transaction to be mined...');
    await lottery.methods.enter(accounts[0]).send({
      from: accounts[0],
      value: web3.utils.toWei('1', 'ether'),
    });
    setMessage('You have been entered into the lottery! Good luck!!');
  }
 
  const pickWinner = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting for the transaction to be mined...');
    await lottery.methods.pickWinner().send({ from: accounts[0] });
    setMessage('A winner has been picked!');
  };
 
  const isManager = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    return accounts[0] === manager;
  }
 
  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>
        This contract is managed by {manager}.
        There are currently {players.length} people in the pool,
        competing to win {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
      <hr />
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Each lottery ticket costs exactly 1 Ether.</label>
        </div>
        <button>Enter</button>
      </form>
      { isManager &&
        <>
          <hr />
          <h4>Ready to pick a winner?</h4>
          <button onClick={pickWinner}>Pick a winner!</button>
        </>
      }
      <hr />
      <h2>{message}</h2>
    </div>
  );
}

export default App;
