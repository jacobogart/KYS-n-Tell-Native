import * as mock from '../../mockData';
import { fetchLocations } from '../fetchLocations';

describe('fetchLocations', () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => mock.locationsResult
  }));

  it('should call fetch with the correct params', () => {
    fetchLocations(mock.origin, 10)
    expect(fetch).toHaveBeenCalledWith(mock.fetchLocationsURL)
  });

  it('should call fetch with the correct params if there is no distance', () => {
    fetchLocations(mock.origin)
    expect(fetch).toHaveBeenCalledWith(mock.fetchLocationsURLWODistance)
  });

  it('should return an array of locations', async () => {
    const result = await fetchLocations(mock.origin, 10);
    expect(result).toEqual(mock.cleanLocations);
  });

  it('should throw an error if fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
    }));

    try {
      await fetchLocations(mock.origin, 10)
    } catch (error) {
      expect(error.message).toEqual("Failed to find locations")
    }
  });
});
