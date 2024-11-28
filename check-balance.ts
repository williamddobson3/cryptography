import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";

const PUBLIC_KEY = process.argv[2]
let publicKey: PublicKey;

if (!PUBLIC_KEY) {
  throw new Error("Public key is required");
}

// Connect to the cluster - devnet
const connection = new Connection(clusterApiUrl("devnet"));

// Validate the public key - check if it is a valid public key
try {
  publicKey = new PublicKey(PUBLIC_KEY);
} catch (error) {
  throw new Error("Invalid public key");
}

// Validate the public key - check if it is on the ed25519 curve
if (!isValidPublicKey(publicKey)) {
  throw new Error("Invalid public key");
}

// Get the balance of the account with the public key
(async () => {
  const balance = await connection.getBalance(publicKey);
  const balanceInSol = balance / LAMPORTS_PER_SOL;

  console.log(`Balance of ${PUBLIC_KEY} is ${balanceInSol} SOL`);
})()

/**
 * This will check if the public key is valid. 
 * There is a chance that the public key doesnt have a corresponding private key.
 * 
 * Check if the public key is on the ed25519 curve.
 */
function isValidPublicKey(publicKey: PublicKey): boolean {
  return PublicKey.isOnCurve(publicKey.toBytes());
}



