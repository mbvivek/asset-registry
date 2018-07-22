import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
declare let require: any;
declare let window: any;
const Web3 = require('web3');
var bip39 = require('bip39');
var hdkey = require('ethereumjs-wallet/hdkey');
var hash = require('json-hash');

@Injectable()
export class Web3Service {
  public web3: any;
  public accounts: string[];

  constructor() {
    window.addEventListener('load', event => {
      this.bootstrapWeb3();
    });
  }

  public bootstrapWeb3() {
    // check if web3 has been injected by the browser (MetaMask)
    if (typeof window.web3 !== 'undefined') {
      // use MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
      console.log('Web3 provider: MetaMask');
    } else {
      // no MataMask's provider
      // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
      Web3.providers.HttpProvider.prototype.sendAsync =
        Web3.providers.HttpProvider.prototype.send;
      // use local web3 provider (Ganache-cli)
      this.web3 = new Web3(
        new Web3.providers.HttpProvider('http://localhost:8545')
      );
      console.log('Web3 provider: Local');
    }

    this.fetchAccounts();
  }

  public async artifactsToContract(artifacts) {
    if (!this.web3) {
      const delay = new Promise(resolve => setTimeout(resolve, 100));
      await delay;
      return await this.artifactsToContract(artifacts);
    }
    const contractAbstraction = contract(artifacts);
    contractAbstraction.setProvider(this.web3.currentProvider);
    return contractAbstraction;
  }

  private fetchAccounts() {
    this.web3.eth.getAccounts((err, accs) => {
      console.log('Fetching accounts');
      if (err != null) {
        console.warn('There was an error fetching your accounts');
        return;
      }
      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn(
          "Couldn't get any accounts! Make sure your Ethereum client is configured correctly"
        );
        return;
      }
      this.accounts = accs;
      console.log('Fetched ' + this.accounts.length + ' accounts');
      console.log(this.accounts);
    });
  }

  public generateMnemonic() {
    return bip39.generateMnemonic();
  }

  public generateWalletFromSeed(mnemonic) {
    let hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));
    let wallet = hdwallet.getWallet();
    return wallet;
  }

  public sign(message, privateKey) {
    var messageHash = hash.digest(message);
    var signature = this.web3.eth.accounts.sign(messageHash, privateKey);
    signature['message'] = message;
    return signature;
  }

  public recoverFromSignatureObj(signatureObj) {
    return this.web3.eth.accounts.recover(signatureObj);
  }

  public recoverFromSignature(message, signature) {
    return this.web3.eth.accounts.recover(message, signature);
  }
}
