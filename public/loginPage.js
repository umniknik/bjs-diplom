"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = data => {
    const cb = (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    };
    ApiConnector.login(data, cb)
};

userForm.registerFormCallback = data => {
    const cb = (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    }
    ApiConnector.register(data, cb);
}