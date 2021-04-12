import Alert from "./alert";
import SessionState from "./session";

export default interface State {
  session: SessionState,
  alert?: Alert
}