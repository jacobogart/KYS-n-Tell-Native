import { fetchDistance } from "../fetchDistance";
import * as mock from '../../mockData';

describe('fetchDistance', () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => mock.distanceResult 
  }));

  it('should call fetch with the correct params', () => {
    fetchDistance(mock.origin, mock.destination)
    expect(fetch).toHaveBeenCalledWith(mock.fetchDistanceURL)
  });

  it('should return a distance string', async () => {
    const result = await fetchDistance(mock.origin, mock.destination);
    expect(result).toEqual(mock.distance)
  });

  it('should throw an error if fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
    }));

    try {
      await fetchDistance(mock.origin, mock.destination)
    } catch(error) {
      expect(error.message).toEqual("Failed to find distance")
    }
  });
});