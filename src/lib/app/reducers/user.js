import {
  SET_JOB
} from '../actions/app'

const initialState = {}

export function userReducer (state = initialState, action) {
  console.log('userReducer', action, state)
  switch (action.type) {
    case SET_JOB:
      return state
    default:
      return state
  }
}
