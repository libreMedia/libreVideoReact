var CryptoJS = require("crypto-js");



// Encrypt
let hashy = (data: object) => {
    let hash = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
    return hash
}

// // Decrypt
let deHashy = (hash: string) => {
    var bytes = CryptoJS.AES.decrypt(hash, 'secret key 123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
}


export { hashy, deHashy }