import { cmp as simple } from "./simple";
export class Toaster {
  static show(message) {
    simple.show(message);
  }
  static simple(message) {
    simple.show(message);
  }
  static full(message) {
    alert("full " + message);
  }
}
