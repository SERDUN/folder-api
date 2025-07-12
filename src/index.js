import http from "node:http";
import {dispatch, preloadRoutes} from "./utils/index.js";

// Totally not hardcoded... definitely from a config file )
const hostname = '127.0.0.1';
const port = 3000;

// Try to prepare the routing tree based on the file system structure
const map = preloadRoutes();
console.log("Preloaded routes:", map);

// Looks not pretty, but not have enough time to make it better
const server = http.createServer((req, res) => dispatch(map, req, res));

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
