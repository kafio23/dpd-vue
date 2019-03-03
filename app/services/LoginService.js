import * as http from 'tns-core-modules/http'
import BackendService from './BackendService'

import userData from '@/assets/data/user.json'

export default class LoginService extends BackendService {

  login(user) {
    // return http.request({
    //   url: this.baseUrl + "user/" + this.appKey + "/login",
    //   method: "POST",
    //   headers: this.getCommonHeaders(),
    //   content: JSON.stringify({
    //     username: user.email,
    //     password: user.password
    //   }),
    // })
    // .then(this.validateCode)
    // .then(this.getJson)
    let emailFlag = false
    let passwordFlag = false
    let userTest = JSON.parse(JSON.stringify({
      username: user.email,
      password: user.password
    }))
    if (Object.values(userTest)[0] == userData.email){
      emailFlag = true
    }
    if (Object.values(userTest)[1] == userData.password) {
      passwordFlag = true
    }

    if  (emailFlag && passwordFlag) {
      console.log('----SIIII----')
      return true
    } else {
      return false
    }
    // this.respond = true
    // return true
    //   .then(data => {
    //     console.info('User logged')
    //     this.respond = true
    //   })
  }

  register(user) {
    return http.request({
      url: this.baseUrl + "user/" + this.appKey,
      method: "POST",
      headers: this.getCommonHeaders(),
      content: JSON.stringify({
        username: user.email,
        email: user.email,
        password: user.password
      }),
    })
    .then(this.validateCode)
    .then(this.getJson)
    .then(data => {
      console.info('User registered: ', data)
    })
  }

  resetPassword(email) {
    return http.request({
      url: this.baseUrl + "rpc/" + this.appKey + "/" + email + "/user-password-reset-initiate",
      method: "POST",
      headers:this.getCommonHeaders()
    })
    .then(this.validateCode)
    .then(this.getJson)
    .then(data => {
      console.info('Reset password for email: ' + data.Result.Result)
    })
  }

  logout() {
    this.token = ""
  }

  getCommonHeaders() {
    return {
      "Content-Type": "application/json",
      "Authorization": this.appUserHeader,
    }
  }
}