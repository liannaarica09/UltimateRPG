const router = require("express").Router();
const charController = require("../../controllers/charController");

// Matches with "/api/chars"
router.route("/")
    .get(charController.findAll)
    .post(charController.create);

// Matches with "/api/chars/:id"
router
    .route("/:id")
    .get(charController.findById)
    .put(charController.update)
    .delete(charController.remove);
module.exports = router;