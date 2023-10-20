import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const DICT_URL = process.env.REACT_APP_DICT_URL
const API_URL = process.env.REACT_APP_API_URL;

class ReadingApi {
  static async request(endpoint, data = {}, method = "get", inputHeaders) {
    const url = `${API_URL}/${endpoint}`
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
    let id = userID;
    let res = await this.request(`users/${id}`)
    return res;
  }

  static editUser = async (user, data) => {
    let updatedUser = {...user}

    updatedUser.name = data.name
    updatedUser.age = data.age

    let res = await this.request(`users/${user.id}`, updatedUser, "put");

    return res;
  }

  static saveUserText = async (user, data) => {
    let updatedUser = {...user}
    updatedUser.texts[data.title] = data.text

    let res = await this.request(`users/${user.id}`, updatedUser, "put")
    return res
  }

  static saveUserBookPage = async (user, data) => {
    let updatedUser = {...user}
    if (!updatedUser.books[data.bookID]) {
      updatedUser.books[data.bookID] = 1
    } else {
      updatedUser.books[data.bookID] = data.pageNumber
    }

    let res = await this.request(`users/${user.id}`, updatedUser, "put")
    return res
  }

  static getBooks = async () => {
    let res = await this.request(`books`)
    return res
  }

  static getBookPage = async (data) => {
    let bookID = data.bookID
    let pageNumber = data.pageNumber

    let res = await this.request(`books/${bookID}/text/${pageNumber}`)
    return res
  }

  static dictRequest = async (endpoint, data = {}, method = "get") => {
    const url = `${DICT_URL}/${endpoint}`
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