import * as mock from '../../mockData';
import { fetchLatLong } from '../fetchLatLong';

describe('fetchLatLong', () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => mock.latLongResult
  }));

  it('should call fetch with the correct params', () => {
    fetchLatLong('64081');
    expect(fetch).toHaveBeenCalledWith(mock.fetchLatLongURL);
  });

  it('should return a lat/long object', async () => {
    const result = await fetchLatLong('64081');
    expect(result).toEqual(mock.origin);
  });

  it('should throw an error if fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
    }));

    try {
      await fetchLatLong(mock.origin, mock.destination)
    } catch (error) {
      expect(error.message).toEqual("Failed to find coordinates")
    }
  });
});