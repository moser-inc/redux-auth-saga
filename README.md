### redux-auth-saga <img src="https://travis-ci.org/moser-inc/redux-auth-saga.svg" alt="build:">
---

Redux saga designed to handle a simple token-based authentication flow.  This package was inspired by [this thread](https://github.com/redux-saga/redux-saga/issues/14) by [Yassine Elouafi](https://github.com/yelouafi)

#### Installation

        $ npm install --save redux-auth-saga

#### Building

        $ npm run build

#### Example usage

Attaching `redux-auth-saga` to your root saga

```js
    import 'redux-auth-saga' from 'redux-auth-saga'

    const options = {
        storageType: 'sessionStorage',
        loginActionType: USER_LOGIN,
        logoutActionType: USER_LOGOUT,
        onLoginAction: userLoginSuccess,
        onLogoutAction: userLogout,
        endpoint: AUTH_URL,
        redirectToOnLogout: () => {}
    };

    export default function* rootSaga() {
        yield [
            fork(reduxAuthSaga, options),
            fork(anotherSaga),
            ...
        ];
    }
```


#### Available Options

| Name  | Type  | Required  |  Description |
|---|---|---|---|---|
| storageType  | String ('sessionStorage or localStorage') (default: 'sessionStorage')  | No  | What type of storage to use for token |
|  loginActionType | String  | Yes  | String constant to `take` for login dispatch  |
|  logoutActionType | String  | Yes  |  String constant to `take` for logout dispatch |
|  onLoginAction | Function  | Yes  |  Action to dispatch when login is successful |
|  onLogoutAction | Function  | Yes  |  Action to dispatch when logout is successful  |
|  endpoint | String  | Yes  |  Authentication endpoint |
|  redirectToOnLogout | Function  | Yes  |  Used to redirect to after logout |
