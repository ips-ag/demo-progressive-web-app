import { registerAuthenticator, getCredentialId, getChallenge, verifyAuthenticator, deletedWebAuth } from './webAuthServer';
const WEBAUTH_IS_ENABLE = 'WEBAUTH_IS_ENABLE';

const base64ToBuffer = (base64: string) => Uint8Array.from(base64, c => c.charCodeAt(0));

export const verifyWebAuth = async (): Promise<boolean> => {
    const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge: base64ToBuffer(getChallenge()),
        userVerification: "required",
        allowCredentials: [{
            id: base64ToBuffer(getCredentialId()),
            type: 'public-key',
            transports: ['internal'],
        }],
        timeout: 60000,
    }

    try {
        const assertion = await navigator.credentials.get({
            publicKey: publicKeyCredentialRequestOptions
        });

        return verifyAuthenticator(assertion);
    }
    catch {
        return false;
    }
}

export const registerWebAuth = async (): Promise<boolean> => {
    const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge: base64ToBuffer(getChallenge()),
        rp: {
            name: "IPS-AG WebAuth"
        },
        user: {
            id: base64ToBuffer("ips-ag-user"),
            name: "pwa-user",
            displayName: "IPS-PWA",
        },
        pubKeyCredParams: [{ alg: -7, type: "public-key" }, { alg: -257, type: "public-key" }],
        authenticatorSelection: {
            authenticatorAttachment: "platform",
        },

        timeout: 60000,
        attestation: "none"
    };

    try {
        const credential = await navigator.credentials.create({
            publicKey: publicKeyCredentialCreationOptions
        });
        registerAuthenticator(credential);

        localStorage.setItem(WEBAUTH_IS_ENABLE, 'true');

        return true
    }
    catch {
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
