import * as http from 'tns-core-modules/http'
import BackendService from './BackendService'

const appSettings = require("application-settings");

export default class StartupService extends BackendService {
  load() {
    return http.request({
      url: `${this.baseUrl}${this.spreadsheetId}/values/${this.range}!A2:G?key=${this.apiGoogleKey}`,
      method: 'GET',
      headers: this.getHeaders(),
    })
    .then(this.validateCode)
    .then(this.getJson)
      .then(data => {
        console.info(data);
        console.info(`Received ${data.values.length} items from the backend.`)
        return data.values.map(item => {
          return {
            name: item[0],
            industry: item[1] || '',
            solutionType: item[2] || '',
            country: item[3] || '',
            contractDate: item[4],
            web: item[5] || '',
            university: item[6] || '',
            favorite: (eval(appSettings.getString("favorites")).includes(item[0])) ? true : false,
            deleted : item[8] || false,
          }
        })
    })
  }

  update(item) {
    console.log('putting', item, JSON.stringify({
      Name: item.name,
      Favorite: item.favorite
    }))

    if (item.favorite) {
      let favoriteStartups = eval(appSettings.getString("favorites"))
      
      function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
      }

      favoriteStartups.push(item.name)
      favoriteStartups = favoriteStartups.filter( onlyUnique )
      console.log(favoriteStartups)
      appSettings.setString("favorites", JSON.stringify(favoriteStartups))
    }
    return http
      .request({
        url: `${this.baseUrl}${this.spreadsheetId}/values/${this.range}!A2:G?key=${this.apiGoogleKey}`,
        method: 'GET', // 'PUT',
        headers: this.getHeaders()
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info(`Updated item with id ${item.id}.`)
        item.favorite = true
        return item
      })
  }

  getHeaders(toAppend = {}) {
    return Object.assign({
      'Content-Type': 'application/json'
    },
    toAppend)
  }
}