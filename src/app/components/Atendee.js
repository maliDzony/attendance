import React, { Component } from 'react'
import PropTypes from 'prop-types'
import c from 'classnames'
import IconButton from 'material-ui/IconButton'
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import WatchLater from 'material-ui/svg-icons/action/watch-later'
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle'

import '../style/style.css'
import * as actions from '../actions'
import { connect } from 'react-redux'

class Attendee extends Component {
  constructor (props) {
    super(props)
    this.state = {
      markPresent: false,
      markLate: false,
      markAbsent: false,
      selected: false
    }
    this.initialState = this.state
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.reset) {
      this.reset()
    } else if (nextProps.markedCollection.collection) {
      if (nextProps.markedCollection.collection.indexOf(this.props.id) > -1) {
        this.setState({ [`mark${nextProps.markedCollection.type}`]: true,
        selected: false })
      }
    }
  }


  present=() => {
    this.setState({
      markPresent: true
    }, () => this.props.present(this.props.id))
  }

  late = () => {
    this.setState({
      markLate: true
    }, () => this.props.late(this.props.id))
  }

  absent = () => {
    this.setState({
      markAbsent: true
    }, () => this.props.absent(this.props.id))
  }

  reset = () => {
    this.setState(this.initialState)
  }

  select = () => {
    this.setState({ selected: !this.state.selected },
    () => this.props.selected({ selected: this.state.selected, id: this.props.id, key: this.props.key }))
  }

  render () {
    const { firstName, lastName, image } = this.props
    const studentMarked = this.state.markPresent || this.state.markLate || this.state.markAbsent || this.state.selected
    let iconStyle = {
      padding: 0,
      height: 30,
      width: 30
    }

    return (
      <div className={c('attendee', { present: this.state.markPresent }, { late: this.state.markLate }, { absent: this.state.markAbsent }, { selected: this.state.selected })}>
        <img alt='' className='studentImage' src={image} onDoubleClick={this.select} />
        <p className='studentName'>{`${firstName} ${lastName}`}</p>
        {!studentMarked && <div>
          <IconButton style={iconStyle} tooltip='Present' onClick={this.present}>
            <CheckCircle color='#009688' />
          </IconButton>
          <IconButton style={iconStyle} tooltip='Late' onClick={this.late}>
            <WatchLater color='#ecb715' />
          </IconButton>
          <IconButton style={iconStyle} tooltip='Absent' onClick={this.absent}>
            <RemoveCircle color='#d2493f' />
          </IconButton>
        </div>}
      </div>
    )
  }
}

Attendee.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.number,
  present: PropTypes.func,
  late: PropTypes.func,
  absent: PropTypes.func,
  selected: PropTypes.func,
  key: PropTypes.number
}

export default connect(() => ({
}), {
  present: actions.present,
  late: actions.late,
  absent: actions.absent,
  selected: actions.marked
})(Attendee)
