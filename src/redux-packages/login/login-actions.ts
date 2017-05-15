import { IActionError, IPayloadAction, ReduxPackageCombiner } from 'redux-package';
import { Credentials } from "../../api/services/credentials";
import { IUser } from './login-types';
import { LoginActionsStrings } from './login-actions-strings';

export class LoginActions {
  static LOGGED_IN = LoginActionsStrings.LOGGED_IN;
  static LOGIN_ERROR = LoginActionsStrings.LOGIN_ERROR;
  static LOGGED_OUT = LoginActionsStrings.LOGGED_OUT;
  static CURRENT_USER_UPDATED = LoginActionsStrings.CURRENT_USER_UPDATED;

  static login(credentials:Credentials):void {
    ReduxPackageCombiner.dispatch({ type: LoginActionsStrings.LOGIN_REQUEST, payload: {credentials: credentials}});
  }

  static logout():void {
    ReduxPackageCombiner.dispatch({ type: LoginActionsStrings.LOGOUT_REQUEST});
  }

  static register(credentials:Credentials):void {
    ReduxPackageCombiner.dispatch({ type: LoginActionsStrings.REGISTRATION_REQUEST, payload: {credentials: credentials}});
  }

  static loginAsTemporaryUser():void {
    ReduxPackageCombiner.dispatch({ type: LoginActionsStrings.TEMP_USER_REQUEST});
  }

  static saveUser(user:IUser): void {
    ReduxPackageCombiner.dispatch({type: LoginActionsStrings.SAVE_USER_REQUEST, payload: {user: user}});
  }

  static currentUserChangeFactory(user:IUser): IPayloadAction {
    return {type: LoginActions.CURRENT_USER_UPDATED, payload: {user: user}};
  }

  static saveUserResponseFactory(user:IUser): IPayloadAction {
    return {type: LoginActionsStrings.SAVE_USER_RESPONSE, payload: {user: user}};
  }

  static loginSuccessFactory(user:IUser, userId:string, autoLogin:boolean=false): IPayloadAction {
    return {type: LoginActions.LOGGED_IN, payload: {user: user, userId:userId, autoLogin:autoLogin}};
  }

  static loggedOutFactory(): IPayloadAction {
    return {type: LoginActions.LOGGED_OUT};
  }

  static errorNotification(error: IActionError ) {
    ReduxPackageCombiner.dispatch({type: LoginActions.LOGIN_ERROR, error});
  }

  static setDefaultAvatar(url: string) {
    ReduxPackageCombiner.dispatch({type: LoginActionsStrings.SET_DEFAULT_AVATAR, payload: {defaultAvatar: url}});
  }

}