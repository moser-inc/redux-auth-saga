import axios from 'axios'

export const authenticate = (endpoint, body) => {
    return axios.post(endpoint, body, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.data);
};
