const storageTypes = {
    'localStorage': 'localStorage',
    'sessionStorage': 'sessionStorage'
};

const getStorage = type => {
    if(!type || storageTypes[type]){
        type = 'sessionStorage';
    }

    return window[type];
}

export const setToken = (type, token) => getStorage(type).setItem('token', token);
export const getToken = (type, token) => getStorage(type).getItem('token', token);
export const clearToken = type => getStorage(type).removeItem('token');
