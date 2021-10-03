import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';


function encrpt(text) {
    const privateKey = process.env.REACT_APP_ENCRYPTION_PRIVATE_KEY
    const hashDigest = sha256(text)
    const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey))
    return hmacDigest
}

export default encrpt