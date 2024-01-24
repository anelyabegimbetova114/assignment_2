const { ethers } = require("ethers");

// Ethereum network and Infura API key
const ETHEREUM_NETWORK = "sepolia";
const infuraApiKey = '82aa39593ead431c9af7149334c40bc2';
const infuraProvider = `https://${ETHEREUM_NETWORK}.infura.io/v3/${infuraApiKey}`;

// Contract address and ABI
const contractAddress = '0x39c1a05f4e23f9603e920ef4e2f2de371f14943d';
const contractABI = require("./ABI.json");

// Sender's private key and address
const privateKey = '1db057d54975da4f94cd89fffa6dfb91508d58b243e112cb2eaf50c707edfd7d';
const senderAddress = '0xc35ed84AC8f9E5af3cF6Fe34CbeE3A86c4dA0feA';

// Create an ethers provider and signer
const provider = new ethers.providers.JsonRpcProvider(infuraProvider);
const wallet = new ethers.Wallet(privateKey, provider);

// Connect to the contract using the ABI and address
const myContract = new ethers.Contract(contractAddress, contractABI, wallet);

// Function to get the transaction receiver address
async function getTransactionReceiverAddress() {
  try {
    const result = await myContract.getTransactionReceiver();
    console.log("Transaction Receiver:", result);
  } catch (error) {
    console.error("Failed to get transaction receiver:", error);
  }
}

// Function to transfer tokens to a specific address
async function transferTokens(toAddress, value) {
  try {
    const tx = await myContract.transfer(toAddress, value);
    await tx.wait();
    console.log("Transfer successful!");
  } catch (error) {
    console.error("Transfer failed:", error);
  }
}

// Call the functions
getTransactionReceiverAddress();
// Example: transfer 100 tokens to address '0xRecipientAddress'
transferTokens('0xRecipientAddress', 100);