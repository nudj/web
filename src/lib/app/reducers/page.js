import {
  SET_JOB
} from '../actions/app'

const initialState = {}

export function pageReducer (state = initialState, action) {
  console.log('pageReducer', action, state)
  switch (action.type) {
    case SET_JOB:
      return state
    default:
      return state
  }
}
