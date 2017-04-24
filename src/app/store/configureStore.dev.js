import { createStore, compose } from 'redux'

import AppStateWithEffects from 'redux-side-effects/lib/AppStateWithEffects'

import rootReducer from '../rootReducer.js'

const finalCreateStore = compose(
  window.devToolsExtension ? window.devToolsExtension({
    deserializeState: state => state && new AppStateWithEffects(state.appState, [])
  }) : f => f
)(createStore)

export default function configureStore (initialState) {
  const store = finalCreateStore(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer.js', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}
