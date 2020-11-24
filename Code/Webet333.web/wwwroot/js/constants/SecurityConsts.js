var key = '2193D83E3FB2BDC186C91CDC1133D';

function enc(plaintext) {
    if (plaintext == null)
        return null
    return CryptoJS.AES.encrypt(plaintext, key);
}

function dec(ciphertext) {
    if (ciphertext == null)
        return null
    var decryptedBytes = CryptoJS.AES.decrypt(ciphertext, key);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
}