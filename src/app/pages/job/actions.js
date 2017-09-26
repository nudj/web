const TOGGLE_DESCRIPTION = 'TOGGLE_DESCRIPTION'
function toggleDescription () {
  return {
    type: TOGGLE_DESCRIPTION
  }
}
module.exports.toggleDescription = () => {
  return (dispatch, getState) => {
    dispatch(toggleDescription())
  }
}
