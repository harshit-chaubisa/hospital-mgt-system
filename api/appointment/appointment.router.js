const { addAppointment, cancelAppointment } = require("./appointment.controller");
const router = require("express").Router();
const { checkPatientToken } = require("../../auth/tokenValidation")

router.post("/", checkPatientToken, addAppointment);
router.delete("/:id",checkPatientToken, cancelAppointment)

module.exports = router;