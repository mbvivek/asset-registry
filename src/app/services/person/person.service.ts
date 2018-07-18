import { Injectable } from '@angular/core';
import { Web3Service } from '../web3/web3.service';

declare let require: any;
const personListArtifacts = require('../../../../build/contracts/PersonList.json');

@Injectable()
export class PersonService {
  PersonList: any;
  constructor(private web3Service: Web3Service) {
    this.web3Service
      .artifactsToContract(personListArtifacts)
      .then(PersonListAbstraction => {
        this.PersonList = PersonListAbstraction;
      });
  }

  async createPerson(newPerson) {
    console.log('Initiating createPerson transaction');
    if (!this.PersonList) {
      alert('PersonList is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedPersonList = await this.PersonList.deployed();
      const transaction = await deployedPersonList.createPerson.sendTransaction(
        newPerson.name,
        '' + newPerson.age,
        { from: this.web3Service.accounts[0] }
      );
      if (!transaction) {
        return { success: false, message: 'Transaction failed!' };
      } else {
        return { success: true, transaction: transaction };
      }
    } catch (e) {
      console.log('Exception while executing the createPerson transaction');
      console.warn(e);
      return { success: false, message: 'Transaction failed!' };
    }
  }

  async getPersonCount() {
    console.log('Calling getPersonCount');
    if (!this.PersonList) {
      alert('PersonList is not loaded, unable to send transaction');
      return;
    }
    try {
      const deployedPersonList = await this.PersonList.deployed();
      const personCount = await deployedPersonList.getPersonCount.call();
      return personCount;
    } catch (e) {
      console.log('Exception while calling the getPersonCount method');
      console.warn(e);
      return 0;
    }
  }

  async getPersons() {
    console.log('Calling getPersons');
    if (!this.PersonList) {
      alert('PersonList is not loaded, unable to send transaction');
      return;
    }
    try {
      let personCount = await this.getPersonCount();
      const deployedPersonList = await this.PersonList.deployed();
      var persons = [];
      for (var i = 0; i < personCount; i++) {
        const person = await deployedPersonList.getPerson.call(i);
        persons.push(person);
      }
      return persons;
    } catch (e) {
      console.log('Exception while calling the getPersons method');
      console.warn(e);
      return [];
    }
  }
}
