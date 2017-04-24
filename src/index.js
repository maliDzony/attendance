import Root from './app/Root'
import hotWrapper from './hotWrapper'

hotWrapper(Root)

if (module.hot) {
  module.hot.accept(['./app/Root'], () => {
    const NewApp = require('./app/Root').default //eslint-disable-line
    hotWrapper(NewApp)
  })
}
