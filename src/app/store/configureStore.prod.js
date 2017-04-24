import { createStore, compose } from 'redux'

import rootReducer from '../rootReducer.js'

const finalCreateStore = compose(
)(createStore)

export default function configureStore (initialState) {
  return finalCreateStore(rootReducer, initialState)
}
