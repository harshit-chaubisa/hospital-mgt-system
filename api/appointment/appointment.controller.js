const { addAppointment, cancelAppointment } = require("./appointment.service");
const ck = require("ckey");

module.exports = {
    addAppointment: (req,res)=>{
        const body = req.body;
        addAppointment(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error."
                });
            }
            return res.status(201).json({
                success: 1,
                data: results
            });
        });
    },
    cancelAppointment : (req,res) => {
        const id = req.params.id;
        cancelAppointment(id,(err,results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success :1,
                message : "Appointment deleted successfully."
            });
        });
    }
};