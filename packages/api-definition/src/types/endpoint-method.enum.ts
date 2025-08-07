/**
 * This enum should stay in sync with RequestMethod from "@nestjs/common"
 */
export enum EndpointMethod {
	GET = "get",
	POST = "post",
	PUT = "put",
	DELETE = "delete",
	PATCH = "patch",
	ALL = "all",
	OPTIONS = "options",
	HEAD = "head",
	SEARCH = "search",
	PROPFIND = "propfind",
	PROPPATCH = "proppatch",
	MKCOL = "mkcol",
	COPY = "copy",
	MOVE = "move",
	LOCK = "lock",
	UNLOCK = "unlock",
}
