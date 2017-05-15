import { IPayloadAction } from 'redux-package';
import { ConnectActions } from './connect-actions';
import { ConnectActionsStrings } from './connect-actions-strings';

export class ConnectActionsPrivate extends ConnectActions {

  static attemptFactory(serverURL:string):IPayloadAction {
    return {type: ConnectActionsStrings.CONNECT_ATTEMPT, payload: {serverURL: serverURL}};
  }
  static successFactory(serverURL:string):IPayloadAction {
    return {type: ConnectActionsStrings.CONNECT_SUCCESS, payload: {serverURL: serverURL}};
  }
}