import { Injectable } from '../../dependency-injection/injectable-wrapper';
import { Observable } from 'rxjs/Observable';
import { Store } from "redux";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import { IPayloadAction, IAppState } from 'redux-package';

import {User} from '../../api';

import {IDocumentChange} from "../../api";
import {LoginActions} from "./login-actions.class";
import {LoginService} from "./login.service";
import {ILoginState} from "./login.types"
import {IAppStateCommonApp} from '../index';

@Injectable()
export class LoginAsync {
  login = (action$: Observable<IPayloadAction>) => {
    return action$
      .filter(({type}) => type === LoginActions.LOGIN_REQUEST)
      .flatMap(({payload}) => {
        return Observable
          .fromPromise(
            LoginService.login(payload.credentials)
          )
          .do((payloadAction: IPayloadAction) => {
            LoginActions.watchUser();
            LoginService.watchCurrentUser();
          })
          .catch(error => Observable.of(error));
      });
  };

  register = (action$: Observable<IPayloadAction>) => {
    return action$
      .filter(({type}) => type === LoginActions.REGISTRATION_REQUEST)
      .flatMap(({payload}) => {
        return Observable
          .fromPromise(
            LoginService.register(payload.credentials)
          )
          .do((payloadAction: IPayloadAction) => {
            LoginActions.watchUser();
            LoginService.watchCurrentUser();
          })
          .catch(error => Observable.of(error));
      });
  };


  tempUser = (action$: Observable<IPayloadAction>) => {
    return action$
      .filter(({type}) => type === LoginActions.TEMP_USER_REQUEST)
      .flatMap(({payload}) => {
        return Observable
          .fromPromise(
            LoginService.createTempUser()
          )
          .do((payloadAction: IPayloadAction) => {
            LoginActions.watchUser();
            LoginService.watchCurrentUser();
          })
          .catch(error => Observable.of(error));
      });
  };


  logout = (action$: Observable<IPayloadAction>) => {
    return action$.filter(({type}) => type === LoginActions.LOGOUT_REQUEST)
      .flatMap(({payload}) => {
        return Observable.fromPromise(
          LoginService.logOut()
        )
          .catch(error => Observable.of(error));
      });
  };

  saveUser = (action$: Observable<IPayloadAction>) => {
    return action$.filter(({type}) => type === LoginActions.SAVE_USER_REQUEST)
      .flatMap(({payload}) => {
        return Observable.fromPromise(
          LoginService.saveUser(payload.user)
        )
          .catch(error => Observable.of(error));

      });
  };

  /**
   * Start watching the currently logged in user
   * @param action$
   * @param store
   * @returns {Observable<IPayloadAction>}
   */
  watchUser = (action$: Observable<IPayloadAction>, store: Store<IAppStateCommonApp>): Observable<IPayloadAction> => {
    return action$.filter(({type}) => type === LoginActions.WATCH_USER)
      .flatMap(({payload}) => {
        return Observable.fromPromise( LoginService.watchCurrentUser() )
          .flatMap(
            ()=>{
              return LoginService
                .createUserObserver(LoginService.userId()).map((change: IDocumentChange<User>)=> {
                  let loginState: ILoginState = store.getState().loginReducer;
                  if (loginState && loginState.neverLoggedIn) {
                    // Never logged in, yet the current user is populated, must be automatic login
                    return LoginActions.loginSuccessFactory(change.newDocument, change.newDocument._id, true);
                  } else {
                    return LoginActions.changeFactory(change);
                  }
                })
            }
          )
          .catch(error => Observable.of(error));
      });
  };
}
