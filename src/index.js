import React, { Component, PropTypes } from 'react';

class ResilientComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      retries: 0
    };
  }

  unstable_handleError(error) {
    const { onError } = this.props;

    this.setState(prevState => ({
      error,
      retries: prevState.retries + 1
    }));

    onError && onError(error);
  }

  render() {
    const { error, retries } = this.state;
    const { children, maxRetries, onError, FallbackComponent } = this.props;

    return error && retries > maxRetries ? <FallbackComponent /> : children;
  }
}

ResilientComponent.propTypes = {
  children: PropTypes.node.isRequired,
  FallbackComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  maxRetries: PropTypes.number,
  onError: PropTypes.func
};

ResilientComponent.defaultProps = {
  FallbackComponent: () => null,
  maxRetries: 0
};

export default ResilientComponent;
