// const DOMAIN = "http://localhost:8080"
const DOMAIN = "http://192.168.1.15:8080";
export const API_ENDPOINT = `${DOMAIN}`;
export const FAKE_API = "https://jsonplaceholder.typicode.com";
export const generateId = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
