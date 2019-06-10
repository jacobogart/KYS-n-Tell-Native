import { url } from "./utilities";
import { locationCleaner } from "./cleaners";

export const fetchLocations = (location, distance) => {
  const { lat, lng } = location
  const fullUrl = `${url}lat=${lat}&long=${lng}`
  const distanceURL = distance 
    ? `&distance=${distance}` 
    : '';
  return fetch(`${fullUrl}${distanceURL}`)
    .then(response => {
      if(!response.ok) {
        throw Error('Failed to find locations')
      } else {
        return response.json();
      }
    })
    .then(results => {
      return results.services[0].providers.map(location => locationCleaner(location))
    })
}