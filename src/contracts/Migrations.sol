pragma solidity ^0.5.0;

contract Migrations{
    // to keep track of migrations occuring

    address public owner;
    uint public last_completed_migration;

    constructor() public {
        owner = msg.sender;
    }

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    // functions to set the completion of a migration and other to mark upgrade
    // upgrade runs each migration and set them to last completed migration

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}