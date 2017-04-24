import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import Info from 'material-ui/svg-icons/action/info'

import Students from '../model/students'
import Attendee from '../components/Atendee'
import * as actions from '../actions'
import '../style/style.css'
import Preview from '../components/DonePreview'

class AttendanceList extends Component {
  state={
    markedCollection: {},
    openModal: false
  }

  iconStyle = {
    padding: 0,
    height: 30,
    width: 30
  }

  reset = () => {
    this.setState({ markedCollection: {} }, () => this.props.reset())
  }

  done = () => {
    this.setState({ openModal: true })
  }

  handleCloseModal = () => {
    this.setState({ openModal: false })
  };

  markedArePresent = () => {
    this.setState({ markedCollection: { type: 'Present', collection: this.props.marked } },
      () => this.props.clearMarked({ type: 'present', collection: this.props.marked })) //eslint-disable-line
  }

  markedAreLate = () => {
    this.setState({ markedCollection: { type: 'Late', collection: this.props.marked } },
      () => this.props.clearMarked({ type: 'late', collection: this.props.marked })) //eslint-disable-line
  }

  markedAreAbsent = () => {
    this.setState({ markedCollection: { type: 'Absent', collection: this.props.marked } },
      () => this.props.clearMarked({ type: 'absent', collection: this.props.marked })) //eslint-disable-line
  }

  render () {
    const { resetMark, presentCount, lateCount, absentCount, hasSomeMarked, present, late, absent } = this.props

    return (
      <div className='wrapper'>
        <p className='info'>
          <IconButton
            style={this.iconStyle}
            tooltip='Use double click on image for multi select'
            tooltipPosition='bottom-right'
          >
            <Info color='#deed20' />
          </IconButton>
        </p>
        {Students.map((data, i) => <Attendee
          firstName={data.firstName}
          lastName={data.lastName}
          id={data.id}
          image={data.image}
          reset={resetMark}
          onClickPresent={this.presentCount}
          onClickLate={this.lateCount}
          onClickAbsent={this.absentCount}
          markedCollection={this.state.markedCollection}
          key={i}
        />)}
        <div>
        </div>
        <div className='count'>
          {hasSomeMarked && <div className='multipleSelect'>
            <RaisedButton label='Present' onClick={this.markedArePresent} />
            <RaisedButton label='Late' onClick={this.markedAreLate} />
            <RaisedButton label='Absent' onClick={this.markedAreAbsent} />
          </div>}
          <p>present: {presentCount}</p>
          <p>late: {lateCount}</p>
          <p>absent: {absentCount}</p>
          <p>unmarked: {this.props.unmarked}</p>
          <RaisedButton label='Reset' onClick={this.reset} />
          <RaisedButton label='Done' onClick={this.done} />
        </div>
        <Dialog
          title='Total'
          modal={false}
          open={this.state.openModal}
          onRequestClose={this.handleCloseModal}
        ><Preview present={present} late={late} absent={absent} />
        </Dialog>
      </div>
    )
  }
}

AttendanceList.propTypes = {
  reset: PropTypes.func,
  unmarked: PropTypes.number,
  marked: PropTypes.array,
  presentCount: PropTypes.number,
  lateCount: PropTypes.number,
  absentCount: PropTypes.number,
  resetMark: PropTypes.bool,
  hasSomeMarked: PropTypes.bool,
  present: PropTypes.array,
  late: PropTypes.array,
  absent: PropTypes.array
}

export default connect(state => ({
  unmarked: state.unmarked,
  marked: state.marked,
  resetMark: state.reset,
  presentCount: state.present.length,
  lateCount: state.late.length,
  absentCount: state.absent.length,
  present: state.present,
  late: state.late,
  absent: state.absent,
  hasSomeMarked: !!state.marked.length
}), {
  reset: actions.reset,
  clearMarked: actions.clearMarked
})(AttendanceList)
