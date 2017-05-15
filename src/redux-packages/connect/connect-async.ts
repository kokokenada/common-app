import { IPayloadAction } from 'redux-package';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/forkJoin';

import { IConnectService } from './connect-service-interface';
import { ConnectActionsPrivate } from './connect-actions-private';
import { ConnectActionsStrings } from './connect-actions-strings';

export class ConnectAsync {

  constructor(private connectService:IConnectService) {
  }

  connect = (action$: Observable<IPayloadAction>) => {
    return action$.filter(({ type }) => type === ConnectActionsStrings.CONNECT_START)
      .flatMap( (action: IPayloadAction) => {
        const serverURL = this.connectService.getServerURL();
        const combined = Observable.forkJoin(
          Observable.of(action),
          Observable.fromPromise(this.connectService.isConnected())
        );
        return combined.map( (array) => {
          if (array[1]) {
            // We're connected
            return ConnectActionsPrivate.successFactory(serverURL);
          } else {
            return ConnectActionsPrivate.attemptFactory(serverURL);
          }
        } );
      } )
  };

  attempt= (action$: Observable<IPayloadAction>) => {
    return action$.filter(({ type }) => type === ConnectActionsStrings.CONNECT_ATTEMPT)
      .flatMap(({ payload }) => {
        const serverURL = this.connectService.getServerURL();
        const combined = Observable.forkJoin(
          Observable.of(payload),
          Observable.fromPromise(this.connectService.isConnected())
        );
        let delay = 5000;
        return combined.map( (array) => {
          if (array[1]) {
            // We're connected
            delay = 0;
            return ConnectActionsPrivate.successFactory(serverURL);
          } else {
            return ConnectActionsPrivate.attemptFactory(serverURL);
          }
        }).delay(delay);
      });
  };

  setNewServer= (action$: Observable<IPayloadAction>) => {
    return action$.filter(({ type }) => type === ConnectActionsStrings.CONNECT_SET_SERVER)
      .flatMap(({ payload }) => {
        this.connectService.disconnect();
        this.connectService.setServerTo(payload.serverURL);
        return Observable.from([ConnectActionsPrivate.attemptFactory(this.connectService.getServerURL())]);
      }
    );
  };
}
