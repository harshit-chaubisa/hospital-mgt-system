const { addDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor, login } = require("./doctor.controller");
const router = require("express").Router();
const { checkDoctorToken } = require("../../auth/tokenValidation")

router.post("/", addDoctor);
router.get("/", checkDoctorToken, getDoctors);
router.get("/:id", checkDoctorToken, getDoctorById);
router.patch("/:id",checkDoctorToken, updateDoctor);
router.delete("/:id",checkDoctorToken, deleteDoctor);
router.post("/login", login);
module.exports = router;