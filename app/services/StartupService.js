import * as http from "tns-core-modules/http";
import BackendService from "./BackendService";

const appSettings = require("application-settings");

export default class StartupService extends BackendService {
  load(params) {
    let searchText = "";
    let byType = 0;
    if (params) {
      searchText = params.searchText || "";
      byType = params.byType || 0;
    }

    if (searchText) {
      return http
        .request({
          url: `${this.baseUrl}${this.spreadsheetId}/values/${
            this.range
          }!A2:G?key=${this.apiGoogleKey}`,
          method: "GET",
          headers: this.getHeaders()
        })
        .then(this.validateCode)
        .then(this.getJson)
        .then(data => {
          let filterWord = searchText.toUpperCase();
          let startups = [];
          let indices = [];
          let startupsLength = data.values.length;

          for (let i = 0; i < startupsLength; i++) {
            let txtValue =
              byType > 0 ? data.values[i][byType] : data.values[i][0];
            if (txtValue.toUpperCase().indexOf(filterWord) > -1) {
              data.values[i][8] = false;
              indices.push(i);
            } else {
              data.values[i][8] = true;
            }
          }

          for (let i = 0; i < startupsLength; i++) {
            if (indices.includes(i)) {
              startups.push(data.values[i]);
            }
          }
          data.values = startups;

          return data.values.map(item => {
            return {
              name: item[0],
              industry: item[1] || "",
              solutionType: item[2] || "",
              country: item[3] || "",
              contractDate: item[4],
              web: item[5] || "",
              university: item[6] || "",
              favorite: eval(appSettings.getString("favorites")).includes(
                item[0]
              )
                ? true
                : false,
              deleted: item[8] || false
            };
          });
        });
    } else {
      return http
        .request({
          url: `${this.baseUrl}${this.spreadsheetId}/values/${
            this.range
          }!A2:G?key=${this.apiGoogleKey}`,
          method: "GET",
          headers: this.getHeaders()
        })
        .then(this.validateCode)
        .then(this.getJson)
        .then(data => {
          console.info(
            `Received ${data.values.length} items from the backend.`
          );
          return data.values.map(item => {
            return {
              name: item[0],
              industry: item[1] || "",
              solutionType: item[2] || "",
              country: item[3] || "",
              contractDate: item[4],
              web: item[5] || "",
              university: item[6] || "",
              favorite: eval(appSettings.getString("favorites")).includes(
                item[0]
              )
                ? true
                : false,
              deleted: item[8] || false
            };
          });
        });
    }
  }

  update(item) {
    console.log(
      "putting",
      item,
      JSON.stringify({
        Name: item.name,
        Favorite: item.favorite
      })
    );

    let favoriteStartups = eval(appSettings.getString("favorites"));
    if (item.favorite) {
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      favoriteStartups.push(item.name);
      favoriteStartups = favoriteStartups.filter(onlyUnique);
      appSettings.setString("favorites", JSON.stringify(favoriteStartups));
      item.favorite = true;
    } else {
      if (favoriteStartups.indexOf(item.name) > -1) {
        favoriteStartups.splice(favoriteStartups.indexOf(item.name), 1);
        appSettings.setString("favorites", JSON.stringify(favoriteStartups));
      }
      item.favorite = false;
    }
    return http
      .request({
        url: `${this.baseUrl}${this.spreadsheetId}/values/${
          this.range
        }!A2:G?key=${this.apiGoogleKey}`,
        method: "GET", // 'PUT',
        headers: this.getHeaders()
      })
      .then(this.validateCode)
      .then(this.getJson)
      .then(data => {
        console.info(`Updated item with id ${item.id}.`);
        return item;
      });
  }

  getHeaders(toAppend = {}) {
    return Object.assign(
      {
        "Content-Type": "application/json"
      },
      toAppend
    );
  }
}
