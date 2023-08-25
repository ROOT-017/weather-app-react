import axios from "axios";

var url = "https://weatherapi-com.p.rapidapi.com";
const KEY = "4b946a6fd7msh072cd218e936673p139920jsnd496cdbde00c";

const SendRequest = async (method, endpoint, data, params) => {
//   url = `${url}${endpoint}`;
  try {
    // return [];
    const response = await axios({
      method,
      url:`${url}${endpoint}`,
      params: {
        q: params || null,
      },
      headers: {
        "x-rapidapi-key": KEY,
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    });
    return response.data || [];
  } catch (err) {
    console.log(err);
  }
};

export default SendRequest;
