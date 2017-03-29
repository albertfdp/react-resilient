import React, { Component, PropTypes } from 'react';

const ResilientComponent = (
  {
    FallbackComponent
  }
) =>
  ChildComponent => {
    class Resilient extends Component {
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
        const { maxRetries, onError, ...other } = this.props;

        return error && retries > maxRetries
          ? <FallbackComponent {...other} />
          : <ChildComponent {...other} />;
      }
    }

    Resilient.propTypes = {
      onError: PropTypes.func,
      maxRetries: PropTypes.number
    };

    Resilient.defaultProps = {
      maxRetries: 0
    };

    return Resilient;
  };

ResilientComponent.propTypes = {
  FallbackComponent: PropTypes.node
};

ResilientComponent.defaultProps = {
  FallbackComponent: () => null
};

export default ResilientComponent;
