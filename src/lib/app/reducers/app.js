import {
  SET_JOB
} from '../actions/app'

const initialState = {
  page: {}
}

export function appReducer (state = initialState, action) {
  console.log(action, state)
  switch (action.type) {
    case SET_JOB:
      return state
    default:
      return state
  }
}
