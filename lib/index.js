let registeredEvents = {};

class EventControl {
  /**
   * Calling this will force all callbacks listening to the eventId to fire
   * along with any arguments you've specified in both the addEventListener event and this one
   * @param {string} eventId a unique string which triggers all callbacks listening to the id
   * @param  {...any} args optional arguments that are added to the callback arguments
   */
  emit(eventId, ...args) {
    const eventList = registeredEvents[eventId];
    if (eventList !== undefined) {
      for (let i = 0; i < eventList.length; ++i) {
        eventList[i].event(...args);
      }
    }
  }

  /**
   * Add an event listener to dispatch from anywhere within the application
   * @param {string} eventId a unique string which triggers the callback
   * @param {function} callback function that is called when the event id is dispatched
   * @param {object} ctx an optional reference to bind 'this' to when the callback is fired
   * @param {...any} args additional optional arguments to pass to the callback
   */
  add(eventId, callback, ctx, ...args) {
    if (callback === undefined) {
      // eslint-disable-next-line
      console.log("EventControl::addEventListener:: callback is undefined!");
      return;
    }
    if (registeredEvents[eventId] === undefined) {
      registeredEvents[eventId] = [];
    }
    registeredEvents[eventId].push({
      event: function(...wrappedArgument) {
        callback.call(ctx, ...args, ...wrappedArgument);
      },
      //stored for reference removal in remove
      callback
    });
  }

  /**
   * Remove a callback from listening to a particular event id
   * @param {string} eventId a unique string which triggers the callback
   * @param {function} callback function that is called when the event id is dispatched
   */
  remove(eventId, callback) {
    const eventList = registeredEvents[eventId];
    if (eventList !== undefined) {
      for (let i = eventList.length - 1; i >= 0; --i) {
        if (callback === eventList[i].callback) {
          eventList.splice(i, 1);
        }
      }
      if (eventList.length === 0) {
        delete registeredEvents[eventId];
      }
    }
  }

  dispose() {
    for (let eventId in registeredEvents) {
      registeredEvents[eventId] = null;
    }
    registeredEvents = {};
  }
}

export default new EventControl();
