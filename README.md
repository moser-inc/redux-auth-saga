### redux-auth-saga
---

Redux saga designed to handle a simple token-based authentication flow

#### Installation

- Add the following entry to your `package.json` file `"redux-auth-saga": "git+ssh://git@bitbucket.org:KeenanJae/auth-saga.git"`

        $ npm install

#### Building

        $ npm run build

#### Example usage

- Attach `redux-auth-saga` to your root saga

```js
    import 'redux-auth-saga' from 'redux-auth-saga'

    const options = {
        storageType: 'sessionStorage',
        loginActionType: USER_LOGIN,
        logoutActionType: USER_LOGOUT,
        onLoginAction: userLoginSuccess,
        onLogoutAction: userLogout,
        endpoint: AUTH_URL,
        redirectTo: () => {},
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

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>storageType</td>
            <td>String ('sessionStorage| localStorage') (default: 'sessionStorage')</td>
            <td>No</td>
            <td>What type of storage to use for token</td>
        </tr>
        <tr>
            <td>loginActionType</td>
            <td>String</td>
            <td>Yes</td>
            <td>String constant to `take` for login dispatch</td>
        </tr>
        <tr>
            <td>logoutActionType</td>
            <td>String</td>
            <td>Yes</td>
            <td>String constant to `take` for logout dispatch</td>
        </tr>
        <tr>
            <td>onLoginAction</td>
            <td>Function</td>
            <td>Yes</td>
            <td>Action to dispatch when login is successful</td>
        </tr>
        <tr>
            <td>onLogoutAction</td>
            <td>Function</td>
            <td>Yes</td>
            <td>Action to dispatch when logout is successful</td>
        </tr>
        <tr>
            <td>endpoint</td>
            <td>String</td>
            <td>Yes</td>
            <td>Authentication endpoint</td>
        </tr>
        <tr>
            <td>redirectTo</td>
            <td>Function</td>
            <td>Yes</td>
            <td>Used to redirect back to unauthenticated page after successful login</td>
        </tr>
        <tr>
            <td>redirectToOnLogout</td>
            <td>Function</td>
            <td>Yes</td>
            <td>Used to redirect to after logout</td>
        </tr>
    </tbody>
</table>
