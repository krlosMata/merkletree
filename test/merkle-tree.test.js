const chai = require('chai');
const lib = require('../index');
const { expect } = chai;

describe('empty tree', () => {
  it('should be empty', () => {
    let mt = new lib.MerkleTree.MerkleTree(140);
    expect(lib.common.bytesToHex(mt.root)).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000000');
  });
});

describe('addClaim', () => {
    it('add one claim', () => {
      let mt = new lib.MerkleTree.MerkleTree(140);
      let claim = {
        data: Buffer.from('this is a test claim'),
        indexLength: 15
      };
      mt.addClaim(claim);
      expect(lib.common.bytesToHex(mt.root)).to.be.equal('0x1c4160fe7330f22ef5bd5f4eefc3a818a6dec63a5014600c83fe0ef8495e28ed');
    });
  });

describe('add two claims', () => {
    it('adding two claims', () => {
      let mt = new lib.MerkleTree.MerkleTree(140);
      let claim = {
        data: Buffer.from('this is a test claim'),
        indexLength: 15
      };
      mt.addClaim(claim);
      expect(lib.common.bytesToHex(mt.root)).to.be.equal('0x1c4160fe7330f22ef5bd5f4eefc3a818a6dec63a5014600c83fe0ef8495e28ed');
      
      let claim2 = {
        data: Buffer.from('this is a second test claim'),
        indexLength: 15
      };
      mt.addClaim(claim2);
      expect(lib.common.bytesToHex(mt.root)).to.be.equal('0xc85f08a5500320b7877bffec8298f5c222c260e6ba86968114d70f8591ccef3e');
     
    });
  });

describe('generateProof', () => {
    it('with only one claim in the MerkleTree, and with two claims in the MerkleTree', () => {
      let mt = new lib.MerkleTree.MerkleTree(140);
      let claim = {
        data: Buffer.from('this is a test claim'),
        indexLength: 15
      };
      mt.addClaim(claim);
      expect(lib.common.bytesToHex(mt.root)).to.be.equal('0x1c4160fe7330f22ef5bd5f4eefc3a818a6dec63a5014600c83fe0ef8495e28ed');
      const hi = lib.common.hashBytes(claim.data.slice(0, claim.indexLength));
      const proof = mt.generateProof(hi);
      expect(lib.common.bytesToHex(proof)).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000000');
  
      let claim2 = {
        data: Buffer.from('this is a second test claim'),
        indexLength: 15
      };
      mt.addClaim(claim2);
      expect(lib.common.bytesToHex(mt.root)).to.be.equal('0xc85f08a5500320b7877bffec8298f5c222c260e6ba86968114d70f8591ccef3e');
      const hi2 = lib.common.hashBytes(claim2.data.slice(0, claim2.indexLength));
      const proof2 = mt.generateProof(hi2);
      expect(lib.common.bytesToHex(proof2)).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000001feedc5746452611b2d5fc83bbc72ebeb1e284c071e1552a1876ae7e1d5043946');
    });
  });

describe('generateProof of emptyLeaf', () => {
    it('with only one claim in the MerkleTree, and with two claims in the MerkleTree', () => {
      let mt = new lib.MerkleTree.MerkleTree(140);
      let claim = {
        data: Buffer.from('this is a test claim'),
        indexLength: 15
      };
      mt.addClaim(claim);
      expect(lib.common.bytesToHex(mt.root)).to.be.equal('0x1c4160fe7330f22ef5bd5f4eefc3a818a6dec63a5014600c83fe0ef8495e28ed');
      const hi = lib.common.hashBytes(claim.data.slice(0, claim.indexLength));
      const proof = mt.generateProof(hi);
      expect(lib.common.bytesToHex(proof)).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000000');
  
      let claim2 = {
        data: Buffer.from('this is a second test claim'),
        indexLength: 15
      };
      mt.addClaim(claim2);
      expect(lib.common.bytesToHex(mt.root)).to.be.equal('0xc85f08a5500320b7877bffec8298f5c222c260e6ba86968114d70f8591ccef3e');
      const hi2 = lib.common.hashBytes(claim2.data.slice(0, claim2.indexLength));
      const proof2 = mt.generateProof(hi2);
      expect(lib.common.bytesToHex(proof2)).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000001feedc5746452611b2d5fc83bbc72ebeb1e284c071e1552a1876ae7e1d5043946');
  
      // we won't add this claim to the merkletree, to generate the proof of the emptyLeaf
      let claim3 = {
        data: Buffer.from('this is a third test claim'),
        indexLength: 15
      };
      const hi3 = lib.common.hashBytes(claim3.data.slice(0, claim3.indexLength));
      const proof3 = mt.generateProof(hi3);
      expect(lib.common.bytesToHex(proof3)).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000003c11c2813e3b6ab49fb0a1236bd6b0b150d06a9ddc04fbde23d3cb71f58ee9d7ffeedc5746452611b2d5fc83bbc72ebeb1e284c071e1552a1876ae7e1d5043946');
    });
  });
  
