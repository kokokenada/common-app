
export  interface IConnectService {
  isConnected():Promise<boolean>;
  getServerURL():string;
  setServerTo(app_url): void;
  reconnect(): void;
  disconnect(): void;
}
export let webpacksucks=''; // Otherwise this file does not get included in dist by webpack