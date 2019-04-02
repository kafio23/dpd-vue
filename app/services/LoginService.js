import userData from "@/assets/data/user.json";

export default class LoginService {
  constructor() {
    this.userExist = false;
    let emailFlag = false;
    let passwordFlag = false;
  }

  register(user) {
    return Promise.resolve(user);
  }

  login(user) {
    let userTest = JSON.parse(
      JSON.stringify({
        username: user.email,
        password: user.password
      })
    );
    if (Object.values(userTest)[0] == userData.email) {
      this.emailFlag = true;
    }
    if (Object.values(userTest)[1] == userData.password) {
      this.passwordFlag = true;
    }

    if (this.emailFlag && this.passwordFlag) {
      this.userExist = true;
    } else {
      this.userExist = false;
    }
    return new Promise((resolve, reject) => {
      if (this.emailFlag && this.passwordFlag) {
        resolve(user);
      }
      reject();
    });
  }

  resetPassword(email) {
    return Promise.resolve(email);
  }
}
