export default class BackendService {
  constructor() {
    this.baseUrl = "https://sheets.googleapis.com/v4/spreadsheets/";
    this.apiGoogleKey = process.env.VUE_APP_KEY;
    this.spreadsheetId = process.env.VUE_APP_SHEET;
    this.range = "Sheet1";
    this.apiUrl = "";
  }

  validateCode(response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve(response);
      }
      console.log(
        "Response with code: " +
          response.statusCode +
          "\nContent: " +
          response.content.toString()
      );
      reject(
        "Response with code: " +
          response.statusCode +
          "\nContent: " +
          response.content.toString()
      );
    });
  }

  getJson(response) {
    return new Promise((resolve, reject) => {
      console.info("Content: " + response.content.toString());
      resolve(response.content.toJSON());
    }).catch(e => {
      console.error("Error parsing JSON response: " + e);
      throw "Error parsing JSON response: " + e;
    });
  }
}
