interface EventControl {
  emit: (eventId: string, ...args: any[]) => void;
  add: (
    eventId: string,
    callback: (...args: any[]) => void,
    ctx?: any,
    ...args: any[]
  ) => void;
  remove: (eventId: string, callback: (...args: any[]) => void) => void;
  dispose: () => void;
}
declare const eventcontrol: EventControl;
export = { eventcontrol };
