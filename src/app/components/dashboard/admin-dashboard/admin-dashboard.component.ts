import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../../services/web3/web3.service';
import { PersonService } from '../../../services/person/person.service';
import { AssetService } from '../../../services/asset/asset.service';

declare let require: any;
const assetListArtifacts = require('../../../../../build/contracts/AssetList.json');
const personListArtifacts = require('../../../../../build/contracts/PersonList.json');

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  AssetList: any;
  PersonList: any;
  newAsset: any;
  assets: any;
  newPerson: any;
  persons: any;

  constructor(
    private web3Service: Web3Service,
    private personService: PersonService,
    private assetService: AssetService
  ) {
    this.newAsset = {
      name: null,
      desc: null,
    };
    this.assets = [];
    this.newPerson = {
      name: null,
      age: null,
    };
    this.persons = [];
  }

  ngOnInit() {}

  generateAccount() {
    var mnemonic = this.web3Service.generateMnemonic();
    console.log('seed words = ' + mnemonic);
    var wallet = this.web3Service.generateWalletFromSeed(mnemonic);
    var address = wallet.getChecksumAddressString();
    var publicKey = wallet.getPublicKeyString();
    var privateKey = wallet.getPrivateKeyString();
    console.log('address = ' + address);
    console.log('publicKey = ' + publicKey);
    console.log('privateKey = ' + privateKey);
    // var message = 'Vivek';
    var message1 = {
      firstname: 'Vivek',
      lastname: 'Badrinarayan',
    };
    var message2 = {
      lastname: 'Badrinarayan',
      firstname: 'Vivekk',
    };
    var signature1 = this.web3Service.sign(message1, privateKey);
    console.log(signature1);
    var recover1 = this.web3Service.recoverFromSignatureObj(signature1);
    console.log('recover = ' + recover1);
    var signature2 = this.web3Service.sign(message2, privateKey);
    console.log(signature2);
    var recover2 = this.web3Service.recoverFromSignatureObj(signature2);
    console.log('recover = ' + recover2);
  }

  async createAsset(event, form) {
    event.preventDefault();
    if (!form.valid) {
      alert('Please fill all fields');
      return;
    }
    let result = await this.assetService.createAsset(this.newAsset);
    if (!result.success) {
      console.log(result['message']);
    } else {
      console.log('Transaction Successful! TxHash: ' + result['transaction']);
      alert('Transaction Successful! TxHash: ' + result['transaction']);
    }
    this.newAsset.name = null;
    this.newAsset.desc = null;
  }

  async getAssets() {
    this.assets = await this.assetService.getAssets();
    console.log(this.assets);
  }

  async createPerson(event, form) {
    event.preventDefault();
    if (!form.valid) {
      alert('Please fill all fields');
      return;
    }
    let result = await this.personService.createPerson(this.newPerson);
    if (!result['success']) {
      console.log(result['message']);
    } else {
      console.log('Transaction Successful! TxHash: ' + result['transaction']);
      alert('Transaction Successful! TxHash: ' + result['transaction']);
    }
    this.newPerson.name = null;
    this.newPerson.age = null;
  }

  async getPersons() {
    this.persons = await this.personService.getPersons();
    console.log(this.persons);
  }
}
