import { initializeApp } from "firebase/app";
import { getToken, onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";

import { getFirestore, collection, addDoc, serverTimestamp, deleteDoc, doc, getDocs, DocumentData, QueryDocumentSnapshot, SnapshotOptions, Firestore } from 'firebase/firestore';
import firebaseProps from '../lib/firebaseProps'
const FIRE_BASE_KEY = "BD7clPSgMcuicusnEVxxIPy9JOdnIA1ttNU2iqvkDqiSn3G2kXxfLGdsR-1xJJxGbngOBd2tVAY0EtpLs57hZa4";
const LocalStorageIdFCMToken = "IdFCMToken";
const fcProps = firebaseProps();


const requestPermission = () => {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.info('Notification permission granted.');
        }
    })
}

export const checkNotificationStatus = (): boolean => {
    const idFCMTOken = localStorage.getItem(LocalStorageIdFCMToken);
    return idFCMTOken !== undefined && idFCMTOken !== null && idFCMTOken !== ''
}

export const initializeFCM = async (): Promise<boolean> => {
    requestPermission();
    const app = initializeApp(fcProps.firebaseConfig);
    const messaging = getMessaging(app);
    let isSuccess = false;

    if (Notification.permission === 'granted') {
        await getToken(messaging, { vapidKey: FIRE_BASE_KEY }).then(async (currentToken) => {
            if (currentToken) {
                await saveNotificationToken(currentToken);
                isSuccess = true;
            } else {
                console.info('No registration token available. Request permission to generate one.');
            }
        }).catch((err) => {
            console.info('An error occurred while retrieving token. ', err);
        });

        onMessage(messaging, (payload) => {
            console.info('Message received. ', payload);
        });
    }
    return isSuccess;
}
const saveNotificationToken = async (token: string) => {
    const app = initializeApp(fcProps.firebaseConfig);
    const db = getFirestore(app);
    try {
        const docRef = await addDoc(collection(db, 'FCM-tokens'), {
            timestamp: serverTimestamp(),
            token: token
        });
        localStorage.setItem(LocalStorageIdFCMToken, docRef.id);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

const getFCMTokens = async () => {
    const idFCMTOken = localStorage.getItem(LocalStorageIdFCMToken);
    let tokens: string[] = []
    const app = initializeApp(fcProps.firebaseConfig);
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "FCM-tokens").withConverter(FCMTokenConverter));
    querySnapshot.forEach((doc) => {
        if (idFCMTOken !== doc.data().id)
            tokens.push(doc.data().token)
    });

    return tokens;
}

export const deleteNotificationToken = async (): Promise<boolean> => {
    let isSuccess = false;
    const app = initializeApp(fcProps.firebaseConfig);

    const db = getFirestore(app);
    const idFCMTOken = localStorage.getItem(LocalStorageIdFCMToken);
    if (idFCMTOken) {
        try {
            await deleteDoc(doc(db, 'FCM-tokens', idFCMTOken));
            isSuccess = true;
            localStorage.removeItem(LocalStorageIdFCMToken);
        } catch (error) {
            console.error("Error delete document: ", error);
        }
    }

    return isSuccess
}

export const sendMessage = (body: string, route: string) => {
    getFCMTokens().then(data => {
        data.forEach(async token => {
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `key=${fcProps.serverKey}`,
                },
                body: JSON.stringify({
                    notification: {
                        title: "IPS-AG",
                        body: body,
                        click_action: route
                    },
                    to: token
                }),
            };

            await fetch(
                `${fcProps.domain}/fcm/send`,
                options
            );
        });
    });
}

class FCMToken {
    constructor(readonly id: string, readonly token: string) { }
}

const FCMTokenConverter = {
    toFirestore(post: FCMToken): DocumentData {
        return { id: post.id, token: post.token };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): FCMToken {
        const data = snapshot.data(options)!;
        return new FCMToken(data.id, data.token);
    }
};
