import axios from "axios";

const fetchResults = async (uid, query) => {
  const req = await axios.get("/api/search?q=" + query, {
    headers: {
      uid,
    },
  });
  const data = await req.data;
  console.log(data);
  return data;
};

const fetchUserData = async (uid, userId) => {
  const req = await axios.get("/api/user/" + userId, {
    headers: {
      uid,
    },
  });
  const data = await req.data;
  console.log(data);
  return data;
};

const tryLogin = async (uid, login) => {
  const req = await axios.get("/api/login", {
    headers: {
      login: JSON.stringify(login),
      uid,
    },
  });
  const data = await req.data;
  console.log(data);
  return data;
};

const logout = async uid => {
  await axios.get("/api/logout", {
    headers: {
      uid,
    },
  });
};

const capitalize = text => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default { fetchResults, fetchUserData, tryLogin, capitalize, logout };
