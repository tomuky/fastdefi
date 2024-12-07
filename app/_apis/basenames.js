'use client';

import {
    Address,
    ContractFunctionParameters,
    createPublicClient,
    encodePacked,
    http,
    keccak256,
    namehash,
  } from "viem";
  import { base, mainnet } from "viem/chains";
  import L2ResolverAbi from "@/app/_abi/L2ResolverAbi";
  
  const BASENAME_L2_RESOLVER_ADDRESS = "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD";
  
  const BasenameTextRecordKeys = {
    Description: "description",
    Keywords: "keywords",
    Url: "url",
    Email: "email",
    Phone: "phone",
    Github: "com.github",
    Twitter: "com.twitter",
    Farcaster: "xyz.farcaster",
    Lens: "xyz.lens",
    Telegram: "org.telegram",
    Discord: "com.discord",
    Avatar: "avatar",
  };
  
  const textRecordsKeysEnabled = [
    BasenameTextRecordKeys.Description,
    BasenameTextRecordKeys.Keywords,
    BasenameTextRecordKeys.Url,
    BasenameTextRecordKeys.Github,
    BasenameTextRecordKeys.Email,
    BasenameTextRecordKeys.Phone,
    BasenameTextRecordKeys.Twitter,
    BasenameTextRecordKeys.Farcaster,
    BasenameTextRecordKeys.Lens,
    BasenameTextRecordKeys.Telegram,
    BasenameTextRecordKeys.Discord,
    BasenameTextRecordKeys.Avatar,
  ];
  
  const baseClient = createPublicClient({
    chain: base,
    transport: http("https://mainnet.base.org"),
  });
  
  export async function getBasenameAvatar(basename) {
    const avatar = await baseClient.getEnsAvatar({
      name: basename,
      universalResolverAddress: BASENAME_L2_RESOLVER_ADDRESS,
    });
  
    return avatar;
  }
  
  export function buildBasenameTextRecordContract(basename, key) {
    return {
      abi: L2ResolverAbi,
      address: BASENAME_L2_RESOLVER_ADDRESS,
      args: [namehash(basename), key],
      functionName: "text",
    };
  }
  
  // Get a single TextRecord
  export async function getBasenameTextRecord(basename, key) {
    try {
      const contractParameters = buildBasenameTextRecordContract(basename, key);
      const textRecord = await baseClient.readContract(contractParameters);
      return textRecord;
    } catch (error) {
      console.error(error);
    }
  }
  
  // Get all TextRecords
  export async function getBasenameTextRecords(basename) {
    try {
      const readContracts = textRecordsKeysEnabled.map((key) =>
        buildBasenameTextRecordContract(basename, key)
      );
      const textRecords = await baseClient.multicall({
        contracts: readContracts,
      });
  
      return textRecords;
    } catch (error) {
      console.error(error);
    }
  }
  
  /**
   * Convert a chainId to a coinType hex for reverse chain resolution
   */
  export function convertChainIdToCoinType(chainId) {
    if (chainId === mainnet.id) {
      return "addr";
    }
  
    const cointype = (0x80000000 | chainId) >>> 0;
    return cointype.toString(16).toUpperCase();
  }
  
  /**
   * Convert an address to a reverse node for ENS resolution
   */
  export function convertReverseNodeToBytes(address, chainId) {
    const addressFormatted = address.toLowerCase();
    const addressNode = keccak256(addressFormatted.substring(2));
    const chainCoinType = convertChainIdToCoinType(chainId);
    const baseReverseNode = namehash(
      `${chainCoinType.toUpperCase()}.reverse`
    );
    const addressReverseNode = keccak256(
      encodePacked(["bytes32", "bytes32"], [baseReverseNode, addressNode])
    );
    return addressReverseNode;
  }
  
  export async function getBasename(address) {
    try {
      const addressReverseNode = convertReverseNodeToBytes(address, base.id);
      const basename = await baseClient.readContract({
        abi: L2ResolverAbi,
        address: BASENAME_L2_RESOLVER_ADDRESS,
        functionName: "name",
        args: [addressReverseNode],
      });
      if (basename) {
        return basename;
      }
    } catch (error) {
      console.error(error);
    }
  }
  