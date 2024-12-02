import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import "dotenv/config";

const PING_PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
const PING_PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

// Sender Keypair
const senderKeyPair = await getKeypairFromEnvironment("SECRET_KEY");

// Create a Transaction
const transaction = new Transaction()

// Create an instruction
const instruction = new TransactionInstruction({
  programId: new PublicKey(PING_PROGRAM_ADDRESS),
  keys: [
    {
      pubkey: new PublicKey(PING_PROGRAM_DATA_ADDRESS),
      isSigner: false,
      isWritable: true
    }
  ]
})

// Add Instruction to the transaction
transaction.add(instruction)

// Send and confirm Transaction
const signature = await sendAndConfirmTransaction(connection, transaction, [ senderKeyPair ])

console.log(`✅ Transaction completed! Signature is ${signature}`);





