import userData from "@/assets/data/user.json";

export default class LoginService {
  register(user) {
    return Promise.resolve(user);
  }
  login(user) {
    return Promise.resolve(user);
  }
  resetPassword(email) {
    return Promise.resolve(email);
  }
}
