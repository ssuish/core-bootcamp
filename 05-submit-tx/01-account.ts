import path from 'path'
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

import { Hex, createPublicClient, http, formatEther } from 'viem';
import { privateKeyToAccount } from "viem/accounts";

const privateKey = `0x${process.env.PRIVATE_KEY}`;
const account = privateKeyToAccount(privateKey as Hex);

(async () => {
  console.log('wallet', account.address);
  const client = createPublicClient({
    transport: http(process.env.API_URL),
  });

  const balance = await client.getBalance({
    address: account.address,
  });

  console.log('balance', formatEther(balance));

  const nonce = await client.getTransactionCount({
    address: account.address,
  });

  console.log('nonce', nonce);
})();