import React from 'react';

import expect from 'test/expect';
import sinon from 'sinon';

import Resilient from '.';

const Fallback = () => <div>Something went wrong</div>;
const Working = () => <div>It works!</div>;

const BrokenComponent = () => {
  throw new Error('Fail');
};

describe('react-resilient', () => {
  describe('when rendering a working component', () => {
    it('renders', () => {
      expect(
        <Resilient FallbackComponent={Fallback}>
          <Working />
        </Resilient>,
        'to render as',
        <Working />
      );
    });
  });

  /** unexpected-react doesn't support unstable_handleError yet */
  describe.skip('when the component fails', () => {
    let onError;

    it('renders the fallback', () => {
      return expect(
        <Resilient FallbackComponent={Fallback} maxRetries={0}>
          <BrokenComponent />
        </Resilient>,
        'to deeply render as',
        <Fallback />
      );
    });

    it('calls the onError callback', () => {
      const onError = sinon.spy();

      return expect(
        <Resilient
          onError={onError}
          FallbackComponent={Fallback}
          maxRetries={0}
        >
          <BrokenComponent />
        </Resilient>,
        'when deeply rendered'
      ).then(() => {
        expect(onError, 'to have calls satisfying', () => {
          onError(new Error('Fail'));
        });
      });
    });
  });
});
