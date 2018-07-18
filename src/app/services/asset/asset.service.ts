import { Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';

declare let require: any;
const assetListArtifacts = require('../../../../build/contracts/AssetList.json');

@Injectable()
export class AssetService {
  AssetList: any;
  constructor(private web3Service: Web3Service) {
    this.web3Service
      .artifactsToContract(assetListArtifacts)
      .then(AssetListAbstraction => {
        this.AssetList = AssetListAbstraction;
      });
  }

  async createAsset(newAsset) {
    console.log('Initiating createAsset transaction');
    if (!this.AssetList) {
      alert('AssetList is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedAssetList = await this.AssetList.deployed();
      const transaction = await deployedAssetList.createAsset.sendTransaction(
        newAsset.name,
        newAsset.desc,
        { from: this.web3Service.accounts[0] }
      );
      if (!transaction) {
        return { success: false, message: 'Transaction failed!' };
      } else {
        return { success: true, transaction: transaction };
      }
    } catch (e) {
      console.log('Exception while executing the createAsset transaction');
      console.warn(e);
      return { success: false, message: 'Transaction failed!' };
    }
  }

  async getAssetCount() {
    console.log('Calling getAssetCount');
    if (!this.AssetList) {
      alert('AssetList is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedAssetList = await this.AssetList.deployed();
      const assetCount = await deployedAssetList.getAssetCount.call();
      console.log(assetCount);
      return assetCount;
    } catch (e) {
      console.log('Exception while calling the getAssetCount method');
      console.warn(e);
      return 0;
    }
  }

  async getAssets() {
    console.log('Calling getAssets');
    if (!this.AssetList) {
      alert('AssetList is not loaded, unable to send transaction');
      return;
    }
    try {
      let assetCount = await this.getAssetCount();
      const deployedAssetList = await this.AssetList.deployed();
      var assets = [];
      for (var i = 0; i < assetCount; i++) {
        const asset = await deployedAssetList.getAsset.call(i);
        assets.push(asset);
      }
      return assets;
    } catch (e) {
      console.log('Exception while calling the getAssets method');
      console.warn(e);
      return [];
    }
  }
}
