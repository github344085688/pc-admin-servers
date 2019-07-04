/**
 * Created by f on 2019/7/2.
 */
const CryptoJS = require("crypto-js");
let service = (app, ctx) => {
     function serEncrypt(data, publicKey, publicIv) {
        const cryptoKey = CryptoJS.enc.Utf8.parse(publicKey)
        const cryptoIv = CryptoJS.enc.Utf8.parse(publicIv)
        let dealData = ''
        if (typeof(data) == "object") {
            dealData = JSON.stringify(data)
        } else {
            dealData = data
        }
        let srcs = CryptoJS.enc.Utf8.parse(dealData)
        let encrypted = CryptoJS.AES.encrypt(srcs, cryptoKey, {iv: cryptoIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7})
        return encrypted.ciphertext.toString().toUpperCase()

    }
     function serDecrypt(dataString, publicKey, publicIv) {
        const cryptoKey = CryptoJS.enc.Utf8.parse(publicKey)
        const cryptoIv = CryptoJS.enc.Utf8.parse(publicIv)
        let encryptedHexStr = CryptoJS.enc.Hex.parse(dataString)
        let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
        let decrypt = CryptoJS.AES.decrypt(srcs, cryptoKey, { iv: cryptoIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
        let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
        return JSON.parse(decryptedStr)
    }

    function generateMD5pod(dataString) {
        return CryptoJS.MD5(dataString).toString()
    }

    return {
        serEncrypt,
        serDecrypt,
        generateMD5pod
    }
}
module.exports = app => {
    return ctx => service(app, ctx)
}