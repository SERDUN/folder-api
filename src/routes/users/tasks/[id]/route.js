export function get(req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(`GET: You asked for task ${req.params.resourceId}, but I got distracted organizing my other tasks... alphabetically.`);
}

export function post(req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(`POST: Creating task ${req.params.resourceId}? Absolutely! Right after I finish my task of avoiding tasks.`);
}

export function put(req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(`PUT: I tried to update task ${req.params.resourceId}, but my motivation file was not found.`);
}

export function delete_(req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(`DELETE: Tried to delete task ${req.params.resourceId}, but it ghosted me first.`);
}

export function patch(req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(`PATCH: Small edits to task ${req.params.resourceId} were planned. Then I took a "small" break.`);
}
