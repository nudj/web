const { merge } = require('@nudj/library')
const camelCase = require('lodash/camelCase')

const initialState = {
  showDescription: false
}

const toggleDescriptionBox = (state, action) => {
  return merge(state, { showDescription: action.showing, transitionHeight: action.height })
}

const actions = {
  toggleDescriptionBox
}

const jobPageReducer = (state = initialState, action) => {
  const type = camelCase(action.type)
  return actions[type] ? actions[type](state, action) : state
}

module.exports = jobPageReducer
