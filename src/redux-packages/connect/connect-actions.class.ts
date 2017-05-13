import { IPayloadAction, ReduxPackageCombiner} from 'redux-package';

export class ConnectActions {
  private static prefix = 'CA_CONNECT_';
  static CONNECT_START = ConnectActions.prefix + 'START';       // Start connection sequence
  static CONNECT_ATTEMPT = ConnectActions.prefix + 'ATTEMPT';   // An inidivual connection attempt
  static CONNECT_SUCCESS = ConnectActions.prefix + 'SUCCESS';
  static CONNECT_FAIL = ConnectActions.prefix + 'FAIL';
  static CONNECT_SET_SERVER = ConnectActions.prefix + 'SET_SERVER';

  static checkConnection():void {
    ReduxPackageCombiner.dispatch({ type: ConnectActions.CONNECT_START});
  }
  static attemptFactory(serverURL:string):IPayloadAction {
    return {type: ConnectActions.CONNECT_ATTEMPT, payload: {serverURL: serverURL}};
  }
  static successFactory(serverURL:string):IPayloadAction {
    return {type: ConnectActions.CONNECT_SUCCESS, payload: {serverURL: serverURL}};
  }
  static setServerURL(serverURL:string):void {
    ReduxPackageCombiner.dispatch({ type: ConnectActions.CONNECT_SET_SERVER, payload: {serverURL: serverURL}});
  }

}