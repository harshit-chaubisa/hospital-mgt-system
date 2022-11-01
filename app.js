const express =require("express");
const app  = express();
const ck = require("ckey");
const doctorRouter = require("./api/doctor/doctor.router");
const patientRouter = require("./api/patient/patient.router");
const appointmentRouter = require("./api/appointment/appointment.router");
const prescriptionRouter = require("./api/prescription/prescription.router");
app.use(express.json());

app.use("/api/doctor",doctorRouter);
app.use("/api/patient",patientRouter);
app.use("/api/appointment",appointmentRouter);
app.use("/api/prescription",prescriptionRouter);


app.get("/api",(req,res)=>{
    res.json({
        success:1,
        message:"This is rest api is working"
    });
});

app.listen(ck.APP_PORT,()=>{
    console.log("Server is starting at the port number : ",ck.APP_PORT);
});

module.exports = app;