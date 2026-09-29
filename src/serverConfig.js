// Conversion server and front end URLs used by the samples.
// Defaults target a local cadviewer-conversion-server; override them at build time with
// REACT_APP_SERVER_BACKEND_URL, REACT_APP_SERVER_URL and REACT_APP_INIT_FILE_NAME.

const withTrailingSlash = (url) => (url.endsWith("/") ? url : url + "/");

export const ServerBackEndUrl = withTrailingSlash(process.env.REACT_APP_SERVER_BACKEND_URL || "http://localhost:3000/");
export const ServerUrl = withTrailingSlash(process.env.REACT_APP_SERVER_URL || window.location.origin);

// Drawing loaded on start, as a path on the conversion server
export const InitFileName = process.env.REACT_APP_INIT_FILE_NAME || "/content/drawings/dwg/hq17_.dwg";

// Absolute URL of a file under the conversion server content/ folder, e.g. serverContentUrl("/content/drawings/dwg/hq17_.dwg")
export const serverContentUrl = (path) => ServerBackEndUrl + path.replace(/^\//, "");
