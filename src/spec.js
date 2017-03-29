import React from 'react';

import expect from 'test/expect';
import sinon from 'sinon';

import ResilientComponent from '.';

const Fallback = () => <div>Something went wrong</div>;
const Working = () => <div>It works!</div>;

const BrokenComponent = () => {
  throw new Error('Fail');
};

describe('react-resilient', () => {
  let Resilient;

  describe('when rendering a working component', () => {
    beforeEach(() => {
      Resilient = ResilientComponent({ FallbackComponent: Fallback })(Working);
    });

    it('renders', () => {
      expect(<Resilient />, 'to render as', <Working />);
    });
  });

  describe('when the component fails', () => {
    let onError;

    beforeEach(() => {
      Resilient = ResilientComponent({
        FallbackComponent: Fallback
      })(BrokenComponent);
    });

    it.skip('renders the fallback', () => {
      return expect(<Resilient />, 'when deeply rendered').then(rendered => {
        expect(rendered, 'to have rendered as', <Fallback />);
      });
    });

    it.skip('calls the onError callback', () => {
      const onError = sinon.spy();

      return expect(
        <Resilient onError={onError} />,
        'when deeply rendered'
      ).then(() => {
        expect(onError, 'to have calls satisfying', () => {
          onError(new Error('Fail'));
        });
      });
    });
  });
});
