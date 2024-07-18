import React,{createContext,useContext} from 'react';
import axios from 'axios';
import {ThemeContext} from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh'; 
import * as Keychain from 'react-native-keychain';

export type UrlAxios = {
   authAxios : any,
}

const AxiosContext = createContext<UrlAxios>({
    authAxios: ''
});

const {Provider} = AxiosContext;

const AxiosProvider:React.FC<{children:React.ReactNode}> = ({children}) =>{
    const authContext = useContext(ThemeContext);

    const authAxios = axios.create({
        baseURL: 'http://localhost:3333'
    });

    authAxios.interceptors.request.use(
        config => {
            if (!config.headers.Authorization){
                config.headers.Authorization = `Bearer ${authContext?.getAccessToken()}`
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        },
    );


    const refreshAuthLogic = (failedRequest:any ) => {
        const data = {
            refreshToken: authContext?.authState.refreshToken,
        };

        const options = {
            method: 'POST',
            data,
            url: 'http://localhost:3333/token',
        };

        return axios(options)
          .then(async tokenRefreshResponse => {
            failedRequest.response.config.headers.Authorization = 'Bearer' + tokenRefreshResponse.data.accessToken;

            authContext?.setAuthState({
                ...authContext.authState,
                accessToken: tokenRefreshResponse.data.accessToken,
            });

            await Keychain.setGenericPassword(
                'token',
                JSON.stringify({
                    accessToken: tokenRefreshResponse.data.accessToken,
                    refreshToken: authContext?.authState.refreshToken,
                }),
            );
            return Promise.resolve();
        })
        .catch(e => {
            authContext?.setAuthState({
                authenticated: false,
                accessToken: null,
                refreshToken: null,
            });
        });


    };

    createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <Provider value={{authAxios}}>
      {children}
    </Provider>
  );
}
export {AxiosContext , AxiosProvider};
