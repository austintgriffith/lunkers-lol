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

	mapping (uint256 => mapping (address => uint256)) public castedOut;

	function castOut(uint256 _party) public {
		require(castedOut[_party][msg.sender]==0, "You have already casted out");
		castedOut[_party][msg.sender] = block.number;
	}

	function currentBlock() public view returns (uint256) {
		return block.number;
	}

	function checkForBite(uint256 _party, address _fisher, uint256 blockNumber) public view returns (bool) {
		if(block.number<blockNumber){
			return false;
		}
		console.log(castedOut[_party][_fisher]);
		console.log(_fisher);
		console.log(blockNumber);
		if(castedOut[_party][_fisher]>0 && castedOut[_party][_fisher]<blockNumber){
			console.log("valid");
			return (uint256(keccak256(abi.encodePacked(blockNumber,address(this),msg.sender,_party,blockhash(castedOut[_party][msg.sender])))) % 2) == 0;
		}
		console.log("notvalid");
		return false;
	}

	mapping (address => uint256) public fishCaught;

	function reelIn(uint256 _party,uint256 blockNumber) public {
		console.log("reelin");
		console.log(_party);
		console.log(blockNumber);
		require(castedOut[_party][msg.sender]>0, "You need to cast first.");
		require(castedOut[_party][msg.sender]<block.number, "You are still casting");

		if(checkForBite(_party,msg.sender,blockNumber)){
			console.log("CAUGHT");
			fishCaught[msg.sender]++;
		}else{
			console.log("NOPE");
		}
		castedOut[_party][msg.sender] = 0;

	}
}
