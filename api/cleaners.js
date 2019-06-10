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
    link,
    id: shortId,
    address,
    telephone,
    point: formatedPoint
  }
}