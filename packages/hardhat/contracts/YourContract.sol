//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
//import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {

	uint8 constant CHANCE_IN_100_TO_CATCH = 25;// % 

	//mapping (address => mapping (uint256 => bytes32)) public fishBytes;

	mapping (address => mapping (bytes32 => mapping(uint256 => uint256))) public fishType;

	mapping (address => mapping (bytes32 => mapping(uint256 => uint256))) public fishSize;

	function getAllFishInfo(address _fisher, bytes32 _party) public view returns (uint256[] memory,uint256[] memory) {
		uint256[] memory _fishTypes = new uint256[](balanceOf[_fisher][_party]);
		for(uint256 i=0;i<balanceOf[_fisher][_party];i++){
			_fishTypes[i] = fishType[_fisher][_party][i];
		}
		uint256[] memory _fishWeights = new uint256[](balanceOf[_fisher][_party]);
		for(uint256 i=0;i<balanceOf[_fisher][_party];i++){
			_fishWeights[i] = fishSize[_fisher][_party][i];
		}
		return (_fishTypes,_fishWeights);
	}

	mapping (address => mapping (bytes32 => uint256)) public totalFishWeight;

	mapping (address => mapping (bytes32 => uint256)) public balanceOf;

	//mapping (address => mapping (bytes32 => uint256)) public totalWeight;

	mapping (bytes32 => mapping (address => uint256)) public castedOut;

	function castOut(bytes32 _party) public {
		require(castedOut[_party][msg.sender]==0, "You have already casted out");
		castedOut[_party][msg.sender] = block.number;
	}

	function balancesOf(bytes32 _party, address[] memory _fishers) public view returns (uint256[] memory,uint256[] memory) {
		uint256[] memory _balances = new uint256[](_fishers.length);
		for(uint256 i=0;i<_fishers.length;i++){
			_balances[i] = balanceOf[_fishers[i]][_party];
		}
		uint256[] memory _weights = new uint256[](_fishers.length);
		for(uint256 i=0;i<_fishers.length;i++){
			_weights[i] = totalFishWeight[_fishers[i]][_party];
		}
		return (_balances,_weights);
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
			//console.log("CAUGHT",uint256(fish));
			(
				fishType[msg.sender][_party][balanceOf[msg.sender][_party]],
				fishSize[msg.sender][_party][balanceOf[msg.sender][_party]]
			) = determineFishStats(fish);
			totalFishWeight[msg.sender][_party] += fishSize[msg.sender][_party][balanceOf[msg.sender][_party]];
			balanceOf[msg.sender][_party]++;
		}else{
			//console.log("NOPE");
		}
		castedOut[_party][msg.sender] = 0;

	}

	function determineFishStats(bytes32 _fish) public view returns (uint256,uint256) {
		uint16 outOfTenThousand = uint16(uint256(_fish)%10000);

		// instead of funning all the keccak256s, we can just get bytes of the fish as we need
		// but doing it the lazy way at first and just hashing it over and over sorry

		uint256 secondRandom = uint256(keccak256(abi.encodePacked(_fish)));

		uint256 thirdRandom = uint256(keccak256(abi.encodePacked(secondRandom)));

		//console.log("outOfTenThousand",outOfTenThousand);

		if(outOfTenThousand<6000){
			return (0,4-secondRandom%3+thirdRandom%3);
		} else if(outOfTenThousand<7800){
			return (1,8-secondRandom%4+thirdRandom%4);
		} else if(outOfTenThousand<8800){
			return (2,12-secondRandom%5+thirdRandom%5);
		} else if(outOfTenThousand<9400){
			return (3,16-secondRandom%6+thirdRandom%6);
		}else if(outOfTenThousand<9700){
			return (4,20-secondRandom%7+thirdRandom%7);
		}else if(outOfTenThousand<9900){
			return (5,24-secondRandom%8+thirdRandom%8);
		}else {
			return (6,28-secondRandom%9+thirdRandom%9);
		}

	}
}
