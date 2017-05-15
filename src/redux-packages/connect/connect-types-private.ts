
export interface IConnectActionPayload {
  serverURL: string;
}

export const INITIAL_STATE_CONNECT = {
  connected: false,
  connecting: false,
  retryCount: 0,
  serverURL: ""
};


export let webPackSticky5=''; // Otherwise this file does not get included in dist by webpack