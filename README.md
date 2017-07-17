# react-resilient

[![Build Status](https://travis-ci.org/albertfdp/react-resilient.svg?branch=master)](https://travis-ci.org/albertfdp/react-resilient)
[![npm version](https://badge.fury.io/js/react-resilient.svg)](https://badge.fury.io/js/react-resilient)

A React component for resiliently render components that might fail. It wraps them around a React Fiber error boundary.

* Tries to render your component
* Renders `<FallbackComponent />` after the maximum number of retries (`props.maxRetries`)

---

#### ⚠️ DISCLAIMER: Experimental
This is **experimental** and **unstable** React API. It will be fully supported with `react@16.0.0` with first-level support `componentDidCatch`: https://github.com/facebook/react/pull/10200.

---

### [Demo](https://albertfdp.github.io/react-resilient)

```js
import React from 'react'
import Resilient from 'react-resilient'

const Broken = () => {
  throw new Error('Broken!')
}

const FallbackComponent = () => (
  <div>This is my fallback</div>
)

export default class Application extends React.Component {
  onError = (error) => {
    console.error('Error catched', error)
  }
  
  render () {
    return (
      <Resilient
        FallbackComponent={FallbackComponent}
        maxRetries={2}
        onError={this.onError}
      >
        <Broken />
      </Resilient>
    )
  }
}
```

### API

```js
<Resilient
  FallbackComponent={React.Component}
  maxRetries={number}
  onError={func}
>
  <YourComponent />
</Resilient>
```

##### `props.FallbackComponent (optional, defaults to render null)`

React component displayed after the `maxRetries`

##### `props.maxRetries` (optional, defaults to 0)

Number of retries before showing the `FallbackComponent`

##### `props.onError` (optional)

Callback for when errors are thrown
