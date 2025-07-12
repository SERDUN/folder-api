export function get(req, res) {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(`GET: Mu list of tasks is empty, but I promise to fill it with procrastination soon!`);
}