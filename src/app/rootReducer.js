import Students from './model/students'
import update from 'react-addons-update'

const initialState = {
  present: [],
  late: [],
  absent: [],
  unmarked: Students.length,
  marked: [],
  reset: false,
  done: false
}

function reducer (state = initialState, action) {
  switch (action.type) {
  case '@@INIT': {
    return {
      ...state
    }
  }
  case 'present':
    return {
      ...state,
      present: update(state.present, { $push: [action.payload] }),
      unmarked: state.unmarked - 1,
      reset: false
    }
  case 'late':
    return {
      ...state,
      late: update(state.late, { $push: [action.payload] }),
      unmarked: state.unmarked - 1,
      reset: false
    }
  case 'absent':
    return {
      ...state,
      absent: update(state.absent, { $push: [action.payload] }),
      unmarked: state.unmarked - 1,
      reset: false
    }
  case 'marked':
    return {
      ...state,
      reset: false,
      marked: action.payload.selected ?
      update(state.marked, { $push: [action.payload.id] }) :
      update(state.marked, { $splice: [[action.payload.key, 1]] })
    }
  case 'clear_marked':
    return {
      ...state,
      [action.payload.type]: update(state[action.payload.type], { $push: action.payload.collection }),
      unmarked: state.unmarked === 0 ? 0 : state.unmarked - action.payload.collection.length,
      marked: [],
      reset: false
    }
  case 'reset':
    return {
      ...initialState,
      reset: true
    }

  default: return state
  }
}

export default reducer
