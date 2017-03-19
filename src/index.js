import React, { Component, PropTypes } from 'react';

const ResilentComponent = ({
  FallbackComponent
}) =>
  ChildComponent => {
    return class Resilent extends Component {
      constructor(props) {
        super(props);

        this.state = {
          error: null,
          retries: 0
        };
      }

      unstable_handleError(error) {
        const { onError } = this.props

        this.setState(prevState => ({
          error,
          retries: prevState.retries + 1
        }));

        onError && onError(error);
      }

      render() {
        const { error, retries } = this.state;
        const { maxRetries, onError, ...other } = this.props

        return (error && retries > maxRetries)
          ? <FallbackComponent {...other} />
          : <ChildComponent {...other} />;
      }
    };
  };

ResilentComponent.propTypes = {
  FallbackComponent: PropTypes.node,
  onError: PropTypes.func,
  maxRetries: PropTypes.number
};

ResilentComponent.defaultProps = {
  FallbackComponent: () => null,
  maxRetries: 1
};

export default ResilentComponent;
