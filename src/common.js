const createKeccakHash = require('keccak')

/**
 * Create a hash from a Buffer (a byte)
 *
 * @param {Buffer} b - A byte. It's a Buffer to do the hash
 * @returns {PromiseLike<ArrayBuffer>} - A hash created with keccak256
 */
const hashBytes = function(b) {
    return createKeccakHash('keccak256').update(b).digest();
};

const bytesToHex = function(buff) {
    return `0x${buff.toString('hex')}`;
};

module.exports = {
    hashBytes,
    bytesToHex
};