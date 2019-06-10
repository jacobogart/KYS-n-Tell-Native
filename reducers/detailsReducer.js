export const detailsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.details;
    default:
      return state;
  }
}