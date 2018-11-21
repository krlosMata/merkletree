const createKeccakHash = require('keccak')

/**
 * Create a hash from a Buffer (a byte)
 * @param {Buffer} b - A byte. It's a Buffer to do the hash
 * @returns {PromiseLike<ArrayBuffer>} - A hash created with keccak256
 */
const hashBytes = function(b) {
    return createKeccakHash('keccak256').update(b).digest();
};

/**
 * Decode a Buffer to a string (UTF-16)
 * @param {Buffer} buff - Buffer to decode
 * @returns {String} - Decoded Buffer in UTF-16
 */
const bytesToHex = function(buff) {
    return `0x${buff.toString('hex')}`;
};

/**
 * Allocates a new Buffer using a hexadecimal string sent
 * @param {String} hex - Hexadecimal string to parse to a Buffer of bytes
 * @returns {Buffer} - A new Buffer
 */
const hexToBytes = function(hex) {
    if(hex.substring(0, 2) === '0x')
        return Buffer.from(hex.substring(2),'hex');
};

module.exports = {
    hashBytes,
    bytesToHex,
    hexToBytes
};

