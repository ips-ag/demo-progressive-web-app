import { registerAuthenticator, getCredentialId, codeChallenge, verifyAuthenticator, deletedWebAuth } from './webAuthServer';
import { base64ToArrayBuffer, stringToBuffer } from './dataHelper';

const WEBAUTH_IS_ENABLE = 'WEBAUTH_IS_ENABLE';

export const verifyWebAuth = async (): Promise<boolean> => {
    const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge: stringToBuffer(codeChallenge),
        userVerification: "required",
        allowCredentials: [{
            id: base64ToArrayBuffer(getCredentialId()),
            type: 'public-key',
            transports: ['internal'],
        }],
    }

    try {
        const assertion = await navigator.credentials.get({
            publicKey: publicKeyCredentialRequestOptions
        });

        return verifyAuthenticator(assertion);
    }
    catch (error) {
        console.info(error);
        return false;
    }
}

export const registerWebAuth = async (): Promise<boolean> => {
    const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge: stringToBuffer(codeChallenge),
        rp: {
            name: "IPS-AG WebAuth",
        },
        user: {
            id: stringToBuffer("ips-ag-user"),
            name: "pwa-user",
            displayName: "IPS-PWA",
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }],
        authenticatorSelection: {
            authenticatorAttachment: "platform",
        },
        attestation: "direct"
    };

    try {
        return await navigator.credentials.create({
            publicKey: publicKeyCredentialCreationOptions
        }).then(credential => {
            registerAuthenticator(credential);

            localStorage.setItem(WEBAUTH_IS_ENABLE, 'true');

            return true
        });
    }
    catch (error) {
        console.info(error);
        return false;
    }
}

export const checkLockAppStatus = (): boolean => {
    const isEnable = localStorage.getItem(WEBAUTH_IS_ENABLE);
    return isEnable !== undefined && isEnable !== null && isEnable === 'true'
}

export const unLockApp = () => {
    deletedWebAuth();
    localStorage.removeItem(WEBAUTH_IS_ENABLE);
}
