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

	mapping (address => mapping (bytes32 => uint256)) public balanceOf;

	mapping (bytes32 => mapping (address => uint256)) public castedOut;

	uint8 constant CHANCE_IN_100_TO_CATCH = 30;// % 

	function castOut(bytes32 _party) public {
		require(castedOut[_party][msg.sender]==0, "You have already casted out");
		castedOut[_party][msg.sender] = block.number;
	}

	function balancesOf(bytes32 _party, address[] memory _fishers) public view returns (uint256[] memory) {
		uint256[] memory _balances = new uint256[](_fishers.length);
		for(uint256 i=0;i<_fishers.length;i++){
			_balances[i] = balanceOf[_fishers[i]][_party];
		}
		return _balances;
	}

	function checkForBite(bytes32 _party, address _fisher, uint256 blockNumber) public view returns (bytes32) {
		if(block.number<blockNumber){
			return 0;
		}
		//console.log(castedOut[_party][_fisher]);
		//console.log(_fisher);
		//console.log(blockNumber);
		if(castedOut[_party][_fisher]>0 && castedOut[_party][_fisher]<blockNumber){
			uint256 rand = uint256(keccak256(abi.encodePacked(blockhash(blockNumber-1),address(this),_fisher,_party,blockhash(castedOut[_party][_fisher]))));
			//console.log("valid");
			if(rand%100<=CHANCE_IN_100_TO_CATCH){
				return keccak256(abi.encodePacked(rand,_fisher,_party));
			}else{
				return 0;
			}
		}
		//console.log("notvalid");
		return 0;
	}

	function reelIn(bytes32 _party,uint256 blockNumber) public {
		//console.log("reelin");
		//console.log(_party);
		//console.log(blockNumber);
		require(castedOut[_party][msg.sender]>0, "You need to cast first.");
		require(castedOut[_party][msg.sender]<block.number, "You are still casting");

		bytes32 fish = checkForBite(_party,msg.sender,blockNumber);

		if(fish!=bytes32(0)){
			console.log("CAUGHT",uint256(fish)%1000);
			balanceOf[msg.sender][_party]++;
		}else{
			console.log("NOPE");
		}
		castedOut[_party][msg.sender] = 0;

	}
}
