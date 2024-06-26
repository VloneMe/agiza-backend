import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'

export const userDataHook = () => {
    const [userData, setUserData] = useState(null);

    const getUserInfos = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('No token found');
                return;
            }
            const decodedToken = jwtDecode(token);
            setUserData(decodedToken);
        } catch (error) {
            console.error('Error verifying token:', error);
        }
    };

    useEffect(() => {
        getUserInfos();
    }, []);

    return { userData, setUserData};
}