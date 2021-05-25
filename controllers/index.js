const router = require("express").Router();

const apiRoutes = require("./api/");
const homeRoutes = require("./home-routes.js");
//const dashboardRoutes = require('./add-routes.js');

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
//router.use('/adduser', dashboardRoutes);


module.exports = router;





