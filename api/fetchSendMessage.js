import { IP } from "./utilities";

export const fetchSendMessage = (contacts, message) => {
  const messagePromises = contacts.map(contact => {
    const body = { to: contact.phone, message}
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    return fetch(`http://${IP}:3001/api/messages`, options)
      .then(response => {
        if (!response.ok) {
          throw Error(`${contact}`)
        } else {
          return response.json();
        }
      })
    });
  return Promise.all(messagePromises)
}
  