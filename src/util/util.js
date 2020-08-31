import axios from "axios";

const fetchResults = async query => {
  const req = await axios.get("/api/search?q=" + query);
  const data = await req.data;
  console.log(data);
  return data;
};

export default { fetchResults };
