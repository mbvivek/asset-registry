pragma solidity ^0.4.24;

import "./OwnershipList.sol";

contract AssetList {

    struct Asset {
        bytes32 id;
        string name;
        string desc;
        address owner;
    }

    Asset[] public assets;

    OwnershipList public ownershipList;

	event AssetCreated(bytes32 id, string name, string desc);

    constructor() public {
		ownershipList = new OwnershipList();
	}

	function createAsset(string _name, string _desc) public {
        Asset memory newAsset;
        newAsset.id = sha3(uintToString(now));
        newAsset.name = _name;
        newAsset.desc = _desc;
        newAsset.owner = msg.sender;
        assets.push(newAsset);

        ownershipList.assignOwner(newAsset.id, newAsset.owner);

        emit AssetCreated(newAsset.id, newAsset.name, newAsset.desc);
	}

    function getAsset(uint i) public view returns(bytes32, string, string, address) {
        require(i >= 0 && i < assets.length);
        return(assets[i].id, assets[i].name, assets[i].desc, assets[i].owner);
    }

    function getAssetCount() public view returns(uint) {
        return assets.length;
    }

    function uintToString(uint v) internal returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i + 1);
        for (uint j = 0; j <= i; j++) {
            s[j] = reversed[i - j];
        }
        str = string(s);
    }
}
