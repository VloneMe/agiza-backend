import { showMessage } from 'react-native-flash-message';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';


export const getCurrentLocation = () => 
    new Promise(async (resolve, reject) => {
        Geolocation.getCurrentPosition(
            position => {
                const cords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                resolve(cords);
            },
            error => {
                reject(error.message);
            
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        )
    });

const locationPermission = () => new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
        try {
            const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
            if (permissionStatus === 'granted') {
                return resolve("granted");
            } reject("denied");
        } catch (error) {
            return reject(error);
        }
    }
    return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return resolve("granted");
        }
        return reject("denied");
    }).catch((error) => {
        console.log("Ask Location Permission Error: ", error);
    }
    )
})


const showError = (message) => {
    showMessage({
        message: 'Error',
        description: message,
        type: 'danger',
        icon: 'danger',
    });
};

const showSuccess = (message) => {
    showMessage({
        message: 'Success',
        description: message,
        type: 'success',
        icon: 'success',
    });
};

export { showError, showSuccess };