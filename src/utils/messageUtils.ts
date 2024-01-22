import AES from "crypto-js/aes";
import CryptoJS from "crypto-js";

const EncryptMessage = (message: string, passcode: string) => {
    const encryptedMessage = AES.encrypt(message, passcode);
    return encryptedMessage.toString();
};

const DecryptMessage = (encryptedMessage: string, passcode: string) => {
    const decryptedMessage = AES.decrypt(encryptedMessage, passcode);
    return decryptedMessage.toString(CryptoJS.enc.Utf8);
};

export default {
    EncryptMessage,
    DecryptMessage,
};
