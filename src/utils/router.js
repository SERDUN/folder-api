// Quick-and-dirty routing logic for a Node.js app.
// Parses the file system to find the matching route and sticks the dynamic ID into request.params as `resourceId`.
// It ain't pretty — but hey, it's fast.
export async function dispatch(route, request, response) {
	const {url, method} = request;
	const normalizedMethod = method.toLowerCase() === 'delete' ? 'delete_' : method.toLowerCase();
	console.log("Incoming request:", url);
	const {routePath, id} = matchRoute(route, url.split('/').filter(Boolean));

	console.log("Matched route:", routePath, "with ID:", id);

	if (!routePath) {
		console.error("Route not found for:", url);
		response.writeHead(404, {'Content-Type': 'text/plain'});
		return response.end('Not Found');
	}

	if (id !== null) {
		console.log(`ID found: ${id}`);
		request.params = {...request.params, resourceId: id};
	}

	try {
		console.log(`${url}: ${routePath}`);
		const module = await import(routePath);
		const handler = module[normalizedMethod];

		if (normalizedMethod === 'post' || normalizedMethod === 'put' || normalizedMethod === 'patch') {
			let body = '';
			for await (const chunk of request) {
				body += chunk;
			}
			try {
				request.body = body;
			} catch (err) {
				console.error("Invalid JSON in request body:", err);
				response.writeHead(400, {'Content-Type': 'application/json'});
				return response.end(JSON.stringify({error: 'Invalid JSON in request body'}));
			}
		}

		if (typeof handler !== 'function') {
			console.warn(`Method ${method} not allowed for ${pathname}`);
			response.writeHead(405, {'Content-Type': 'application/json'});
			return response.end(JSON.stringify({error: `Method ${method} not allowed`}));
		}

		await handler(request, response);
	} catch (error) {
		console.error("Error handling request:", error);
		response.writeHead(500, {'Content-Type': 'application/json'});
		response.end(JSON.stringify({error: 'Internal Server Error'}));
	}
}

// WARNING: Work only fot one level of dynamic segments (e.g. /users/:id), for current tasks should be enough.
function matchRoute(route, path) {
	let bestMatch = null;

	for (const routeKey in route) {
		const {urlPattern, filePath} = route[routeKey];
		const routeSegment = urlPattern.split('/').filter(Boolean);
		if (routeSegment.length !== path.length) continue;

		let id = null;
		let isMatch = true;

		for (let i = 0; i < routeSegment.length; i++) {
			const segment = routeSegment[i];
			if (segment.startsWith(':')) {
				id = path[i];
			} else if (segment !== path[i]) {
				isMatch = false;
				break;
			}
		}

		if (isMatch) {
			bestMatch = {routePath: filePath, id};
			// If this is no dynamic segments, stop searching — it's the best match :)
			if (!urlPattern.includes(':')) break;
		}
	}

	return bestMatch || {routePath: null, id: null};
}
