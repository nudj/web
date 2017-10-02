const TOGGLE_DESCRIPTION_BOX = 'TOGGLE_DESCRIPTION_BOX'
function toggleDescriptionBox (showing, height) {
  return {
    type: TOGGLE_DESCRIPTION_BOX,
    showing,
    height
  }
}
module.exports.toggleDescriptionBox = (height) => {
  return (dispatch, getState) => {
    const toggleStatus = getState().jobPage.showDescription
    dispatch(toggleDescriptionBox(!toggleStatus, height))
  }
}
