import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
	const request = axios.get(baseUrl);
	return request.then(res => res.data);
}

const create = async newObj => {
	const request = axios.post(baseUrl, newObj);
	return request.then(res => res.data);
}

export default { getAll, create }
