# react-resilient

[![Build Status](https://travis-ci.org/albertfdp/react-resilient.svg?branch=master)](https://travis-ci.org/albertfdp/react-resilient)
[![npm version](https://badge.fury.io/js/react-resilient.svg)](https://badge.fury.io/js/react-resilient)

A high order component for resiliently render components that might fail. It wraps them around a React Fiber error boundary.

* Tries to render your component
* Returns `<FallbackComponent />` after the maximum number of retries (`props.maxRetries`)

---

#### ⚠️ DISCLAIMER: Experimental
This is **experimental** and **unstable** React API. It will be fully supported with `react@next` (Fiber).

---

### [Demo](https://albertfdp.github.io/react-resilient)

```js
import React from 'react'
import Resilient from 'react-resilient'

const Broken = () => {
  throw new Error('Broken!')
}

const ResilientComponent = Resilient({
  FallbackComponent: () => <div>Fallback component</div>
})(Broken)

export default class Application extends React.Component {
  onError = (error) => {
    console.error('Error catched', error)
  }

  render () {
    return (
      <ResilientComponent
        maxRetries={2}
        onError={this.onError}
      />
    )
  }
}
```

### API

```js
const MyResilientComponent = Resilient({
  FallbackComponent: React.Component
})(React.Component)


<MyResilientComponent
  maxRetries={number}
  onError={func}
/>
```

##### `opts.FallbackComponent`

React component displayed after the `maxRetries`

##### `props.maxRetries` (optional, defaults to 0)

Number of retries before showing the `FallbackComponent`

##### `props.onError` (optional)

Callback for when errors are thrown
