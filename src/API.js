import axios from "axios";
import OpenAI from 'openai';

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const DICT_URL = process.env.REACT_APP_DICT_URL;
const API_URL = process.env.REACT_APP_API_URL;


class ReadingApi {
  static async request(endpoint, data = {}, method = "get", inputHeaders) {
    const url = `${API_URL}/${endpoint}`;
    const headers = inputHeaders;
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

    /**
   * Makes a request to the Gutendex API.
   *
   * @param {string} endpoint - The API endpoint to request.
   * @param {object} data - Optional data for the request body.
   * @param {string} method - The HTTP method (default: "get").
   * @returns {Promise<object>} A Promise that resolves to the response data from the API.
   * @throws {Error} If there is an error during the API request.
   */
  static gutendexRequest = async (endpoint, data = {}, method = "get") => {
    const url = `https://gutendex.com/${endpoint}`;
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  };

  static getUser = async (userID) => {
    const authToken = localStorage.getItem("psg_auth_token");

    let id = userID;
    try {

      let res = await axios.get(
        `${API_URL}/users/${id}`,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          }
        }
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  static editUser = async (user, data) => {
    const authToken = localStorage.getItem("psg_auth_token");
    let updatedUser = { ...user };
    updatedUser.name = data.name;
    updatedUser.age = data.age;
    try {
      let res = await axios.put(
        `${API_URL}/users/${user.id}`,
        updatedUser,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          }
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  static saveUserText = async (user, data) => {
    const authToken = localStorage.getItem("psg_auth_token");
    let updatedUser = { ...user };
    updatedUser.texts[data.title] = data.text;
    try {
      let res = await axios.put(
        `${API_URL}/users/${user.id}`,
        updatedUser,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          }
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  static saveUserBookPage = async (user, data) => {
    const authToken = localStorage.getItem("psg_auth_token");
    let updatedUser = { ...user };
    if (!updatedUser.books[data.bookID]) {
      updatedUser.books[data.bookID] = 1;
    } else {
      updatedUser.books[data.bookID] = data.pageNumber;
    }
    try {
      let res = await axios.put(
        `${API_URL}/users/${user.id}`,
        updatedUser,
        {
          headers: {
            authorization: `Bearer ${authToken}`,
          }
        }
      );
      return res;
    } catch (error) {
      console.log(error);
    }

  };

  static getBooks = async () => {
    try {
      const books = await this.gutendexRequest("books");
      return books
    } catch (error) {
      console.error(error)
    }
  }

  static getBook = async (bookID) => {
    try {
      let res = await this.gutendexRequest(`books/${bookID}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  static getBookTextFile = async (bookID) => {
    try {
      const book = await this.getBook(bookID);
      const bookText = book.formats["text/plain; charset=us-ascii"];
      console.log(bookText)
      return bookText
    } catch (error) {
      console.log(error);
    }
  }

  static getBookPage = async (data) => {
    let bookID = data.bookID;
    let pageNumber = data.pageNumber;
    try {
      let res = await this.request(`books/${bookID}/text/${pageNumber}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  static dictRequest = async (endpoint, data = {}, method = "get") => {
    const url = `${DICT_URL}/${endpoint}`;
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  };

  static getDefinition = async (word) => {
    try {
      let res = await this.dictRequest(word);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  static promptGPT = async (prompt) => {
    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true  // defaults to process.env["OPENAI_API_KEY"]
      });

      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.9,
        model: 'gpt-3.5-turbo',
      });
      // // console.log(prompt);
      // console.log(chatCompletion.choices);
      // console.log(chatCompletion.choices[0].message.content);

      const res = chatCompletion.choices[0].message.content;
      return res;
    } catch (error) {
      console.log(error);
    }
  };
}

export default ReadingApi;