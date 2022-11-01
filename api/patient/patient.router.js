const { addPatient, getPatientById, getPatients,updatePatient, deletePatient, login } = require("./patient.controller");
const router = require("express").Router();
const { checkPatientToken } = require("../../auth/tokenValidation");

router.post("/", addPatient);
router.get("/", checkPatientToken, getPatients);
router.get("/:id", checkPatientToken, getPatientById);
router.patch("/:id",checkPatientToken, updatePatient);
router.delete("/:id",checkPatientToken, deletePatient);
router.post("/login", login);
module.exports = router;