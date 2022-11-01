const pool = require("../../config/database");

module.exports = {
    addDoctor: (data,callBack) =>{
        pool.query(
            'INSERT INTO `doctor`(fName,lName,age,gender,phNo,eMail,psswd,shift,wardNo) VALUES(?,?,?,?,?,?,?,?,?)',
            [
                data.fName,
                data.lName,
                data.age,
                data.gender,
                data.phNo,
                data.eMail,
                data.psswd,
                data.shift,
                data.wardNo
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                return callBack(null,results)
            }
        );
    },
    getDoctors: callBack=>{
        pool.query(
            'SELECT * FROM `doctor`',
            [],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );

    },
    getDoctorById: (id,callBack) =>{
        pool.query(
            'SELECT * FROM `doctor` WHERE id = ?',
            [id],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },
    updateDoctor : (data,id,callBack) =>{
        pool.query(
            'UPDATE `doctor` set fName = ?, lName = ?, age = ?, gender = ?, phNo = ?, eMail = ?, psswd = ?, shift = ?, wardNo = ? where id = ?',
            [
                data.fName,
                data.lName,
                data.age,
                data.gender,
                data.phNo,
                data.eMail,
                data.psswd,
                data.shift,
                data.wardNo,
                id
                
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    deleteDoctor : (id,callBack)=>{
        pool.query(
            'DELETE FROM `doctor` where id = ?',
            [id],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    getDoctorByPhNo : (phNo, callBack) =>{
        pool.query (
            'SELECT * FROM `doctor` WHERE phNo = ?',
            [phNo],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0])
            }
        )
    }
};