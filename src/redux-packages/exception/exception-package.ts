import { ReduxPackage, IAppState, IPayloadAction} from 'redux-package';
import { exceptionReducer } from "./exception-reducer";
import { IExceptionState } from './exception-types';

export class ExceptionPackage extends ReduxPackage<IAppState, IPayloadAction>  {
  reducers=[{ name: 'commonAppException', reducer:exceptionReducer }];
  actions = null;
  constructor() {
    super();
  }
}
