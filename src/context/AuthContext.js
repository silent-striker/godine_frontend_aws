import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

// it will hold all auth related data
const AuthContext = React.createContext({});

const USER = 'user';

export const AuthProvider = ({ children }) => {
    const [userState, setUserState] = useState(null);

    useEffect(() => {
        setUserState(JSON.parse(sessionStorage.getItem(USER)));
    }, []);

    // sets user state and cookie
    const setAuthData = (userData) => {
        const info = jwtDecode(userData.idToken);
        const userInfo = {
            firstName: info['custom:firstName'],
            lastName: info['custom:lastName'],
            phoneNumber: info['custom:phoneNumber'],
            email: info.email,
            userId: info.sub
        };
        const data = {
            accessToken: userData.accessToken,
            expiry: userData.expiry,
            userInfo: userInfo,
        }
        sessionStorage.setItem(USER, JSON.stringify(data));
        setUserState(data);
    }

    // clear user auth data when users logs out or validity expires
    const clearAuthData = () => {
        setUserState(null);
        sessionStorage.removeItem(USER);
    }

    // fetch current auth data of the user
    const getAuthData = () => {
        if (!userState) {
            return JSON.parse(sessionStorage.getItem(USER));
        }
        return userState;
    }

    // user id for fetching data of the user
    const getUserId = () => {
        return userState?.userInfo?.userId || getAuthData()?.userInfo?.userId;
    }

    // checking session validity
    const isSessionValid = () => {
        const currentState = JSON.parse(sessionStorage.getItem(USER));
        const userId = currentState ? currentState.userInfo?.userId : userState?.userInfo?.userId;
        const accessToken = currentState ? currentState.accessToken : userState?.accessToken;
        const expiry = currentState ? currentState.expiry : userState?.expiry;

        return userId !== null && userId !== ''
            && accessToken !== null && accessToken !== ''
            && expiry !== null && expiry !== ''
            && Date.now() / 1000 <= expiry;
    }

    const authData = {
        getAuthData,
        setAuthData,
        clearAuthData,
        isSessionValid,
        getUserId
    }

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;