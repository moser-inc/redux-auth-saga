const required_opts = {
  'loginActionType': 'Login action type is required',
  'logoutActionType': 'Logout action type is required',
  'onLoginAction': 'Action to use on login is required',
  'onLoginFailedAction': 'Action to use on login failed is required',
  'onLogoutAction': 'Action to use on logout is required',
  'endpoint': 'Auth endpoint is required'
}

const validateOpts = opts => {
  for(let o in required_opts){
    if(!opts[o]){
      throw TypeError(`Option ${o}: - ${required_opts[o]}`)
    }
  }

  return true
}

export default validateOpts
