## Folder-based REST API Router with Raw Node.js

### Project Goal

Build a folder-based router inspired by Next.js App Router using only core Node.js modules. Implement a simple CRUD REST
API for `users` (or other resources) with routing and logic isolation.

---

### Objectives

* Understand `http.createServer` and Node.js core modules deeply
* Learn how to match URL paths to file structure with dynamic segments like `[id]`
* Practice clean architecture (route → controller → service → model)
* Experience limitations of raw Node.js and see what Express/Nest simplify

---

### Architectural Requirements

1. **Deterministic Path-to-File Mapping**
   Every folder level adds a URL segment. `route.js` is the endpoint handler.

2. **Dynamic Segments**
   Folders like `[id]` define dynamic parameters. Example:
   `/routes/users/[id]/route.js` handles `GET /users/42`

3. **Multi-method Support**
   Each `route.js` can export any combination of `GET`, `POST`, `PUT`, `DELETE` methods. Unsupported methods →
   `405 Method Not Allowed`.

4. **Logic Isolation**
   Keep `route.js` focused only on HTTP layer: parsing, routing, responding. Move all data logic to `/services/*.js`.

5. **Zero Dependencies**
   Use only core Node.js modules: `http`, `fs/promises`, `path`, etc.

6. **Optional: Hot Reloading**
   Reload route handlers on file changes using `fs.watch` and `import()` with a cache-busting query param.

7. **JSON Database**
   Read/write from `database.json`. Format must remain valid JSON after each write.

8. **HTTP Error Codes**

    * `400`: Validation errors
    * `404`: Resource not found
    * `405`: Unsupported method
    * `500`: Internal server error
