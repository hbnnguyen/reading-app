import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export function useAuthStatus() {
  const [result, setResult] = useState({
    isLoading: true,
    isAuthorized: false,
    email: "",
    id: ""
  });

  useEffect(() => {
    let cancelRequest = false;
    const authToken = localStorage.getItem("psg_auth_token");
    axios
      .post(`${API_URL}/auth`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (cancelRequest) {
          return;
        }
        const { authStatus, identifier, userID } = response.data;
        if (authStatus === "success") {
          setResult({
            isLoading: false,
            isAuthorized: authStatus,
            email: identifier,
            id: userID
          });
        } else {
          setResult({
            isLoading: false,
            isAuthorized: false,
            email: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setResult({
          isLoading: false,
          isAuthorized: false,
          email: "",
        });
      });
    return () => {
      cancelRequest = true;
    };
  }, []);
  return result;
}