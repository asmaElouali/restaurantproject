import React, { createContext, useState } from 'react';
import * as Keychain from 'react-native-keychain';


interface AuthState {
    accessToken: string | null,
    refreshToken: string | null,
    authenticated: boolean | null,
}


const ThemeContext = createContext<{
    authState: AuthState;
    getAccessToken: () => string | null;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
} | null>(null)

//const { Provider } = ThemeContext;

const AuthProvider : React.FC<{ children:React.ReactNode}>  = ({ children }) => {

    const [authState, setAuthState] = useState<AuthState>({
        accessToken: null,
        refreshToken: null,
        authenticated: null,
    });

    const getAccessToken = () => {
        return authState.accessToken;
    };

    return (
        <ThemeContext.Provider value={{authState,getAccessToken,setAuthState}}>{children}</ThemeContext.Provider>
    );
}

export { ThemeContext,AuthProvider};