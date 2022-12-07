//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.17;

contract cryptoLocker {
    event newLocked(
        address indexed user,
        uint amount,
        uint timeLocked,
        uint totalValueLocked
    );
    event newRetrived(
        address indexed user,
        uint valueRetrived,
        uint totalValueLocked
    );

    mapping(address => uint) cryptosLocked;
    mapping(address => bool) locked;
    mapping(address => uint) lockedPeriod;

    uint totalValueLocked;
    uint addressesLocking;
    uint totalLocks;

    //* Lock value in the contract for a set period of time. You can lock as many times as you want.
    // If you lock more value, the total value locked will be locked for the the same period of time set previously.
    // Example: time = 0 will set the new value locked to the previous locking time.
    // Example: time =1 will increment the total locking time +1 for the new value locked and the previos value locked.
    function lock(uint _amount, uint _time) public payable {
        require(msg.value > 0, "Value need to be greater than 0.");
        payable(address(this)).transfer(_amount);
        cryptosLocked[msg.sender] += _amount;
        lockedPeriod[msg.sender] += _time * 1 days + block.timestamp;
        locked[msg.sender] = true;
        totalValueLocked += _amount;
        addressesLocking++;
        totalLocks++;
        emit newLocked(msg.sender, _amount, _time, totalValueLocked);
    }

    // Claim back the total value you locked.
    function claimBack() public payable {
        require(locked[msg.sender] = true, "You are not locking any value.");
        uint valueRetrived = cryptosLocked[msg.sender];
        require(valueRetrived > 0, "0 value to unlock.");
        locked[msg.sender] = false;
        payable(msg.sender).transfer(valueRetrived);
        cryptosLocked[msg.sender] = 0;
        totalValueLocked -= msg.value;
        addressesLocking--;
        emit newRetrived(msg.sender, valueRetrived, totalValueLocked);
    }

    // Getter for the total value locked in the Smart contract
    function SCValueLocked() public view returns (uint) {
        return totalValueLocked;
    }

    // Getter for the total users locking assets.
    function usersLocking() public view returns (uint) {
        return addressesLocking;
    }
}
