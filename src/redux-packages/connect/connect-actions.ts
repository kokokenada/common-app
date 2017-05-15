import { ReduxPackageCombiner} from 'redux-package';
import { ConnectActionsStrings } from './connect-actions-strings';

export class ConnectActions {
  protected static prefix = 'CA_CONNECT_';
  static CONNECT_SUCCESS = ConnectActionsStrings.CONNECT_SUCCESS;
  static CONNECT_FAIL = ConnectActionsStrings.CONNECT_FAIL;

  static checkConnection():void {
    ReduxPackageCombiner.dispatch({ type: ConnectActionsStrings.CONNECT_START});
  }

  static setServerURL(serverURL:string):void {
    ReduxPackageCombiner.dispatch({ type: ConnectActionsStrings.CONNECT_SET_SERVER, payload: {serverURL: serverURL}});
  }

}