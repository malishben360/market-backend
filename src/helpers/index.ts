import crypto from 'crypto';

//I used the crypto library to generate and encrypt values

//Encryption secret key: move it to .env later
const SECRET = 'MALISH-REST-API';

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

 