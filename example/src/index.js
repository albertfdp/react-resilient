import React, { Component } from 'react';
import classnames from 'classnames';
import { render } from 'react-dom';

import styles from './styles.css';

import ResilentComponent from '../../lib';

const FallbackComponent = () => (
  <div className={styles.fallback}>Fallback: Something went wrong</div>
);

class Broken extends Component {
  constructor(props) {
    super(props);

    this.state = { fail: false };
    this.onBreak = this.onBreak.bind(this);
  }

  componentDidUpdate() {
    const { fail } = this.state;

    if (fail) {
      throw new Error('What!!');
    }
  }

  onBreak() {
    this.setState({ fail: true });
  }

  render() {
    return (
      <button className={styles.button} onClick={this.onBreak}>
        Break me
      </button>
    );
  }
}

const onError = () => console.log('foo');

const Resilent = ResilentComponent({
  FallbackComponent
})(Broken);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
    this.incrementError = this.incrementError.bind(this);
  }

  incrementError(error) {
    this.setState(prevState => ({
      errors: prevState.errors.concat(error)
    }));
  }

  renderMessage() {
    const { errors } = this.state;

    if (errors.length === 0) {
      return 'This will retry, and then show a fallback.';
    } else if (errors.length === 1) {
      return 'It failed. Try one more time';
    } else {
      return null;
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className={styles.app}>
        <div className={styles.half}>
          <h3>A normal Component</h3>
          <p>This will break the <strong>entire</strong> app.</p>
          <Broken />
        </div>
        <div
          className={classnames(styles.half, {
            [styles.error]: errors.length > 0
          })}
        >
          <h3>With HOC react-resilent</h3>
          <p>{this.renderMessage()}</p>
          <Resilent onError={this.incrementError} maxRetries={1} />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('container'));
