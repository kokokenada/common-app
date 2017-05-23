
import { ReduxPackage, IAppState, IPayloadAction, ReduxPackageCombiner } from 'redux-package';
import { loginReducer } from "./login-reducer";
import { LoginAsync } from "./login-async.class";
import { LoginActions } from "./login-actions";
import { ILoginState } from './index';
import { ILoginService } from './login-service-interface';
import { LoginActionsPrivate } from './login-actions-private';
export const LOGIN_PACKAGE_NAME = 'commonAppLoginStatus';

export class LoginPackage extends ReduxPackage<IAppState, IPayloadAction>  {
  static lastLoginState: ILoginState;
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
    LoginActionsPrivate.watchForAutoLogin(); // for auto login
    LoginActionsPrivate.watchCurrentUser(); // changes to current user
    LoginActionsPrivate.setDefaultAvatar(this.loginService.defaultAvatarUrl());
    ReduxPackageCombiner.select(LOGIN_PACKAGE_NAME).subscribe( (newState: ILoginState) => {
//      console.log('LoginState.lastLoginState subscription')
//      console.log(newState)
      LoginPackage.lastLoginState = newState;
    });
  }
}