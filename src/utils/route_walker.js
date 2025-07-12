import {getRoutePath} from "./root_path.js";
import {readdirSync} from "fs";
import path from "node:path";

export function preloadRoutes() {
	const basePath = getRoutePath();
	return walkRoutes(basePath, '', []);
}

function isDynamicDirectory(entry) {
	return entry.isDirectory() && entry.name.startsWith('[') && entry.name.endsWith(']');
}

function walkRoutes(currentFsPath, currentUrlPath, currentParams, rootFile = 'route.js') {
	const entries = readdirSync(currentFsPath, {withFileTypes: true});
	const collectedRoutes = [];

	const isFewDynamicDirectory = entries.filter(entry => entry.isDirectory() && isDynamicDirectory(entry)).length > 1;

	console.log(`Found ${entries.length} entries in ${currentFsPath}. Dynamic directories: ${isFewDynamicDirectory}`);

	if (isFewDynamicDirectory) {
		throw new Error(`Multiple dynamic directories found in ${currentFsPath}. Only one dynamic directory is allowed per level.`);
	}

	for (const entry of entries) {
		const fullPath = path.posix.join(currentFsPath, entry.name);

		if (entry.isDirectory()) {
			const isDynamic = isDynamicDirectory(entry);
			const paramName = isDynamic ? entry.name.slice(1, -1) : null;

			const nextUrlPath = path.posix.join(currentUrlPath, isDynamic ? `:${paramName}` : entry.name);
			const nextParams = isDynamic ? [...currentParams, paramName] : currentParams;

			collectedRoutes.push(...walkRoutes(fullPath, nextUrlPath, nextParams, rootFile));
		}

		if (entry.isFile() && entry.name === rootFile) {
			collectedRoutes.push({
				urlPattern: currentUrlPath || '/', filePath: `file://${fullPath}`, params: currentParams,
			});
		}
	}

	return collectedRoutes;
}
