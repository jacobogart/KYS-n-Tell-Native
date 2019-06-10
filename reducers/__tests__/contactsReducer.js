import * as mock from '../../mockData';
import { setContacts } from '../../actions/index'
import { contactsReducer } from '../contactsReducer';

describe('contactsReducer', () => {
  it('should return state as default', () => {
    const result = contactsReducer(undefined, {});
    expect(result).toEqual([]);
  });

  it('should return an array of contacts', () => {
    const action = setContacts(mock.contacts);
    const result = contactsReducer(undefined, action);
    expect(result).toEqual(mock.contacts);
  });
});