import {IPayloadAction} from 'redux-package';
import {LoginActions} from './login-actions';
import {ILoginState, ILoginActionPayload} from './index'
import {LoginFunctions} from './login-functions';

export const LOGIN_INITIAL_STATE: ILoginState = {
  neverLoggedIn: true,
  loggedIn: false,
  loggingIn: false,
  userId: null,
  displayName: null,
  user: null,
  errorMessage: ''
};

export function loginReducer(state: ILoginState = LOGIN_INITIAL_STATE,
                             action: IPayloadAction): ILoginState {
  let payload: ILoginActionPayload = action.payload;
  switch (action.type) {
    case LoginActions.LOGIN_REQUEST:
      return Object.assign({}, state, {loggingIn: true});
    case LoginActions.LOGGED_IN:
      return {
        neverLoggedIn: false,
        loggingIn: false,
        loggedIn: true,
        userId: action.payload.user ? action.payload.user._id : (action.payload.userId ? action.payload.userId : state.userId),
        displayName: LoginFunctions.getDisplayName(action.payload.user),  // OK because it's synchronous
        user: action.payload.user,
        errorMessage: '',
        autoLogin: payload.autoLogin,
        defaultAvatar: state.defaultAvatar
      };
    case LoginActions.LOGGED_OUT:
      return Object.assign({}, state, {
        loggedIn: false,
        loggingIn: false,
        userId: null,
        displayName: null,
        user: null,
        errorMessage: '',
        defaultAvatar: state.defaultAvatar
      });
    case LoginActions.LOGIN_ERROR:
      return Object.assign({}, state,
        {
          loggingIn: false,
          loggedIn: false,
          userId: '',
          displayName: '',
          user: null,
          errorMessage: action.error.message,
          defaultAvatar: state.defaultAvatar
        }
      );
    case LoginActions.SAVE_USER_RESPONSE:
    case LoginActions.CURRENT_USER_UPDATED:
      return Object.assign({},
        state,
        {
          user: payload.user,
          defaultAvatar: state.defaultAvatar
        });
    case LoginActions.SET_DEFAULT_AVATAR:
      return {...state, defaultAvatar: payload.defaultAvatar};
    default:
      return state;
  }
}

