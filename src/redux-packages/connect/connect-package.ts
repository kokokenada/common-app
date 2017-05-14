import { ReduxPackage, IAppState, IPayloadAction} from 'redux-package';
import { connectReducer } from "./connect-reducer";
import { ConnectAsync } from "./connect-async.class";
import { ConnectActions } from "./connect-actions.class";
import { IConnectService } from './connect-service-interface';
import { IConnectState } from './connect-types';
export const CONNECT_PACKAGE_NAME = 'commonAppConnection';

export class ConnectPackage extends ReduxPackage<IAppState, IPayloadAction>  {
  reducers=[{name: CONNECT_PACKAGE_NAME, reducer:connectReducer}];
  actions = ConnectActions;
  constructor(connectService:IConnectService) {
    super();
    const connectAsync = new ConnectAsync(connectService);
    this.epics.push(
      connectAsync.attempt,
      connectAsync.connect,
      connectAsync.setNewServer
    );
  }
}
