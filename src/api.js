import axios from 'axios'

export const authenticate = (endpoint, body) => {
    return axios.post(endpoint, body).then(res => res.data);    
};
