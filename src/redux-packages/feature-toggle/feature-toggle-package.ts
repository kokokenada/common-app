
import { ReduxPackage, IAppState, IPayloadAction } from 'redux-package';
import { featureToggleReducer } from "./feature-toggle-reducer";
import { FeatureToggleActions } from './feature-toggle-actions';
import { IToggleRecord } from './feature-toggle-types';

export class FeatureTogglePackage extends ReduxPackage<IAppState, IPayloadAction>  {
  reducers=[{name:'featureToggleReducer', reducer:featureToggleReducer}];
  action = FeatureToggleActions;
  constructor() {
    super();
  }
}