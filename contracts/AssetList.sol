pragma solidity ^0.4.24;

contract AssetList {

    struct Asset {
        string name;
        string desc;
        address ownership;
    }

    Asset[] public assets;

	event AssetCreated(string name, string desc);

	function createAsset(string _name, string _desc) public {
        Asset memory newAsset;
        newAsset.name = _name;
        newAsset.desc = _desc;
        newAsset.ownership = address(0);
        assets.push(newAsset);

        emit AssetCreated(_name, _desc);
	}

    function getAsset(uint i) public view returns(string, string, address) {
        require(i >= 0 && i < assets.length);
        return(assets[i].name, assets[i].desc, assets[i].ownership);
    }

    function getAssetCount() public view returns(uint) {
        return assets.length;
    }
}
