import {createUser, getUsers} from "../../services/index.js";

export async function get(req, res) {
	const users = getUsers();
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(users));
}

export async function post(req, res) {
	try {
		const user = JSON.parse(req.body);
		const users = getUsers();
		user.id = Math.max(0, ...users.map(u => u.id || 0)) + 1;

		const updatedUsers = createUser(user);
		res.writeHead(201, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(updatedUsers));
	} catch (err) {
		res.writeHead(400, {'Content-Type': 'application/json'});
		res.end(JSON.stringify({error: 'Invalid JSON'}));
	}
}
