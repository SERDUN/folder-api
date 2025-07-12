import {readAsset, writeAsset} from "../utils/index.js";

export function getUsers() {
	const asset = readAsset("database.json");
	return JSON.parse(asset);
}

export function createUser(user) {
	const users = getUsers();
	users.push(user);
	writeAsset("database.json", JSON.stringify(users, null, 2));
	return users;
}

export function getUserById(id) {
	const users = getUsers();
	const user = users.find(user => user.id === id);
	if (!user) {
		throw new Error("User not found");
	}
	return user;
}

export function updateUserById(id, newUser) {
	const users = getUsers();
	const updateIndex = users.findIndex(user => user.id === id);
	users[updateIndex] = newUser;
	writeAsset("database.json", JSON.stringify(users, null, 2));
	return users;
}

export function deleteUserById(id) {
	const users = getUsers();
	const deleteIndex = users.findIndex(user => user.id === id);
	if (deleteIndex === -1) {
		throw new Error("User not found");
	}
	users.splice(deleteIndex, 1);
	writeAsset("database.json", JSON.stringify(users, null, 2));
	return users;
}
