import AES from "crypto-js/aes";

const EncryptMessage = (message: string, passcode: string) => {
    const encryptedMessage = AES.encrypt(message, passcode);
    return encryptedMessage.toString();
};

const DecryptMessage = (encryptedMessage: string, passcode: string) => {
    const decryptedMessage = AES.decrypt(encryptedMessage, passcode);
    return decryptedMessage.toString();
};

export default {
    EncryptMessage,
    DecryptMessage,
};
