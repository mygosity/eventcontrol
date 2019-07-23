# eventcontrol

An event controller that allows you to add callbacks to a list and have them fire when the event is dispatched.

### Usage

NodeJS example

```javascript
//in one class file
const eventcontrol = require("eventcontrol");
class Example {
  exampleCallback(arg1, arg2, optionalArg) {
    console.log("exampleCallback fired!", this, arg1, arg2);
  }
  someOtherFunction() {
    //hook up that callback to this event string 'EVENT_FIRED'
    eventcontrol.add("EVENT_FIRED", someCallback, this, "optionalArg");
  }
}
```

```javascript
//in another class file
const eventcontrol = require("eventcontrol");
class SomeOtherClass {
  doingSomething() {
    eventcontrol.emit("EVENT_FIRED", "arg1", "arg2");
  }
}
```

Using it like this should show you what options you have with regards to passing arguments (which are all optional).

I've also provided an exmaple from a react project. This has a nice use case when you need an event to fire
without actually changing any props and you don't want to add too much code to hook up something like redux.

```javascript
import eventcontrol from "eventcontrol";
import { eventTypes } from "../events";

class SomeComponent extends Component {
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
import eventcontrol from "eventcontrol";
import { eventTypes } from "../events";

class OtherComponent extends Component {
  someFunction() {
    eventcontrol.emit(eventTypes.SOME_EVENT_NAME, 123, "hello world");
  }
}
```
