import axios from "axios";
import { backendUrl } from "./config";
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  try {
    const response = await axios.post(backendUrl + route, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
  try {
    const token = getToken();
    const response = await axios.post(backendUrl + route, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const makeAuthenticatedPOSTRequestForSong = async (route, body) => {
  try {
    const token = getToken();
    const response = await axios.post(backendUrl + route, body, {
      headers: {
        "Content-Type": "'multipart/form-data'",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const makeAuthenticatedGETRequest = async (route) => {
  try {
    const token = getToken();
    const response = await axios.get(backendUrl + route, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return accessToken;
};
