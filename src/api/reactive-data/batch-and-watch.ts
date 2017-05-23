import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

export interface BatchAndWatch<T> {
  batchObservable: Observable<T[]>;
  watchedObservable: Observable<T>;
}

/**
 * Create an observable that fires once with a batch of records and another observable that fires thereafter
 *
 * TODO: 1: Is it better to implement this as an operator? 2: Is there a combination of existing operators that does this better?
 *
 * @param observable
 * @param inactivityTreshold
 * @param maxBatchSize
 * @returns {{batchObservable: Observable<T>[], watchedObservable: Observable<T>}}
 */
export function batchAndWatch<T>(observable: Observable<T>, setTimeout:(func: Function, delay: number)=>number, inactivityTreshold: number = 30, maxBatchSize: number = 1000): BatchAndWatch<T> {
  let batch: T[] = [];
  let timeOfLastData: Date = new Date();
  let collecting = true;

  let batchObservable: Observable<T[]> = Observable.create((observer: Subscriber<T[]>) => {
    let finishBatch = () => {
      collecting = false;
      observer.next(batch);
      observer.complete();
    };
    let checkInactivityThreshold = () => {
      let delta: number = new Date().getTime() - timeOfLastData.getTime();
      if (delta > inactivityTreshold) {
        finishBatch();
      } else {
        setTimeout(checkInactivityThreshold, inactivityTreshold - delta);
      }
    };
    setTimeout(checkInactivityThreshold, inactivityTreshold);

    observable.subscribe((value: T) => {
        timeOfLastData = new Date();
        batch.push(value);
        if (batch.length === maxBatchSize) {
          finishBatch();
        }
      },
      (error) => {
        observer.error(error)
      },
      () => {
        observer.complete()
      }
    );

    return function unsubscribe() {
      collecting = false;
    };
  });
  let watchedObservable: Observable<T> = Observable.create((observer: Subscriber<T>) => {
    observable.subscribe((value: T) => {
        if (!collecting) {
          observer.next(value);
        }
      },
      (error) => {
        observer.error(error)
      },
      () => {
        observer.complete()
      }
    );

  });
  return {batchObservable: batchObservable, watchedObservable: watchedObservable};
}

