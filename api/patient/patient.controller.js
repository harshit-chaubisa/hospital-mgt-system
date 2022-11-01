const { addPatient, getPatientById, getPatients, updatePatient, deletePatient, getPatientByPhNo } = require("./patient.service");
const { hashSync, genSaltSync, compareSync  } = require("bcrypt");
const { sign, JsonWebTokenError } = require("jsonwebtoken");
const ck = require("ckey");

module.exports = {
    addPatient: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.psswd = hashSync(body.psswd,salt);
        addPatient(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(409).json({
                    success: 0,
                    message: "Patient already Exists."
                });
            }
            return res.status(201).json({
                success: 1,
                data: results
            });
        });
    },
    getPatientById : (req,res) => {
        const id = req.params.id;
        getPatientById(id,(error,results) =>{
            if(error){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },
    getPatients: (req,res) => {
        getPatients((err,results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success : 1,
                data : results
            });
        });
    },
    updatePatient : (req,res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.psswd = hashSync(body.psswd,salt);
        const id = req.params.id;
        updatePatient(body,id,(err,results) =>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success : 1,
                message : "updated successfully"
            });
        });
    },
    deletePatient : (req,res) => {
        const id = req.params.id;
        deletePatient(id,(err,results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success :1,
                message : "user deleted successfully."
            });
        });
    },
    login: (req,res) => {
        const body = req.body;
        getPatientByPhNo(body.phNo,(err,results) => {
            if(err) { 
                console.log(err);
            }
            if(!results){
                return res.status(400).json({
                    success : 0,
                    data : "Invalid phone number or password."
                });
            }
            const result = compareSync(body.psswd,results.psswd);
            if(result){
                results.psswd = undefined;
                const jsontoken = sign({result : results}, ck.PATIENT_SECRET);
                return res.status(200).json({
                    success : 1,
                    message : "login successful",
                    token : jsontoken
                });
            }
            // else{
            //     return res.status(401).json({
            //         success : 0,
            //         data : "Invalid phone number or password"
            //     });
            // }
        });
    }
};