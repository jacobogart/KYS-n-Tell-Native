import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import { contactsCleaner } from './cleaners';

export const fetchContacts = (query) => {
  return Permissions.askAsync(Permissions.CONTACTS)
    .then(permission => {
      if (permission.status === 'granted') {
        return Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
          name: query
        })
      }
    })
    .then(contacts => contactsCleaner(contacts.data))
}