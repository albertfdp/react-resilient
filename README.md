# react-resilent

A high order component for resilently render components that might fail. It wraps them around an fiber error boundary.

* Tries to render your component
* Returns `<FallbackComponent />` after the maximum number of retries (`maxRetries`)

---

#### ⚠️ DISCLAIMER: Experimental
This **ONLY** works with `react@next` (Fiber).

---

Example here: [example](https://github.com/albertfdp/react-resilent/tree/master/example)

### Example

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
Resilent({
  FallbackComponent: React.Component
})(React.Component)
```

##### `opts.FallbackComponent`

React component displayed after the `maxRetries`

##### `props.maxRetries` (optional, defaults to 1)

Number of retries before showing the `FallbackComponent`

##### `props.onError` (optional)

Callback for when errors are thrown
