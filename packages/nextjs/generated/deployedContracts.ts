const contracts = {
  100: [
    {
      chainId: "100",
      name: "gnosis",
      contracts: {
        YourContract: {
          address: "0x7C68f73cbff2cefb502f0646949D9eB595B189c7",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_party",
                  type: "bytes32",
                },
              ],
              name: "castOut",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "castedOut",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_party",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "_fisher",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "blockNumber",
                  type: "uint256",
                },
              ],
              name: "checkForBite",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_party",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "blockNumber",
                  type: "uint256",
                },
              ],
              name: "reelIn",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        YourContract: {
          address: "0x34B40BA116d5Dec75548a9e9A8f15411461E8c70",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_party",
                  type: "bytes32",
                },
              ],
              name: "castOut",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "castedOut",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_party",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "_fisher",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "blockNumber",
                  type: "uint256",
                },
              ],
              name: "checkForBite",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_party",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "blockNumber",
                  type: "uint256",
                },
              ],
              name: "reelIn",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
