# eventcontrol

An event controller that allows you to add callbacks to a list and have them fire when the event id is emitted.

[![npm version](https://img.shields.io/npm/v/eventcontrol.svg?color=%232c8ebb&style=flat-square)](https://www.npmjs.com/package/eventcontrol)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/eventcontrol.svg?color=rgb%28113%2C%20138%2C%20240%29&label=gzipped&style=flat-square)
[![MIT license](https://img.shields.io/npm/l/eventcontrol.svg?color=%233DA639&style=flat-square)](http://opensource.org/licenses/MIT)

## Usage

Install using

```node
npm i eventcontrol
```

Import using

```javascript
import { eventcontrol } from "eventcontrol";
```

Add an event listener by calling

```javascript
eventcontrol.add("EVENT_NAME", functionToCall);
```

functionToCall will fire when eventcontrol is emitted

```javascript
eventcontrol.emit("EVENT_NAME");
```

if you need arguments passed from emit you can simply add them by comma separated arguments

```javascript
eventcontrol.emit("EVENT_NAME", "some string", 123, someObjRef);
```

remove a listener by invoking remove

```javascript
eventcontrol.remove("EVENT_NAME", functionToCall);
```

or call dispose and it will reset all events added

```javascript
eventcontrol.dispose();
```

Additional notes:

- eventcontrol is a singleton
- if you add the same callback to the same event id, it will replace the last entry with the latest add invocation
- you can add extra arguments, or extra functions to listen to the same event. Examples are given below:

### NodeJS example

```javascript
//in one class file
const eventcontrol = require("eventcontrol").eventcontrol;
class Example {
  exampleCallback(optional, optional2, arg1, arg2) {
    console.log(
      "exampleCallback fired!",
      this,
      optional,
      optional2,
      arg1,
      arg2
    );
  }
  someOtherFunction() {
    //hook up that callback to this event string 'EVENT_FIRED'
    eventcontrol.add(
      "EVENT_FIRED",
      this.exampleCallback,
      this,
      optional,
      optional2
    );
  }
}
```

```javascript
//in another class file
const eventcontrol = require("eventcontrol").eventcontrol;
class SomeOtherClass {
  doingSomething() {
    eventcontrol.emit("EVENT_FIRED", "arg1", "arg2");
  }
}
```

Using it like this should show you what options you have with regards to passing arguments (which are all optional).
Note the order of the arguments received in the exampleCallback.

I've also provided an example from a react project below. This has a nice use case when you need an event to fire
without actually changing any props and you don't want to add too much code to hook up something like redux.

### ReactJS example

```javascript
import React from "react";
import { eventcontrol } from "eventcontrol";
import { eventTypes } from "../events";

class SomeComponent extends React.Component {
  someEventCallback(arg1, arg2) {
    console.log("someEventCallback fired!", this, arg1, arg2);
  }
  componentDidMount() {
    eventcontrol.add(eventTypes.SOME_EVENT_NAME, this.someEventCallback, this);
  }
  componentWillUnmount() {
    eventcontrol.remove(eventTypes.SOME_EVENT_NAME, this.someEventCallback);
  }
}
```

```javascript
import React from "react";
import { eventcontrol } from "eventcontrol";
import { eventTypes } from "../events";

class OtherComponent extends React.Component {
  someFunction() {
    eventcontrol.emit(eventTypes.SOME_EVENT_NAME, 123, "hello world");
  }
}
```
