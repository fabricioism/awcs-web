import { isBrowser } from "./isBrowser";

export const getJWT = () => {
  if (isBrowser() && localStorage.getItem("jwt")) {
    const jwt = localStorage.getItem("jwt");
    return jwt;
  }
};
