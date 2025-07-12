import {getRoutePath} from "./root_path.js";
import {readdirSync} from "fs";
import path from "node:path";

export function preloadRoutes() {
	const basePath = getRoutePath();
	return walkRoutes(basePath, '', []);
}

function walkRoutes(currentFsPath, currentUrlPath, currentParams, rootFile = 'route.js') {
	const entries = readdirSync(currentFsPath, {withFileTypes: true});
	const collectedRoutes = [];

	for (const entry of entries) {
		const fullPath = path.posix.join(currentFsPath, entry.name);

		if (entry.isDirectory()) {
			const isDynamic = entry.name.startsWith('[') && entry.name.endsWith(']');
			const paramName = isDynamic ? entry.name.slice(1, -1) : null;

			const nextUrlPath = path.posix.join(currentUrlPath, isDynamic ? `:${paramName}` : entry.name);
			const nextParams = isDynamic ? [...currentParams, paramName] : currentParams;

			collectedRoutes.push(...walkRoutes(fullPath, nextUrlPath, nextParams, rootFile));
		}

		if (entry.isFile() && entry.name === rootFile) {
			collectedRoutes.push({
				urlPattern: currentUrlPath || '/',
				filePath: `file://${fullPath}`,
				params: currentParams,
			});
		}
	}

	return collectedRoutes;
}
