const router = require("express").Router()

router.get("/", (req, res, next) => {
	res.sendFile("views/main.html", { root: require("../root") })
})

router.use("/cats", require("./cats.routes.js"))

router.use("/auth", require("./auth.routes.js"))

module.exports = router
