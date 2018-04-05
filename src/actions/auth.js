import { toastr } from 'react-redux-toastr';

import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP } from '../types';
import api from '../api';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const userSignedUp = () => ({
  type: USER_SIGNED_UP
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.user = JSON.stringify(user);
    dispatch(userLoggedIn(user));
    toastr.success('Login Successful', `Welcome back ${user.first_name}`);
  });

export const logout = () => dispatch => {
  localStorage.removeItem('user');
  dispatch(userLoggedOut());
  toastr.success('Logout Successful');
  window.location.reload();
};

export const signUp = data => dispatch =>
  api.user.signUp(data).then(response => {
    dispatch(userSignedUp(response));
    toastr.success('Account Created Successfully');
  });
