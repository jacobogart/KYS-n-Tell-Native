import * as mock from '../../mockData';
import { setUserLocation } from '../../actions/index'
import { userReducer } from '../userReducer';

describe('userReducer', () => {
  it('should return state as default', () => {
    const result = userReducer(undefined, {});
    expect(result).toEqual({});
  });

  it('should return an array of user', () => {
    const action = setUserLocation(mock.location);
    const result = userReducer(undefined, action);
    expect(result).toEqual({ location: mock.location});
  });
});