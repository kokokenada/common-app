import { Observable } from 'rxjs/Observable';
import { Store } from "redux";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { IAppState, IPayloadAction } from 'redux-package';

import {ILoginService} from './login-service-interface';
import {LoginActionsStrings} from './login-actions-strings';

export class LoginAsync {

  constructor(private loginService:ILoginService) {
  }

  login = (action$: Observable<IPayloadAction>) => {
    return action$
      .filter(({type}) => type === LoginActionsStrings.LOGIN_REQUEST)
      .flatMap(({payload}) => {
        return Observable
          .fromPromise(
            this.loginService.login(payload.credentials)
          )
          .catch(error => Observable.of(error));
      });
  };

  register = (action$: Observable<IPayloadAction>) => {
    return action$
      .filter(({type}) => type === LoginActionsStrings.REGISTRATION_REQUEST)
      .flatMap(({payload}) => {
        return Observable
          .fromPromise(
            this.loginService.register(payload.credentials)
          )
          .catch(error => Observable.of(error));
      });
  };


  tempUser = (action$: Observable<IPayloadAction>) => {
    return action$
      .filter(({type}) => type === LoginActionsStrings.TEMP_USER_REQUEST)
      .flatMap(({payload}) => {
        return Observable
          .fromPromise(
            this.loginService.createTempUser()
          )
          .catch(error => Observable.of(error));
      });
  };


  logout = (action$: Observable<IPayloadAction>) => {
    return action$.filter(({type}) => type === LoginActionsStrings.LOGOUT_REQUEST)
      .flatMap(({payload}) => {
        return Observable.fromPromise(
          this.loginService.logOut()
        )
          .catch(error => Observable.of(error));
      });
  };

  saveUser = (action$: Observable<IPayloadAction>) => {
    return action$.filter(({type}) => type === LoginActionsStrings.SAVE_USER_REQUEST)
      .flatMap(({payload}) => {
        return Observable.fromPromise(
          this.loginService.saveUser(payload.user)
        )
          .catch(error => Observable.of(error));

      });
  };

  /**
   * Start and emits login event if user is automatically logged in
   * @param action$
   * @param store
   * @returns {Observable<IPayloadAction>}
   */
  watchForAutoLogin = (action$: Observable<IPayloadAction>, store: Store<IAppState>): Observable<IPayloadAction> => {
    return action$.filter(({type}) => type === LoginActionsStrings.WATCH_USER_AUTO_LOGIN)
      .flatMap(({payload}) => {
        return this.loginService.watchForAutoLogin();
      });
  };

  /**
   * Start watching the currently logged in user and emits change event when it changes
   * @param action$
   * @param store
   * @returns {Observable<IPayloadAction>}
   */
  watchCurrentUser = (action$: Observable<IPayloadAction>, store: Store<IAppState>): Observable<IPayloadAction> => {
    return action$.filter(({type}) => type === LoginActionsStrings.WATCH_CURRENT_USER)
      .flatMap(({payload}) => {
        return this.loginService.watchCurrentUser();
      });
  };
}
