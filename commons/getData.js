import { getJWT } from "./getJWT";

export const getData = ({ endpoint, id }) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}/${id}`;
  const bearer = getJWT();
  const headers = {
    Authorization: `Bearer ${bearer}`,
  };
  let data = {};
  fetch(URL, { method: "GET", headers })
    .then((res) => res.json())
    .then((response) => {
      console.log("response", response);
      data = response;
    })
    .catch((error) => console.log("error", error));
  return data;
};
