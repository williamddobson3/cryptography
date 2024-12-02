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

## Using Custom On chain Programs

When working with other programs, however, you’ll need to create instructions manually. With @solana/web3.js, you can create instructions with the TransactionInstruction constructor:

```TypeScript
const instruction = new TransactionInstruction({
  programId: PublicKey;
  keys: [
    {
      pubkey: Pubkey,
      isSigner: boolean,
      isWritable: boolean,
    },
  ],
  data?: Buffer;
});

/*
  TransactionInstruction() takes 3 fields:

  The programId field is fairly self-explanatory: it’s the public key (also called the 'address' or 'program ID') of the program.

  keys is an array of accounts and how they will be used during the transaction. You need to know the behavior of the program you are calling and ensure that you provide all of the necessary accounts in the array.

  pubkey - the public key of the account
  isSigner - a boolean representing whether or not the account is a signer on the transaction
  isWritable - a boolean representing whether or not the account is written to during the transaction's execution
  an optional Buffer containing data to pass to the program. 
*/
```

### To show more info in the Solana Explorer

```TypeScript
console.log(
  `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
);
```

