declare class EventControl {
  emit: (eventId: string, ...args: any[]) => void;
  add: (
    eventId: string,
    callback: (...args: any[]) => any,
    ctx?: any,
    ...args: any[]
  ) => void;
  remove: (eventId: string, callback: (...args: any[]) => any) => void;
  dispose: () => void;
}

declare const eventcontrol: EventControl;
export { eventcontrol, EventControl };
