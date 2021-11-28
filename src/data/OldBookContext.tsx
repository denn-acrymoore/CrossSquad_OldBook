import React from "react";
import { Toast } from "@capacitor/toast";

export const OldBookContext = React.createContext
<{
    showToast: (message: string) => void,
}>
({
    showToast: (message: string) => {}
});

const OldbookContextProvider: React.FC = props => {
    const showToast = async(message: string) => {
        await Toast.show({
            text: message,
            duration: 'long',
            position: 'bottom',
        });
    };
    
    return (
        <OldBookContext.Provider value={{showToast}}>
            {props.children}
        </OldBookContext.Provider>
    );
};

export default OldbookContextProvider;