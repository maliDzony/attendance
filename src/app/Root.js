import React from 'react'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// Theming
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const muiTheme = getMuiTheme(baseTheme)

import AttendanceList from './Attendance'

export default function Root () {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <AttendanceList />
    </MuiThemeProvider>
  )
}
