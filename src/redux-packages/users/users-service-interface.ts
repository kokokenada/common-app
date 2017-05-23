
import {IDocumentChange, IUser} from '../../index';
import {Observable} from 'rxjs/Observable';

export interface IUsersService {
  createUsersObserver():Observable<IDocumentChange<IUser>>;
}

export let webpack_sticky_us2;