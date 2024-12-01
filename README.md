## Generate Keypair
File - `generate-keypair.ts`

## Reading Data from the Solana Network
File - `check-balance.ts`

### Pseudocode

1. Connect with a Solana Cluster (Devnet)
2. Get the Public Key.
3. Get the Balance associated with the Public Key Address from the Connection.


```TypeScript
const connection = new Connection(clusterApiUrl("devnet"));
const publicKey = new PublicKey(PUBLIC_KEY);

(async () => {
  const balance = await connection.getBalance(publicKey);
  const balanceInSol = balance / LAMPORTS_PER_SOL;

  console.log(`Balance of ${PUBLIC_KEY} is ${balanceInSol} SOL`);
})()
```

## Create Transactions
File - `transfer.ts`

## Summary

```
/* Step 1: Get the Keys
- Keypair of the Sender
- Public Key of the Receiver
*/

// Step 2: Establish a connection with the Solana Network

// Step 3: Create a Transaction

// Step 4: Create an Instruction

// Step 5: Add the Instruction to the Transaction

// Step 6: Send the transaction to the cluster and confirm it
```