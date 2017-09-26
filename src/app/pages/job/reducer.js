const { merge } = require('@nudj/library')
const camelCase = require('lodash/camelCase')

const initialState = {
  toggleDescription: false
}

const toggleDescription = (state, action) => {
  return merge(state, { toggleDescription: !state.toggleDescription })
}

const actions = {
  toggleDescription
}

const jobPageReducer = (state = initialState, action) => {
  const type = camelCase(action.type)
  return actions[type] ? actions[type](state, action) : state
}

module.exports = jobPageReducer
