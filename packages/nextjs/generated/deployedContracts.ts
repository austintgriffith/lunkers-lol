const contracts = {
  100: [
    {
      chainId: "100",
      name: "gnosis",
      contracts: {
        YourContract: {
          address: "0xb58B2FAC2Cebe9124af8c4165336A12Eb5192d07",
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
          address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
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
