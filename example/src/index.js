import React, { Component } from 'react'
import { render } from 'react-dom'

import ResilentComponent from '../../lib'

const FallbackComponent = () => (
  <div>Fallback: Something went wrong</div>
)

class Broken extends Component {
  constructor (props) {
    super(props)

    this.state = { fail: false }
    this.onBreak = this.onBreak.bind(this)
  }

  componentDidUpdate () {
    const { fail } = this.state

    if (fail) { throw new Error('What!!') }
  }

  onBreak () {
    this.setState({ fail: true })
  }

  render () {
    return (
      <button onClick={this.onBreak}>
        Break me
      </button>
    )
  }
}

const onError = () => console.log('foo')

const Resilent = ResilentComponent({
  FallbackComponent
})(Broken)

class App extends Component {
  constructor (props) {
    super(props)

    this.state = { errors: 0 }
    this.incrementError = this.incrementError.bind(this)
  }

  incrementError () {
    this.setState(prevState => ({ errors: prevState.errors + 1 }))
  }

  render () {
    const { errors } = this.state

    return [
      <Resilent onError={this.incrementError} maxRetries={2}/>,
      <div>
        { this.state.errors > 2 ? `Maximum retries (${errors} errors)` : `Errors: ${errors}` }
      </div>
    ]
  }
}

const root = document.createElement('div')
document.body.appendChild(root)

render(<App />, root)