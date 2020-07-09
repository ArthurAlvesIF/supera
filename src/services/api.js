import axios from 'axios';
const instance =  () => axios.create({
    baseURL: 'http://192.168.0.108/supera_estudos/supera_estudos/'
});
export default instance;