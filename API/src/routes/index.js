
const siteRoute = require("./site.route");

module.exports = app => {
	app.use("/api", siteRoute);
	
}
