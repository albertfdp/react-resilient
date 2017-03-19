import React from 'react';

import expect from 'test/expect';
import sinon from 'sinon';

import ResilentComponent from '.';

const Fallback = () => <div>Something went wrong</div>;
const Working = () => <div>It works!</div>;

const BrokenComponent = () => {
  throw new Error('Fail');
};

describe('react-resilent', () => {
  let Resilent;

  describe('when rendering a working component', () => {
    beforeEach(() => {
      Resilent = ResilentComponent({ FallbackComponent: Fallback })(Working);
    });

    it('renders', () => {
      expect(<Resilent />, 'to render as', <Working />);
    });
  });

  describe('when the component fails', () => {
    let onError;

    beforeEach(() => {
      Resilent = ResilentComponent({
        FallbackComponent: Fallback
      })(BrokenComponent);
    });

    it.skip('renders the fallback', () => {
      return expect(<Resilent />, 'when deeply rendered').then(rendered => {
        expect(rendered, 'to have rendered as', <Fallback />);
      });
    });

    it.skip('calls the onError callback', () => {
      const onError = sinon.spy();

      return expect(
        <Resilent onError={onError} />,
        'when deeply rendered'
      ).then(() => {
        expect(onError, 'to have calls satisfying', () => {
          onError(new Error('Fail'));
        });
      });
    });
  });
});
