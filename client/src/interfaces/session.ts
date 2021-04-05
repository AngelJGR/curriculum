import User from "./user";

export default interface SessionState {
  token: string
  user: User
}