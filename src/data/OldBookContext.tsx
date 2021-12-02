import React, { useCallback, useEffect, useState } from "react";
import { Toast } from "@capacitor/toast";
import firebaseApp from "../InitializeFirebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export const OldBookContext = React.createContext
<{
    showToast: (message: string) => void,
    currUser: User | null | undefined,
}>
({
    showToast: (message: string) => {},
    currUser: null,
});


const OldbookContextProvider: React.FC = props => {
    const [currUser, setCurrUser] = useState<User | null | undefined>();
    
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
        console.log("onAuthStateChanged is called!");
        setCurrUser(user);
    });

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
        <OldBookContext.Provider value={{showToast, currUser}}>
            {props.children}
        </OldBookContext.Provider>
    );
};

export default OldbookContextProvider;