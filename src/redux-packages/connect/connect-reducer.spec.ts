import { connectReducer } from './connect-reducer';
import { INITIAL_STATE_CONNECT, IConnectActionPayload }  from './connect-types-private';
import { ConnectActionsStrings } from './connect-actions-strings';

describe('connect reducer', () => {
  it('should return the initial state', () => {
    expect(
      connectReducer(undefined, {type: 'x'})
    ).toEqual(
      INITIAL_STATE_CONNECT
    )
  });

  it('should set connection with URL and be connected', () => {
    let payload: IConnectActionPayload = {serverURL: 'http://test'};
    expect(
      connectReducer(null, {
        type: ConnectActionsStrings.CONNECT_SUCCESS,
        payload
      })
    ).toEqual(
      {...INITIAL_STATE_CONNECT, serverURL: 'http://test', connected: true}
    );

  })
})

