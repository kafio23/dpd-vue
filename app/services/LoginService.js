import userData from "@/assets/data/user.json";

export default class LoginService {
  constructor() {
    this.userExist = false;
    this.emailFlag = false;
    this.passwordFlag = false;
  }

  register(user) {
    return Promise.resolve(user);
  }

  login(user) {
    this.userExist = false;
    this.emailFlag = false;
    this.passwordFlag = false;
    if (user.email == userData.email) {
      this.emailFlag = true;
    }
    if (user.password == userData.password) {
      this.passwordFlag = true;
    }

    if (this.emailFlag && this.passwordFlag) {
      this.userExist = true;
    }

    return new Promise((resolve, reject) => {
      if (this.userExist) {
        resolve(user);
      }
      reject();
    });
  }

  resetPassword(email) {
    return Promise.resolve(email);
  }
}
