import phone from 'phone';

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
  const photoRef = result.result.photos
    ? result.result.photos[0].photo_reference 
    : null;
  return {
    website,
    hours,
    photoRef
  }
}

export const contactsCleaner = (contacts) => {
  const withPhone = contacts.filter(contact => contact.phoneNumbers);
  return withPhone.map(contact => ({
      name: contact.name,
      phone: phone(contact.phoneNumbers[0].number)[0],
      id: contact.id
    })
  );
}