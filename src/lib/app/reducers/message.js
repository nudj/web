import {
  SET_JOB
} from '../actions/app'

const initialState = {}

export function messageReducer (state = initialState, action) {
  console.log('messageReducer', action, state)
  switch (action.type) {
    case SET_JOB:
      return state
    default:
      return state
  }
}
