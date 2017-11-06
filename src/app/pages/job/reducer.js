const { merge } = require('@nudj/library')
const { TOGGLE_DESCRIPTION_BOX } = require('./actions')

const initialState = {
  showDescription: true
}

const toggleDescriptionBox = (state, action) => {
  return merge(state, { showDescription: action.showing })
}

const actions = {
  [TOGGLE_DESCRIPTION_BOX]: toggleDescriptionBox
}

const jobPageReducer = (state = initialState, action) => {
  const type = action.type
  return actions[type] ? actions[type](state, action) : state
}

module.exports = jobPageReducer
