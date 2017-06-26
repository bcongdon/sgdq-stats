import React from 'react'
import Stat from './Stat'
import { connect } from 'react-redux'
import { Row, Col, Grid } from 'react-bootstrap'

class GamesTable extends React.Component {
  getHeader() {
    return (
      <Row className='games-list-head'>
        <Col sm={4} xs={6}>Title</Col>
        <Col sm={3} xs={6}>Runner</Col>
        <Col sm={3} xs={6}>Starting Time</Col>
        <Col sm={2} xs={6}>Duration</Col>
      </Row>
    )
  }

  endTime (start_time, duration) {
    const split = duration.split(':')
    const hours = split[0]
    const minutes = split[1]
    const seconds = split[2]
    return start_time.add({hours, minutes, seconds})
  }

  toRow (title, runner, start_time, duration, key) {
    const status = this.endTime(start_time, duration).isBefore() ? '✓' : ''
    return (
      <Row className='game-list-row' key={key}>
        <Col sm={4} xs={6}>{title}</Col>
        <Col sm={3} xs={6}>{runner}</Col>
        <Col sm={3} xs={6}>{start_time.format('MMM D, h:mm a')} {status}</Col>
        <Col sm={2} xs={6}>{duration}</Col>
      </Row>
    )
  }

  getRows() {
    return this.props.schedule.map((game, idx) => {
      return this.toRow(game.name, game.runners, game.start_time, game.duration, idx)
    })
  }

  getGamesCompleted () {
    return this.props.schedule.filter((g) => this.endTime(g.start_time, g.duration).isBefore()).length
  }

  render () {
    return (
      <div className='section'>
        <h2>Games</h2>
        <div className="table-content">
          <div id="game-list">
            <Grid id="gamesTable">
              {this.getHeader()}
              <div className='games-list-body'>
                {this.getRows()}
              </div>
            </Grid>
          </div>
        </div>
        <div className='current_stats container'>
          <Stat title='Games Completed' emoji='🎮' value={this.getGamesCompleted()} />
        </div>
      </div>
    )
  }
}

function mapPropsToState(state) {
  return {
    schedule: state.gdq.schedule
  }
}

export default connect(mapPropsToState)(GamesTable)
