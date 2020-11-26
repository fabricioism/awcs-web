export const generateHeaders = (type, values) => {
  switch (type) {
    case "auth":
      const { token } = values;
      return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

    default:
      return {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
  }
};
