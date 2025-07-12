import {deleteUserById, getUserById, updateUserById} from "../../../services/index.js";


export function get(req, res) {
	try {
		const user = getUserById(Number(req.params.resourceId));
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(user));
	} catch (r) {
		res.writeHead(404, {'Content-Type': 'application/json'});
		res.end(JSON.stringify({error: 'User not found'}));
	}
}

export async function put(req, res) {
	const id = Number(req.params.resourceId);
	try {
		const data = JSON.parse(req.body);
		const updated = updateUserById(id, {id, name: data.name});
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(updated.find(u => u.id === id)));
	} catch {
		res.writeHead(400, {'Content-Type': 'application/json'});
		res.end(JSON.stringify({error: 'Invalid JSON'}));
	}
}

export function delete_(req, res) {
	try {
		const id = Number(req.params.resourceId);
		deleteUserById(id);
		res.writeHead(204);
		res.end();
	} catch (e) {
		res.writeHead(404, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(e));
	}
}

export async function patch(req, res) {
	const id = Number(req.params.resourceId);
	const existing = getUserById(id);
	try {
		const data = JSON.parse(req.body);
		const updatedUser = {...existing, ...data, id}; // часткове оновлення

		updateUserById(id, updatedUser);
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(updatedUser));
	} catch {
		res.writeHead(400, {'Content-Type': 'application/json'});
		res.end(JSON.stringify({error: 'Invalid JSON'}));
	}
}
