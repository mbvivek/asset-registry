var HDWalletProvider = require('truffle-hdwallet-provider')
var mnemonic =
  'tape cover punch spring have father column script thrive walk forest decide'
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          'https://ropsten.infura.io/MLtOhHbzu7mXc0MPtDQ9'
        )
      },
      network_id: 3,
      gas: 4500000
    }
  }
}
