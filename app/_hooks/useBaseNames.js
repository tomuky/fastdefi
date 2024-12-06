import { useReadContract } from 'wagmi';

const ENS_RESOLVER_ADDRESS = '0xC6d566A56A1aFf6508b41f6c90ff131615583BCD';

const ENS_ABI = [
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "node",
        "type": "bytes32"
      }
    ],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export function useBaseNames(address) {
  const {
    data: name,
    isError,
    isPending
  } = useReadContract({
    address: ENS_RESOLVER_ADDRESS,
    abi: ENS_ABI,
    functionName: 'name',
    args: [address],
    chainId: 8453,
  });

  return {
    name,
    isLoading: isPending,
    isError
  };
}