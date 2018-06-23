import actionTypes from '../constants/actionTypes';

function userLoggedIn(username, usertype){
    return {
        type: actionTypes.USER_REGISTERED,
        username: username,
        usertype: usertype

    }
}

function userRegistered(username,usertype){
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username,
        usertype: usertype
    }
}

function logout(){
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export function getRegsterResponseMessage(getRegisterResponseMsg){
    return {
        type: actionTypes.GET_REGISTER_RESPONSE_MESSAGE,
        getRegisterResponseMsg : getRegisterResponseMsg
    }
}

export function submitLogin(data){
    return dispatch => {
        return fetch(`/user/${data.username}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (data) => {
                localStorage.setItem('username', data.data.username);
                localStorage.setItem('token', data.data.tokenID);
                console.log("submitLogin().usertype : " + data.data.usertype);
                localStorage.setItem('usertype', data.data.usertype);

                dispatch(userLoggedIn(data.data.username, data.data.usertype));
            })
            .catch( (e) => console.log(e) );
    }
}

export function submitRegister(data){
    return dispatch => {
        return fetch('/user/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    dispatch(getRegsterResponseMessage('error'));
                    throw Error(response.statusText);
                }
                console.log("Successfully Registered");

                dispatch(getRegsterResponseMessage('success'));

                return response.json();
            })
            .then( (data) => {

                // localStorage.setItem('username', data.data.username);
                // localStorage.setItem('token', data.data.tokenID);
                //
                // dispatch(userLoggedIn(data.data.username));

            })
            .catch( (e) => console.log(e) );
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('usertype');
        dispatch(logout());
    }
}