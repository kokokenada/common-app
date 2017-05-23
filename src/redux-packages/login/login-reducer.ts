import {IPayloadAction} from 'redux-package';
import {ILoginState, ILoginActionPayload} from './index'
import {LoginFunctions} from './login-functions';
import {LoginActionsStrings} from './login-actions-strings';

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
    case LoginActionsStrings.LOGIN_REQUEST:
      return Object.assign({}, state, {loggingIn: true});
    case LoginActionsStrings.LOGGED_IN:
      return {
        neverLoggedIn: false,
        loggingIn: false,
        loggedIn: true,
        userId: action.payload.user ? action.payload.user._id : (action.payload.userId ? action.payload.userId : state.userId),
        displayName: LoginFunctions.getDisplayName(action.payload.user),  // OK because it's synchronous
        user: action.payload.user,
        errorMessage: '',
        autoLogin: payload.autoLogin
      };
    case LoginActionsStrings.LOGGED_OUT:
      return Object.assign({}, state, {
        loggedIn: false,
        loggingIn: false,
        userId: null,
        displayName: null,
        user: null,
        errorMessage: ''
      });
    case LoginActionsStrings.LOGIN_ERROR:
      return Object.assign({}, state,
        {
          loggingIn: false,
          loggedIn: false,
          userId: '',
          displayName: '',
          user: null,
          errorMessage: action.error.message,
        }
      );
    case LoginActionsStrings.SAVE_USER_RESPONSE:
    case LoginActionsStrings.CURRENT_USER_UPDATED:
      return Object.assign({},
        state,
        {
          user: payload.user
        });
    default:
      return state;
  }
}

