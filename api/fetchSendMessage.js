export const fetchSendMessage = (contacts, message) => {
  const messagePromises = contacts.map(contact => {
    const body = { to: contact, message}
    const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
    }
    return fetch('/api/messages', options)
      .then(response => {
        if (!response.ok) {
          throw Error(`${contact}`)
        } else {
          return response.json();
        }
      })
    })
  return Promise.all(messagePromises)
}
  