describe('getClaimByHi', () => {
    it('getClaimByHi', () => {
      let mt = new lib.MerkleTree.MerkleTree(140);
      let claim = {
        data: Buffer.from('this is a test claim'),
        indexLength: 15
      };
      mt.addClaim(claim);
      expect(lib.common.bytesToHex(mt.root)).to.be.equal('0x1c4160fe7330f22ef5bd5f4eefc3a818a6dec63a5014600c83fe0ef8495e28ed');
  
      let claim2 = {
        data: Buffer.from('this is a second test claim'),
        indexLength: 15
      };
      mt.addClaim(claim2);
      expect(lib.common.bytesToHex(mt.root)).to.be.equal('0xc85f08a5500320b7877bffec8298f5c222c260e6ba86968114d70f8591ccef3e');
      const hi2 = lib.common.hashBytes(claim2.data.slice(0, claim2.indexLength));
      let bytesInHi = mt.getClaimByHi(hi2);
      expect(bytesInHi).to.be.equal(lib.common.bytesToHex(claim2.data));
    });
  });
  
describe('checkProof of a Leaf', () => {
  it('checkProof', () => {
    const rootHex = '0x7d7c5e8f4b3bf434f3d9d223359c4415e2764dd38de2e025fbf986e976a7ed3d';
    const mpHex = '0x0000000000000000000000000000000000000000000000000000000000000002d45aada6eec346222eaa6b5d3a9260e08c9b62fcf63c72bc05df284de07e6a52';
    const hiHex = '0x786677808ba77bdd9090a969f1ef2cbd1ac5aecd9e654f340500159219106878';
    const htHex = '0x786677808ba77bdd9090a969f1ef2cbd1ac5aecd9e654f340500159219106878';
    const verified = lib.MerkleTree.checkProof(rootHex, mpHex, hiHex, htHex, 140);
    expect(verified).to.be.equal(true);
  });
});

describe('checkProof of Empty Leaf', () => {
  it('checkProof', () => {
    const rootHex = '0x8f021d00c39dcd768974ddfe0d21f5d13f7215bea28db1f1cb29842b111332e7';
    const mpHex = '0x0000000000000000000000000000000000000000000000000000000000000004bf8e980d2ed328ae97f65c30c25520aeb53ff837579e392ea1464934c7c1feb9';
    const hiHex = '0xa69792a4cff51f40b7a1f7ae596c6ded4aba241646a47538898f17f2a8dff647';
    const htHex = '0x0000000000000000000000000000000000000000000000000000000000000000';
    const verified = lib.MerkleTree.checkProof(rootHex, mpHex, hiHex, htHex, 140);
    expect(verified).to.be.equal(true);
  });
});

