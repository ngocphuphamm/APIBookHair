
const siteRoute = require("./site.route");

function route(app) {
	app.use("/api", siteRoute);
	
}
module.exports = route;