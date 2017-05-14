
import { ReduxPackage, IAppState, IPayloadAction } from 'redux-package';
import { loginReducer } from "./login-reducer";
import { LoginAsync } from "./login-async.class";
import { LoginActions } from "./login-actions";
import { ILoginState } from './index';
import {ILoginService} from './login-service-interface';
export const LOGIN_PACKAGE_NAME = 'commonAppLoginStatus';

export class LoginPackage extends ReduxPackage<IAppState, IPayloadAction>  {
  reducers=[{name:LOGIN_PACKAGE_NAME, reducer:loginReducer}];
  action = LoginActions;
  constructor(private loginService: ILoginService) {
    super();
    const loginAsync = new LoginAsync(loginService);
    this.epics.push(
      loginAsync.login,
      loginAsync.register,
      loginAsync.tempUser,
      loginAsync.logout,
      loginAsync.watchForAutoLogin,
      loginAsync.watchCurrentUser,
      loginAsync.saveUser
    );
  }
  initialize() {
    LoginActions.watchForAutoLogin(); // for auto login
    LoginActions.watchCurrentUser(); // changes to current user
    LoginActions.setDefaultAvatar(this.loginService.defaultAvatarUrl());
  }
}