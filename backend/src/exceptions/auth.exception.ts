import AppException from "./app.exception";

export default class AuthError extends AppException {
  constructor(message: string) {
    super(401, message);
  }
}
