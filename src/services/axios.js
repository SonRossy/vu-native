import axios from 'axios'
import { AsyncStorage } from 'react-native'

const axiosInstance = axios.create({ //create a custom axios
    timeOut: 3000 //after 3 seconds request will fail
})

axiosInstance.interceptors.request.use(async function(config) { //use this to add config to our request
    const token = await AsyncStorage.getItem("meetuper-jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}` //adding token to our header
    }
    return config
}, function(err) {
    return Promise.reject(err)
})

export default axiosInstance