import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import "dotenv/config";

const SOL_TO_SEND = 0.1 // SOL
const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

// Sender Keypair
const senderKeyPair = await getKeypairFromEnvironment("SECRET_KEY");

// Receiver Public Key
let receiverPublicKey: PublicKey;
try {
  receiverPublicKey = new PublicKey(process.argv[2])
} catch (error) {
  throw new Error("Invalid Receiver Public Key")
}

// Transaction Details before Transaction
await getTransactionDetails(senderKeyPair.publicKey, receiverPublicKey)

// Create Transaction
const transaction = new Transaction()

// Create Instruction
const instruction = SystemProgram.transfer({
  fromPubkey: senderKeyPair.publicKey,
  toPubkey: receiverPublicKey,
  lamports: SOL_TO_SEND * LAMPORTS_PER_SOL
})

// Add Instruction to the Transaction
transaction.add(instruction)

// Send Transaction to the cluster and confirm it
const signature = await sendAndConfirmTransaction(connection, transaction, [ senderKeyPair ])

console.log(
  `💸 Finished! Sent ${SOL_TO_SEND} SOL to the address ${receiverPublicKey}. `,
);
console.log(`Transaction signature is ${signature}!`);

// Transaction Details after Transaction
await getTransactionDetails(senderKeyPair.publicKey, receiverPublicKey)


// Functions ------
async function getTransactionDetails(senderPublicKey: PublicKey, receiverPublicKey: PublicKey): Promise<void> {
  const senderBalance = await getBalance(senderKeyPair.publicKey)
  const receiverBalance = await getBalance(receiverPublicKey)  

  console.log("Transaction Details: ")
  console.log(`Sender's Balance: ${senderBalance} SOL`)
  console.log(`Receiver's Balance: ${receiverBalance} SOL`)
}

async function getBalance(key: PublicKey): Promise<number> {
  const balance = await connection.getBalance(key)
  return balance / LAMPORTS_PER_SOL
}