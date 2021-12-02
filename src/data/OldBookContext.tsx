import React, { useCallback, useEffect, useState } from "react";
import { Toast } from "@capacitor/toast";
import firebaseApp from "../InitializeFirebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, DocumentSnapshot, getDoc, getFirestore } from "firebase/firestore";

export interface UserFirebase {
    email: string,
    name: string,
    address: string,
    phoneNumber: string,
}

export const OldBookContext = React.createContext
<{
    showToast: (message: string) => void,
    currUser: User | null | undefined,
    currUserFirestore: UserFirebase | null | undefined
}>
({
    showToast: (message: string) => {},
    currUser: null,
    currUserFirestore: null,
});

const OldbookContextProvider: React.FC = props => {
    const [currUser, setCurrUser] = useState<User | null | undefined>();
    const [currUserFirestore, setCurrUserFirestore] = useState<UserFirebase | null | undefined>();

    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    onAuthStateChanged(auth, (user) => {
        console.log("onAuthStateChanged is called!");
        setCurrUser(user);
    });

    useEffect(() => {
        if (currUser != null) {
            // Get user info in Firestore:
            getDoc(doc(db, "users", currUser!.uid))
            .then((docSnap: DocumentSnapshot) => {
                if (docSnap.exists()) {
                    const docSnapData = docSnap.data();

                    const data: UserFirebase = {
                        email: docSnapData.email,
                        name: docSnapData.name,
                        address: docSnapData.address,
                        phoneNumber: docSnapData.phoneNumber,
                    }
                    
                    setCurrUserFirestore(data);
                }
                else {
                    setCurrUserFirestore(null);
                }
            });
        }
    }, [currUser])

    const showToast = async(message: string) => {
        await Toast.show({
            text: message,
            duration: 'long',
            position: 'bottom',
        });
    };

    // NOTE: Cannot use useHistory in context because context is not defined 
    // in an <IonReactRoute>

    return (
        <OldBookContext.Provider value={{showToast, currUser, currUserFirestore}}>
            {props.children}
        </OldBookContext.Provider>
    );
};

export default OldbookContextProvider;