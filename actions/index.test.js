import * as mock from '../mockData';
import * as actions from './index';

describe('Action Creators', () => {
  it('should return a SET_LOCATIONS action', () => {
    const result = actions.setLocations(mock.locations);
    const expected = {
      type: 'SET_LOCATIONS',
      locations: mock.locations
    };
    expect(result).toEqual(expected);
  });

  it('should return a SET_USER_LOCATION action', () => {
    const result = actions.setUserLocation(mock.origin);
    const expected = {
      type: 'SET_USER_LOCATION',
      location: mock.origin
    };
    expect(result).toEqual(expected);
  });

  it('should return a SET_CONTACTS action', () => {
    const result = actions.setContacts(mock.contacts);
    const expected = {
      type: 'SET_CONTACTS',
      contacts: mock.contacts
    };
    expect(result).toEqual(expected);
  });

  it('should return a SET_DETAILS action', () => {
    const result = actions.setDetails(mock.details);
    const expected = {
      type: 'SET_DETAILS',
      details: mock.details
    };
    expect(result).toEqual(expected);
  });
});