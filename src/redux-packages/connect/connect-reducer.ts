
import { IPayloadAction } from 'redux-package';
import { ConnectActions } from './connect-actions';
import { IConnectState } from './connect-types'
import { IConnectActionPayload, INITIAL_STATE_CONNECT} from './connect-types-private'
import { LoginActions} from '../login/login-actions';
import { ConnectActionsStrings } from './connect-actions-strings';

export function connectReducer(
  state: IConnectState = INITIAL_STATE_CONNECT,
  action: IPayloadAction): IConnectState {

  let payload:IConnectActionPayload = action.payload;
  switch (action.type) {
    case ConnectActionsStrings.CONNECT_START:
      return {...state, connecting: true};
    case ConnectActions.CONNECT_SUCCESS:
      return {...state,
        connecting: false,
        connected: true,
        serverURL: action.payload.serverURL,
        retryCount: 0
      };
    case ConnectActionsStrings.CONNECT_ATTEMPT:
      return {...state, retryCount: state.retryCount + 1, serverURL: payload.serverURL};
    case ConnectActions.CONNECT_FAIL:
      return {...state, connected: false};
    case ConnectActionsStrings.CONNECT_SET_SERVER:
      return {...state, connected: false};
    case LoginActions.LOGGED_IN:
      return {...state, connected: true};
    default:
      return state;
  }
}

