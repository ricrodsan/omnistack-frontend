import axios from 'axios'

const api = axios.create({
    baseURL:'https://backendo.herokuapp.com'
});


export default api;