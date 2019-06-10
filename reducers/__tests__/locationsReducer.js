import * as mock from '../../mockData';
import { setLocations } from '../../actions/index'
import { locationsReducer } from '../locationsReducer';

describe('locationsReducer', () => {
  it('should return state as default', () => {
    const result = locationsReducer(undefined, {});
    expect(result).toEqual([]);
  });

  it('should return an array of locations', () => {
    const action = setLocations(mock.locations);
    const result = locationsReducer(undefined, action);
    expect(result).toEqual(mock.locations);
  });
});