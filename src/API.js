import axios from "axios";
import { async } from "q";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const DICT_URL = process.env.REACT_APP_DICT_URL
const API_URL = process.env.REACT_APP_API_URL;

class ReadingApi {
  static async request(endpoint, data = {}, method = "get", inputHeaders) {
    const url = `${API_URL}/${endpoint}`
    console.log(url)
    const headers = inputHeaders
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      // let message = err.response.data.error.message;
      // throw Array.isArray(message) ? message : [message];
    }
  }

  static getUser = async (userID) => {
    console.log(userID)
    let id = userID;
    let res = await this.request(`users/${id}`)
    return res;
  }

  static editUser = async (user, data) => {
    user.name = data.name
    user.age = data.age

    let res = await this.request(`users/${user.id}`, user, "put");
    return res;
  }

  static saveUserText = async (user, data) => {
    user.texts[data.textName] = data.text
    let res = await this.request(`users/${user.id}`, user, "put")
    return res
  }

  static saveUserBookPage = async (user, data) => {
    user.books[data.bookID] = data.bookPage
    let res = await this.request(`users/${user.id}`, user, "put")
    return res
  }


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