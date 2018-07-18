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

  async createAsset(event, form) {
    event.preventDefault();
    if (!form.valid) {
      alert('Please fill all fields');
      return;
    }
    let result = await this.assetService.createAsset(this.newAsset);
    if (!result.success) {
      console.log(result.message);
    } else {
      console.log('Transaction Successful! TxHash: ' + result.transaction);
      alert('Transaction Successful! TxHash: ' + result.transaction);
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
    if (!result.success) {
      console.log(result.message);
    } else {
      console.log('Transaction Successful! TxHash: ' + result.transaction);
      alert('Transaction Successful! TxHash: ' + result.transaction);
    }
    this.newPerson.name = null;
    this.newPerson.age = null;
  }

  async getPersons() {
    this.persons = await this.personService.getPersons();
    console.log(this.persons);
  }
}
