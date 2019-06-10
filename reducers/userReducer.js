export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_LOCATION':
      return { location: action.location };
    default:
      return state;
  }
}