const TOGGLE_DESCRIPTION_BOX = 'TOGGLE_DESCRIPTION_BOX'
module.exports.TOGGLE_DESCRIPTION_BOX = TOGGLE_DESCRIPTION_BOX
function toggleDescriptionBox (showing) {
  return {
    type: TOGGLE_DESCRIPTION_BOX,
    showing
  }
}
module.exports.toggleDescriptionBox = () => {
  return (dispatch, getState) => {
    const toggleStatus = getState().jobPage.showDescription
    dispatch(toggleDescriptionBox(!toggleStatus))
  }
}
