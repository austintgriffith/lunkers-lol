const contracts = {
  100: [
    {
      chainId: "100",
      name: "gnosis",
      contracts: {
        YourContract: {
          address: "0x3F930d5871e677ACF42b0D3b577F93Ece8EAb03d",
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
                {
                  internalType: "address[]",
                  name: "_fishers",
                  type: "address[]",
                },
              ],
              name: "balancesOf",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
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
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
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
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "fishType",
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
                  internalType: "address",
                  name: "_fisher",
                  type: "address",
                },
                {
                  internalType: "bytes32",
                  name: "_party",
                  type: "bytes32",
                },
              ],
              name: "getAllFishTypes",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
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
          address: "0x5eb3Bc0a489C5A8288765d2336659EbCA68FCd00",
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
                {
                  internalType: "address[]",
                  name: "_fishers",
                  type: "address[]",
                },
              ],
              name: "balancesOf",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
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
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
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
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "fishType",
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
                  internalType: "address",
                  name: "_fisher",
                  type: "address",
                },
                {
                  internalType: "bytes32",
                  name: "_party",
                  type: "bytes32",
                },
              ],
              name: "getAllFishTypes",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
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
