import {TestBed, inject} from '@angular/core/testing';
import Web3 from 'web3';

import {Web3ServiceOld} from './web3Old.service';

import metacoin_artifacts from '../../../build/contracts/MetaCoin.json';

declare let window: any;

describe('Web3ServiceOld', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Web3ServiceOld]
    });
  });

  it('should be created', inject([Web3ServiceOld], (service: Web3ServiceOld) => {
    expect(service).toBeTruthy();
  }));

  it('should inject a default web3 on a contract', inject([Web3ServiceOld], (service: Web3ServiceOld) => {
    service.bootstrapWeb3();

    return service.artifactsToContract(metacoin_artifacts).then((abstraction) => {
      expect(abstraction.currentProvider.host).toBe('http://localhost:8545');
    });
  }));

  it('should inject a the window web3 on a contract', inject([Web3ServiceOld], (service: Web3ServiceOld) => {
    window.web3 = {
      currentProvider: new Web3.providers.HttpProvider('http://localhost:1337')
    };

    service.bootstrapWeb3();

    return service.artifactsToContract(metacoin_artifacts).then((abstraction) => {
      expect(abstraction.currentProvider.host).toBe('http://localhost:1337');
    });
  }));
});
