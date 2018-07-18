pragma solidity ^0.4.24;

contract OwnershipList {

	mapping (bytes32 => address) ownerships;

	event OwnerAssigned(bytes32 _assetId, address _person);

	function assignOwner(bytes32 _assetId, address _person) public {
		ownerships[_assetId] = _person;
        emit OwnerAssigned(_assetId, _person);
	}

	function getOwnerOfAsset(bytes32 _assetId) public view returns(address) {
		return ownerships[_assetId];
	}
}
