export const locationCleaner = (location) => {
  const { title, link, id, streetAddress, locality, region, postalCode, telephone, point} = location;
  const shortId = id.split('=')[1];
  const address = `${streetAddress};${locality}, ${region} ${postalCode}`;
  const formatedPoint = {
    lat: point.lat,
    lng: point.long
  }
  
  return {
    title,
    id: shortId,
    address,
    telephone,
    point: formatedPoint
  }
};

export const detailsCleaner = (result) => {
  const website = result.result.website;
  const hours = result.result.opening_hours.weekday_text;
  const photoRef = result.result.photos[0].photo_reference;
  return {
    website,
    hours,
    photoRef
  }
}