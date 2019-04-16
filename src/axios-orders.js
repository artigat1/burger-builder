import axios from 'axios';

const instance  = axios.create({
    baseUrl: 'https://burger-builder-79d23.firebaseio.com/'
});

export default instance;
