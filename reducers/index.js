import { combineReducers } from 'redux';
import { locationsReducer } from './locationsReducer';
import { userReducer } from './userReducer';
import { contactsReducer } from './contactsReducer';
import { detailsReducer } from './detailsReducer';

export const rootReducer = combineReducers({
  locations: locationsReducer,
  user: userReducer,
  contacts: contactsReducer,
  details: detailsReducer
  }
);