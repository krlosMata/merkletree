const chai = require('chai');
const lib = require('../index');
const { expect } = chai;

describe('hashBytes()', function() {
  it('hashBytes()', function() {
    let b = Buffer.from('test');
    let hash = lib.common.hashBytes(b);
    let hexHash = lib.common.bytesToHex(hash);
    expect(hexHash).to.be.equal('0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658');
  });
  it('hash type', function() {
    let b = Buffer.from('authorizeksign');
    let hash = lib.common.hashBytes(b);
    let hexHash = lib.common.bytesToHex(hash);
    expect(hexHash).to.be.equal('0x353f867ef725411de05e3d4b0a01c37cf7ad24bcc213141a05ed7726d7932a1f');
  });
});