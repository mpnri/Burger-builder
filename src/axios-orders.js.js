import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://burger-builder-e39cf-default-rtdb.asia-southeast1.firebasedatabase.app/'
    baseURL: 'https://simpleappliance.backendless.app/api/'
});

export default instance;