import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../../services/web3/web3.service';

declare let require: any;
const assetListArtifacts = require('../../../../../build/contracts/AssetList.json');

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  AssetList: any;
  newAsset: any;
  assetCount: number;
  assets: any;

  constructor(private web3Service: Web3Service) {
    this.newAsset = {
      name: null,
      desc: null,
    };
    this.assetCount = 0;
    this.assets = [];
  }

  ngOnInit() {
    this.web3Service
      .artifactsToContract(assetListArtifacts)
      .then(AssetListAbstraction => {
        this.AssetList = AssetListAbstraction;
      });
    this.getAssets();
  }

  async createAsset(event, form) {
    event.preventDefault();
    if (!form.valid) {
      alert('Please fill all fields');
      return;
    }
    if (!this.AssetList) {
      alert('AssetList is not loaded, unable to send transaction');
      return;
    }
    console.log('Initiating createAsset transaction');
    try {
      const deployedAssetList = await this.AssetList.deployed();
      const transaction = await deployedAssetList.createAsset.sendTransaction(
        this.newAsset.name,
        this.newAsset.desc,
        { from: this.web3Service.accounts[0] }
      );

      if (!transaction) {
        console.log('Transaction failed!');
        alert('Transaction failed!');
      } else {
        console.log('Transaction complete! TxHash: ' + transaction);
        alert('Asset Created! TxHash: ' + transaction);
      }
    } catch (e) {
      console.log(e);
    }
    this.newAsset.name = null;
    this.newAsset.desc = null;
  }

  async getAssetCount() {
    console.log('Calling getAssetCount');
    try {
      const deployedAssetList = await this.AssetList.deployed();
      const assetCount = await deployedAssetList.getAssetCount.call();
      console.log('Asset count = ' + assetCount);
      this.assetCount = assetCount;
    } catch (e) {
      console.log(e);
    }
  }

  async getAssets() {
    console.log('Calling getAssets');
    try {
      await this.getAssetCount();
      const deployedAssetList = await this.AssetList.deployed();
      this.assets = [];
      for (var i = 0; i < this.assetCount; i++) {
        const asset = await deployedAssetList.getAsset.call(i);
        console.log(asset);
        this.assets.push(asset);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
