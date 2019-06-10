import * as mock from '../../mockData';
import { fetchSendMessage } from "../fetchSendMessage";

describe('fetchSendMessage', () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => ({ ok: true })
  }));

  it('should call fetch with the correct params', () => {
    fetchSendMessage(mock.contacts, mock.message)
    expect(fetch).toHaveBeenCalledWith('/api/messages', mock.sendMessageOptions)
  });

  it('should return an array of resolved messages', async () => {
    const result = await fetchSendMessage(mock.contacts, mock.message);
    expect(result).toEqual(mock.resolvedMessages);
  });

  it('should throw an error if fetch fails', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
    }));

    try {
      await fetchSendMessage(mock.contacts, mock.message)
    } catch (error) {
      expect(error.message).toEqual(mock.contact)
    }
  });
});
