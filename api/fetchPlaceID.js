import { googleRoot, googleKey } from "./utilities";

export const fetchPlaceID = (title, point) => {
  const query = title.split(' ').join('%20');
  const url = `${googleRoot}place/findplacefromtext/json?inputtype=textquery&input=${query}&locationbias=point:${point.lat},${point.lng}&key=${googleKey}`
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error('Failed to find place ID')
      } else {
        return response.json()
      }
    })
    .then(result => result.candidates[0].place_id)
}