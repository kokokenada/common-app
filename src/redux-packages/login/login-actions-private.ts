
import { ReduxPackageCombiner } from 'redux-package';
import { LoginActions } from './login-actions';
import { LoginActionsStrings } from './login-actions-strings';

export class LoginActionsPrivate extends LoginActions {

  static watchForAutoLogin() : void {
    ReduxPackageCombiner.dispatch({type: LoginActionsStrings.WATCH_USER_AUTO_LOGIN});
  }

  static watchCurrentUser() : void {
    ReduxPackageCombiner.dispatch({type: LoginActionsStrings.WATCH_CURRENT_USER});
  }
}