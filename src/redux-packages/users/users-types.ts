
import Immutable = require('immutable');
import { IUser, IDocumentChange } from '../../index';

export interface IUsersState {
  users:Immutable.Map<string, IUser>;
}

export interface IUsersActionPayload {
  users?:IUser[];
  documentChange?:IDocumentChange<IUser>;
}

export let webpack_sticky_us1

