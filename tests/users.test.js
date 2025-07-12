import test from 'node:test';
import assert from 'node:assert';
import http from 'node:http';

const BASE_URL = 'http://127.0.0.1:3000';

test('GET /users should return 200', async () => {
	const res = await fetch(`${BASE_URL}/users`);
	assert.strictEqual(res.status, 200);
});

test('POST /users should return 200 or 201', async () => {
	const res = await fetch(`${BASE_URL}/users`, {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({name: 'Alice'}),
	});

	assert.ok([200, 201].includes(res.status));
});