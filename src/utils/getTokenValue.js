import jwt_decode from "jwt-decode";

export const getTokenValue = (value) => {
  const cookie = `; ${document.cookie}`;
  let parts = cookie.split(`; ${"token"}=`);
  if (parts.length === 2) {
    parts = parts.pop().split(";").shift();
    const decoded = jwt_decode(parts);
    return decoded[value];
  } else {
    return "";
  }
};
