//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {

	event SendTip(address indexed from, address indexed to, uint256 indexed party);

	function sendTip(address payable _to, uint256 _party) public payable {
		_to.transfer(msg.value);
		emit SendTip(msg.sender,_to,_party);
	}
}
