const contracts = {
  100: [
    {
      chainId: "100",
      name: "gnosis",
      contracts: {
        YourContract: {
          address: "0x8548f28896333b5809b1e9B50cbA07d0fdbd7657",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "party",
                  type: "uint256",
                },
              ],
              name: "SendTip",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_party",
                  type: "uint256",
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
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
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
                  internalType: "uint256",
                  name: "_party",
                  type: "uint256",
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
              inputs: [],
              name: "currentBlock",
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
                  name: "",
                  type: "address",
                },
              ],
              name: "fishCaught",
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
                  internalType: "uint256",
                  name: "_party",
                  type: "uint256",
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
            {
              inputs: [
                {
                  internalType: "address payable",
                  name: "_to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_party",
                  type: "uint256",
                },
              ],
              name: "sendTip",
              outputs: [],
              stateMutability: "payable",
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
          address: "0x07882Ae1ecB7429a84f1D53048d35c4bB2056877",
          abi: [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "party",
                  type: "uint256",
                },
              ],
              name: "SendTip",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_party",
                  type: "uint256",
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
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
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
                  internalType: "uint256",
                  name: "_party",
                  type: "uint256",
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
              inputs: [],
              name: "currentBlock",
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
                  name: "",
                  type: "address",
                },
              ],
              name: "fishCaught",
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
                  internalType: "uint256",
                  name: "_party",
                  type: "uint256",
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
            {
              inputs: [
                {
                  internalType: "address payable",
                  name: "_to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_party",
                  type: "uint256",
                },
              ],
              name: "sendTip",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
