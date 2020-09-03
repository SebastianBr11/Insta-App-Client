import axios from "axios";

const fetchResults = async query => {
  const req = await axios.get("/api/search?q=" + query);
  const data = await req.data;
  console.log(data);
  return data;
};

const fetchUserData = async uid => {
  const req = await axios.get("/api/user/" + uid);
  const data = await req.data;
  console.log(data);
  return data;
};

const tryLogin = async login => {
  const req = await axios.get("/api/login", {
    headers: {
      login: JSON.stringify(login),
    },
  });
  const data = await req.data;
  console.log(data);
  return data;
};

const capitalize = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default { fetchResults, fetchUserData, tryLogin, capitalize };
