# react-resilent

[![Build Status](https://travis-ci.org/albertfdp/react-resilent.svg?branch=master)](https://travis-ci.org/albertfdp/react-resilent)

A high order component for resilently render components that might fail. It wraps them around a React Fiber error boundary.

* Tries to render your component
* Returns `<FallbackComponent />` after the maximum number of retries (`maxRetries`)

---

#### ⚠️ DISCLAIMER: Experimental
This **ONLY** works with `react@next` (Fiber).

---

### [Demo](https://albertfdp.github.io/react-resilent)

```js
import React from 'react'
import Resilent from 'react-resilent'

const Broken = () => {
  throw new Error('Broken!')
}

const ResilentComponent = Resilent({
  FallbackComponent: () => <div>Fallback component</div>
})(Broken)

export default class Application extends React.Component {
  onError = (error) => {
    console.error('Error catched', error)
  }
  
  render () {
    return (
      <ResilentComponent
        maxRetries={2}
        onError={this.onError}
      />
    )
  }
}
```

### API

```js
const MyResilentComponent = Resilent({
  FallbackComponent: React.Component
})(React.Component)


<MyResilentComponent
  maxRetries={number}
  onError={func}
/>
```

##### `opts.FallbackComponent`

React component displayed after the `maxRetries`

##### `props.maxRetries` (optional, defaults to 1)

Number of retries before showing the `FallbackComponent`

##### `props.onError` (optional)

Callback for when errors are thrown
