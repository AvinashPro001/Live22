var key = '997D7F2ADFE547AE8D7A40D519FE434018B780DD3C2147DB8CC652E152325F8B';

function dec(ciphertext) {
    if (ciphertext == null)
        return null
    var decryptedBytes = CryptoJS.AES.decrypt(ciphertext, key);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
}

function enc(plaintext) {
    if (plaintext == null)
        return null
    return CryptoJS.AES.encrypt(plaintext, key);
}