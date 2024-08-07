/*import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import Toast from "react-native-toast-message";

interface Auth {
    token: string | null,
    code: string | null,
    status: string,
    error: string | null | undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: 0,
    reducers: {
        signIn: async(firstname:string ,num:string) => {
            try {
                const response = await axios.post('http://192.168.1.135:8080/server/login', {
                    firstname,
                    num,
                });
    
                const data = response.data;
    
                if (response.status === 200) {
                    const data = response.data;
    
                    if (data.status) {
                        Toast.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Login Successful',
                            text2: data.message,
                        });
                    } else {
                        Toast.show({
                            type: 'error',
                            position: 'top',
                            text1: 'Login Failed',
                            text2: data.message,
                        });
                    }
                } else {
                    throw new Error('Unexpected response status');
                }
            } catch (error) {
                console.error('Error during login:', error);
                return { success: false, message: 'An error occurred during login' };
            }
    }
    },
    
})
    
export const {signIn} = authSlice.actions
export default authSlice.reducer;*/