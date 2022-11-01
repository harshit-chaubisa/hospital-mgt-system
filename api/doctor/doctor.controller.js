const { addDoctor, getDoctorById, getDoctors, updateDoctor, deleteDoctor, getDoctorByPhNo } = require("./doctor.service");
const { hashSync, genSaltSync, compareSync  } = require("bcrypt");
const { sign, JsonWebTokenError } = require("jsonwebtoken");
const ck = require("ckey");

module.exports = {
    addDoctor: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.psswd = hashSync(body.psswd,salt);
        addDoctor(body,(err,results)=>{
            if(err){
                console.log(err);
                return res.status(409).json({
                    success: 0,
                    message: "User already exists."
                });
            }
            return res.status(201).json({
                success: 1,
                data: results
            });
        });
    },
    getDoctorById : (req,res) => {
        const id = req.params.id;
        getDoctorById(id,(error,results) =>{
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
    getDoctors: (req,res) => {
        getDoctors((err,results) => {
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
    updateDoctor : (req,res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.psswd = hashSync(body.psswd,salt);
        const id = req.params.id;
        updateDoctor(body,id,(err,results) =>{
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
    deleteDoctor : (req,res) => {
        const id = req.params.id;
        deleteDoctor(id,(err,results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success :1,
                message : "Doctor deleted successfully."
            });
        });
    },
    login: (req,res) => {
        const body = req.body;
        getDoctorByPhNo(body.phNo,(err,results) => {
            if(err) { 
                console.log(err);
            }
            if(!results){
                return res.status(400).json({
                    success : 0,
                    message : "Please enter correct phone no. or password."
                });
            }
            const result = compareSync(body.psswd,results.psswd);
            if(result){
                results.psswd = undefined;
                const jsontoken = sign({result : results}, ck.DOCTOR_SECRET);
                return res.status(200).json({
                    success : 1,
                    message : "login successful",
                    token : jsontoken
                });
            }
            // else{
            //     return res.status(401).json({
            //         success : 0,
            //         message : "Invalid phone number or password"
            //     });
            // }
        });
    }
};