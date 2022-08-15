import pkceChallenge from 'pkce-challenge';

const WEBAUTH_CREDENTIAL_ID = "WEBAUTH_CREDENTIAL_ID";
const WEBAUTH_ID = 'WEBAUTH_ID'

const bufferToBase64 = (buffer: any) => Buffer.from(buffer).toString('base64')

export const registerAuthenticator = (credential: any) => {
    const credentialId = bufferToBase64(credential.rawId);

    localStorage.setItem(WEBAUTH_CREDENTIAL_ID, JSON.stringify({ credentialId }));
    localStorage.setItem(WEBAUTH_ID, credential.id);
}

export const verifyAuthenticator = (assertion: any): boolean => {
    var authId = localStorage.getItem(WEBAUTH_ID);
    return assertion.id === authId
}

export const getCredentialId = (): string => {
    const { credentialId } = JSON.parse(localStorage.getItem(WEBAUTH_CREDENTIAL_ID) || '');
    return credentialId;
}

export const getChallenge = () => {
    return pkceChallenge().code_challenge;
}

export const deletedWebAuth = () => {
    localStorage.removeItem(WEBAUTH_CREDENTIAL_ID);
    localStorage.removeItem(WEBAUTH_ID);
}