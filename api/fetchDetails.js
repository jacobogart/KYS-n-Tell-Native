import { googleRoot, googleKey } from "./utilities";
import { detailsCleaner } from "./cleaners";

export const fetchDetails = (id) => {
  const url = `${googleRoot}place/details/json?placeid=${id}&fields=photo,website,opening_hours&key=${googleKey}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to find details')
      } else {
        return response.json()
      }
    })
    .then(result => detailsCleaner(result))
}