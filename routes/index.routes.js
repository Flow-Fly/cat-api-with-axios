const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.sendFile('index')
});



router.use('/cats', require('./cats.routes.js'))
module.exports = router;
