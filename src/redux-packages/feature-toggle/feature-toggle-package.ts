
import { ReduxPackage, IAppState, IPayloadAction } from 'redux-package';
import { featureToggleReducer } from "./feature-toggle-reducer";
import { FeatureToggleActions } from './feature-toggle-actions';
import { IToggleRecord } from './feature-toggle-types';
export const FEATURE_TOGGLE_PACKAGE_NAME = 'commonAppFeatureToggle'

export class FeatureTogglePackage extends ReduxPackage<IAppState, IPayloadAction>  {
  reducers=[{name:FEATURE_TOGGLE_PACKAGE_NAME, reducer:featureToggleReducer}];
  action = FeatureToggleActions;
  constructor() {
    super();
  }
}