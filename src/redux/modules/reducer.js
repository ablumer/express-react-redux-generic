import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import programmes from './programmes';
import roombookings from './roombookings';
import pages from './pages';
import rates from './rates';
import ratesoptions from './ratesoptions';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  programmes,
  roombookings,
  pages,
  rates,
  ratesoptions,
});
