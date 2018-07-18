pragma solidity ^0.4.24;

contract AssetList {

    struct Asset {
        string assetName;
        string assetDesc;
        address ownership;
    }

    Asset[] public assets;

	event AssetCreated(string assetName, string assetDesc);

	function createAsset(string _assetName, string _assetDesc) public {
        Asset memory newAsset;
        newAsset.assetName = _assetName;
        newAsset.assetDesc = _assetDesc;
        newAsset.ownership = address(0);
        assets.push(newAsset);

        AssetCreated(_assetName, _assetDesc);
	}

    function getAsset(uint i) public view returns(string, string, address) {
        require(i >= 0 && i < assets.length);
        return(assets[i].assetName, assets[i].assetDesc, assets[i].ownership);
    }

    function getAssetCount() public view returns(uint) {
        return assets.length;
    }
}
