import * as mock from '../../mockData';
import { setDetails } from '../../actions/index'
import { detailsReducer } from '../detailsReducer';

describe('detailsReducer', () => {
  it('should return state as default', () => {
    const result = detailsReducer(undefined, {});
    expect(result).toEqual({});
  });

  it('should return an array of details', () => {
    const action = setDetails(mock.details);
    const result = detailsReducer(undefined, action);
    expect(result).toEqual(mock.details);
  });
});