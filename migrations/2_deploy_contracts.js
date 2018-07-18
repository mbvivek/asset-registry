var AssetList = artifacts.require('./AssetList.sol')
var PersonList = artifacts.require('./PersonList.sol')

module.exports = function (deployer) {
  deployer.deploy(AssetList)
  deployer.deploy(PersonList)
}