describe('generateProof and checkProof', () => {
  it('generateProof and checkProof', () => {
    let mt = new lib.MerkleTree.MerkleTree(140);
    let claim = {
      data: Buffer.from('this is a test claim'),
      indexLength: 15
    };
    mt.addClaim(claim);
    expect(lib.common.bytesToHex(mt.root)).to.be.equal('0x1c4160fe7330f22ef5bd5f4eefc3a818a6dec63a5014600c83fe0ef8495e28ed');
    const hi = lib.common.hashBytes(claim.data.slice(0, claim.indexLength));
    const proof = mt.generateProof(hi);
    expect(lib.common.bytesToHex(proof)).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000000');

    let claim2 = {
      data: Buffer.from('this is a second test claim'),
      indexLength: 15
    };
    mt.addClaim(claim2);
    expect(lib.common.bytesToHex(mt.root)).to.be.equal('0xc85f08a5500320b7877bffec8298f5c222c260e6ba86968114d70f8591ccef3e');
    const hi2 = lib.common.hashBytes(claim2.data.slice(0, claim2.indexLength));
    const proof2 = mt.generateProof(hi2);
    expect(lib.common.bytesToHex(proof2)).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000001feedc5746452611b2d5fc83bbc72ebeb1e284c071e1552a1876ae7e1d5043946');

    let rootHex = lib.common.bytesToHex(mt.root);
    let mpHex = lib.common.bytesToHex(proof2);
    let hiHex = lib.common.bytesToHex(hi2);
    let htHex = lib.common.bytesToHex(lib.common.hashBytes(claim2.data));
    let verified = lib.MerkleTree.checkProof(rootHex, mpHex, hiHex, htHex, 140);
    expect(verified).to.be.equal(true);


    // check proof of non existence (emptyLeaf)
    // to checkProof of an emptyLeaf, we won't add this claim to the merkletree
    let claim3 = {
      data: Buffer.from('this is a third test claim'),
      indexLength: 15
    };
    const hi3 = lib.common.hashBytes(claim3.data.slice(0, claim3.indexLength));
    const proof3 = mt.generateProof(hi3);
    expect(lib.common.bytesToHex(proof3)).to.be.equal('0x0000000000000000000000000000000000000000000000000000000000000003c11c2813e3b6ab49fb0a1236bd6b0b150d06a9ddc04fbde23d3cb71f58ee9d7ffeedc5746452611b2d5fc83bbc72ebeb1e284c071e1552a1876ae7e1d5043946');
    rootHex = lib.common.bytesToHex(mt.root);
    mpHex = lib.common.bytesToHex(proof3);
    hiHex = lib.common.bytesToHex(hi3);
    // as we are prooving an empty leaf, the Ht is an empty value (0x000...0)
    htHex = '0x0000000000000000000000000000000000000000000000000000000000000000';
    verified = lib.MerkleTree.checkProof(rootHex, mpHex, hiHex, htHex, 140);
    expect(verified).to.be.equal(true);
  });
});

describe('add claims in different orders', () => {
  it('add claims in different orders', () => {
    let mt1 = new lib.MerkleTree.MerkleTree(140);
    let claim0 = {
      data: Buffer.from('0 this is a test claim'),
      indexLength: 15
    };
    let claim1 = {
      data: Buffer.from('1 this is a test claim'),
      indexLength: 15
    };
    let claim2 = {
      data: Buffer.from('2 this is a test claim'),
      indexLength: 15
    };
    let claim3 = {
      data: Buffer.from('3 this is a test claim'),
      indexLength: 15
    };
    let claim4 = {
      data: Buffer.from('4 this is a test claim'),
      indexLength: 15
    };
    mt1.addClaim(claim0);
    mt1.addClaim(claim1);
    mt1.addClaim(claim2);
    mt1.addClaim(claim3);
    mt1.addClaim(claim4);

    let mt2 = new lib.MerkleTree.MerkleTree(140);
    mt2.addClaim(claim2);
    mt2.addClaim(claim1);
    mt2.addClaim(claim0);
    mt2.addClaim(claim3);
    mt2.addClaim(claim4);
    expect(lib.common.bytesToHex(mt1.root)).to.be.equal(lib.common.bytesToHex(mt2.root));
  });
});

describe('add 1000 claims', () => {
  it('add 1000 claims', () => {
    let mt = new lib.MerkleTree.MerkleTree(140);
    let numToAdd = 1000;
    for(var i=0; i<numToAdd; i++) {
      let claim = {
        data: Buffer.from(i + ' this is a test claim'),
        indexLength: 15
      };
      mt.addClaim(claim);
    }
    expect(lib.common.bytesToHex(mt.root)).to.be.equal('0xf1f6e6380d311dd7742be1aaecc35e9d7218bf11218d9f5bf8f7497b00a830c9');
  });
});

