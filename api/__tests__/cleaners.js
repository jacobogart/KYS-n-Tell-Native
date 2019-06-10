import { locationCleaner } from "../cleaners";
import * as mock from "../../mockData";

describe('cleaners', () => {
  describe('locationCleaner', () => {
    it('should return a clean movie', () => {
      const result = locationCleaner(mock.locations[0]);
      expect(result).toEqual(mock.cleanLocation)
    })
  });
});