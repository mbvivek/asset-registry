pragma solidity ^0.4.24;

contract PersonList {

    struct Person {
        string name;
        string age;
    }

    Person[] public persons;

	event PersonCreated(string name, string age);

	function createPerson(string _name, string _age) public {
        Person memory newPerson;
        newPerson.name = _name;
        newPerson.age = _age;
        persons.push(newPerson);

        emit PersonCreated(_name, _age);
	}

    function getPerson(uint i) public view returns(string, string) {
        require(i >= 0 && i < persons.length);
        return(persons[i].name, persons[i].age);
    }

    function getPersonCount() public view returns(uint) {
        return persons.length;
    }
}
