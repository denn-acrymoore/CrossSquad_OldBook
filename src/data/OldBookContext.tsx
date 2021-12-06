import React, { useCallback, useEffect, useState } from "react";
import { Toast } from "@capacitor/toast";
import firebaseApp from "../InitializeFirebase";
import { getAuth, onAuthStateChanged, Unsubscribe, User } from "firebase/auth";
import { doc, DocumentSnapshot, getDoc, getFirestore } from "firebase/firestore";

export interface UserFirebase {
    email: string,
    name: string,
    address: string,
    phoneNumber: string,
}

export interface Book {
    bookId: string,
    bookOwnerUid: string,
    bookName: string,
    bookDescription: string,
    bookPrice: number,
    bookStorageRef: string,
    bookDownloadUrl: string,
    bookShoppingCart: Array<string>,
}

export const OldBookContext = React.createContext
<{
    showToast: (message: string) => void,
    currUser: User | null | undefined,
    currUserFirestore: UserFirebase | null | undefined,
    isOnAuthStateChangedCalled: boolean,
    setIsRegisteringNewUser: (state: boolean) => void,
    setCurrUserFirestore: (user: UserFirebase | null) => void,
    unregisterSellDataListener: Unsubscribe,
    setUnregisterSellDataListener: (unsubscribe: Unsubscribe) => void,
    unregisterShoppingCartDataListener: Unsubscribe,
    setUnregisterShoppingCartDataListener: (unsubscribe: Unsubscribe) => void,
    unregisterHomeDataListener: Unsubscribe,
    setUnregisterHomeDataListener: (unsubscribe: Unsubscribe) => void,
    selectedBookForShoppingCart: Book | null,
    setSelectedBookForShoppingCart: (book: Book | null) => void,
    currShoppingCart: Array<Book> | null,
    setCurrShoppingCart: (shoppingCartBooks: Array<Book>) => void,
}>
({
    showToast: (message: string) => {},
    currUser: null,
    currUserFirestore: null,
    isOnAuthStateChangedCalled: false,
    setIsRegisteringNewUser: (state: boolean) => {},
    setCurrUserFirestore: (user: UserFirebase | null | undefined) => {},
    unregisterSellDataListener: () => () => {},
    setUnregisterSellDataListener: (unsubscribe: Unsubscribe) => {},
    unregisterShoppingCartDataListener: () => () => {},
    setUnregisterShoppingCartDataListener: (unsubscribe: Unsubscribe) => {},
    unregisterHomeDataListener: () => () => {},
    setUnregisterHomeDataListener: (unsubscribe: Unsubscribe) => {},
    selectedBookForShoppingCart: null,
    setSelectedBookForShoppingCart: (book: Book | null) => {},
    currShoppingCart: null,
    setCurrShoppingCart: (shoppingCartBooks: Book[]) => {},
});

const OldBookContextProvider: React.FC = props => {
    const [currUser, setCurrUser] = useState<User | null | undefined>();
    const [currUserFirestore, setCurrUserFirestore] = useState<UserFirebase | null | undefined>();
    const [isOnAuthStateChangedCalled, setIsOnAuthStateChangedCalled] = useState<boolean>
    (false);
    const [isRegisteringNewUser, setIsRegisteringNewUser] = useState<boolean>(false);
    const [selectedBookForShoppingCart, setSelectedBookForShoppingCart] = useState<Book | null>(null);
    const [currShoppingCart, setCurrShoppingCart] = useState<Array<Book>>([]);

    // Functions to unsubscribe / detach firestore listener:
    const [unregisterSellDataListener, setUnregisterSellDataListener] = useState<Unsubscribe>(() => () => {});
    const [unregisterShoppingCartDataListener, setUnregisterShoppingCartDataListener] = useState<Unsubscribe>(() => () => {});
    const [unregisterHomeDataListener, setUnregisterHomeDataListener] = useState<Unsubscribe>(() => () => {});
    
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    // NOTE:
    // - When the user is not logged in, OnAuthStateChanged() returns null.
    // - When the user is logged in, OnAuthStateChanged() returns current user.
    // - Put onAuthStateChanged in useCallback so that it doesn't get instantiated 
    //      every time a useState is changed.
    
    const authChangeListener = useCallback(() => {
        onAuthStateChanged(auth, (user) => {
            setIsOnAuthStateChangedCalled(true);
            // showToast("currUser is changed (onAuthStateChanged)!");
            setCurrUser(user);
        });
    }, []);

    useEffect(() => {
        authChangeListener();
    }, [authChangeListener]);

    // Don't run getDoc() when registering new user to prevent race condition 
    // (When getDoc() runs at the same time as setDoc in register page).
    useEffect(() => {
        // showToast("currUser is changed (useEffect)!");
        if (currUser !== null && currUser !== undefined && isRegisteringNewUser === false 
        && (currUserFirestore === null 
            || currUserFirestore === undefined 
            || currUserFirestore!.email !== currUser!.email)
        ) {
            // showToast("Fetching user firestore data!");

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
        <OldBookContext.Provider 
            value={{
                showToast, 
                currUser, 
                currUserFirestore, 
                isOnAuthStateChangedCalled, 
                setIsRegisteringNewUser, 
                setCurrUserFirestore, 
                unregisterSellDataListener, 
                setUnregisterSellDataListener,
                unregisterShoppingCartDataListener,
                setUnregisterShoppingCartDataListener,
                unregisterHomeDataListener, 
                setUnregisterHomeDataListener,
                selectedBookForShoppingCart, 
                setSelectedBookForShoppingCart,
                currShoppingCart,
                setCurrShoppingCart}}>
            {props.children}
        </OldBookContext.Provider>
    );
};

export default OldBookContextProvider;