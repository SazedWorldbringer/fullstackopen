import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
	return axios.get(baseUrl);
}

const create = async newObj => {
	return axios.post(baseUrl, newObj);
}

export default { getAll, create }
