import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-cec69-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;