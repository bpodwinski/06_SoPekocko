import Error from "./AppException";

export default class AuthError extends Error {
  constructor(message: string) {
    super(401, message);
  }
}
