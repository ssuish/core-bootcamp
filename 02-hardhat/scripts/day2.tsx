"use client";
import { contractABI, contractAddress } from "@/lib/contract";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export default function Home() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<ethers.Contract>();
  const [count, setCount] = useState(0);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      try {
        const account = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as string[];

        if (account) {
          setAccount(account[0]);

          const contractInstance = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setContract(contractInstance);
          fetchCount(contractInstance);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchCount = async (contractInstance: ethers.Contract) => {
    if (contractInstance) {
      const value = await contractInstance.getCounter();
      setCount(value);
    }
  };

  const increment = async () => {
    if (contract) {
      const tx = await contract.increment();
      await tx.wait();
      fetchCount(contract);
    }
  };

  const decrement = async () => {
    if (contract) {
      const tx = await contract.decrement();
      await tx.wait();
      fetchCount(contract);
    }
  };

  useEffect(() => {
    connectWallet();
  });

  return (
    <>
      <div className="flex justify-center flex-col items-center h-screen">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
        <div className="mt-5">Connected Account: {account}</div>
        <div className="mt-5">Count: {count}</div>
        <div className="flex gap-5 mt-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={increment}
          >
            Increment
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={decrement}
          >
            Decrement
          </button>
        </div>
      </div>
    </>
  );
}