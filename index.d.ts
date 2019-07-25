export interface EventControl {
  emit: (eventId: string, ...args: any) => void;
  add: (eventId: string, callback: Function, ctx?: object, ...args: any) => void;
  remove: (eventId: string, callback: Function) => void;
  dispose: () => void;
}
declare function EventControl(): EventControl;
export = EventControl;