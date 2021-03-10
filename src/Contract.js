import React, { Component } from "react";
import { ethers } from "ethers";
import { abi, address } from "./etherLottery";
import LotteryApp_1 from "./LotteryApp_1";

class Contract extends Component {
  _tokenContract;
  signer;
  constructor(props) {
    super(props);
    this.state = {
      signer: null,
      state_tokenContract: null,
    };
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const sig = provider.getSigner();
      this.signer = sig;
      //this.setState({ signer: sig });
      //this.provider = new ethers.providers.JsonRpcProvider("http://localhost:8500")
      this._tokenContract = new ethers.Contract(address, abi, this.signer)
      /* this.setState({
        _tokenContract: new ethers.Contract(address, abi, sig),
      }); */
    }
  }

  render() {
    return (
      <div>
        <LotteryApp_1
          cont={this._tokenContract}
          sign={this.signer}
        ></LotteryApp_1>
      </div>
    );
  }
}

export default Contract;
