const storageTypes = {
  'localStorage': 'localStorage',
  'sessionStorage': 'sessionStorage'
}

export const getStorage = type => {
  if(!type && !storageTypes[type]){
    type = 'sessionStorage'
  }

  return window[type]
}

export const setToken = (type, token) => getStorage(type).setItem('token', JSON.stringify(token))

export const getToken = (type) => {
  const t = getStorage(type).getItem('token')

  if(t) return JSON.parse(t)

  return null
}

export const clearToken = type => getStorage(type).removeItem('token')
