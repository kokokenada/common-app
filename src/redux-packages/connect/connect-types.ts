
export interface IConnectState {
  retryCount: number;
  connected: boolean;
  connecting: boolean;
  serverURL: string;
}

export let webPackSticky6=''; // Otherwise this file does not get included in dist by webpack