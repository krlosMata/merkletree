# merkletree
Merkle tree implementation for the iden3 javascript client library
https://github.com/iden3/iden3js

## Usage
Simple usage of library merkle tree:
```js
// Import merkle tree 
const merkleTreeLib = require('./index');

// Create merkle tree empty with a certain number of levels
let mt = new merkleTreeLib.MerkleTree.MerkleTree(140);

// Create two data leaf structure
let leaf1 = {
        data: Buffer.from('this is a test leaf'),
        indexLength: 15
      };

let leaf2 = {
        data: Buffer.from('this is a second test leaf'),
        indexLength: 15
      };

// Add leaf1 to the merkle tree
mt.addClaim(leaf1);
// Add leaf2 to the merkle tree
mt.addClaim(leaf2);

// Get leaf2 hash position
const hi2 = merkleTreeLib.common.hashBytes(leaf2.data.slice(0, leaf2.indexLength));
// Generate proof of leaf2
const proof2 = mt.generateProof(hi2);

// Check Leaf2 is on the merkle tree
let rootHex = merkleTreeLib.common.bytesToHex(mt.root);
let merkleProof2Hex = merkleTreeLib.common.bytesToHex(proof2);
let hi2Hex = merkleTreeLib.common.bytesToHex(hi2);
let ht2Hex = merkleTreeLib.common.bytesToHex(merkleTreeLib.common.hashBytes(leaf2.data));
let verified2 = merkleTreeLib.MerkleTree.checkProof(rootHex, merkleProof2Hex, hi2Hex, ht2Hex, 140);

// Check random leaf is not on the merkle tree
let leafRandom = {
        data: Buffer.from('this is a random test leaf'),
        indexLength: 15
      }
const hiRandom = merkleTreeLib.common.hashBytes(leafRandom.data.slice(0, leafRandom.indexLength));
const proofRandom = mt.generateProof(hiRandom);
let merkleProofRandom = merkleTreeLib.common.bytesToHex(proofRandom);
let hiRandomHex = merkleTreeLib.common.bytesToHex(hiRandom);
let htRandomHex = merkleTreeLib.common.bytesToHex(merkleTreeLib.common.hashBytes(leafRandom.data)); 
let verifiedRandom = merkleTreeLib.MerkleTree.checkProof(rootHex, merkleProofRandom, hiRandomHex, htRandomHex, 140);
```

## Merkle tree test
Test can be found in `merkle-tree.test.js`
Run it from root project by typing: `npm test`


