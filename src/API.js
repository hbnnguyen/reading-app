import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const DICT_URL = "https://api.dictionaryapi.dev/api/v2/entries/en"
class ReadingApi {
  // static async request(apiUrl, endpoint, data = {}, method = "get", inputHeaders) {
  //   const url = `${apiUrl}/${endpoint}`
  //   const headers = inputHeaders
  //   const params = (method === "get")
  //     ? data
  //     : {};

  //   try {
  //     return (await axios({ url, method, data, params, headers })).data;
  //   } catch (err) {
  //     console.error("API Error:", err.response);
  //     let message = err.response.data.error.message;
  //     throw Array.isArray(message) ? message : [message];
  //   }
  // }

  static dictRequest = async (endpoint, data = {}, method = "get") => {
    const url = `${DICT_URL}/${endpoint}`
    console.log(DICT_URL)
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params})).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static getDefinition = async (word) => {
    let res = await this.dictRequest(word)
    return res
  }

}

export default ReadingApi;