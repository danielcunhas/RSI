import {db} from "../db.js"

export const getTurmas = (_,res)=>{
    const queryGetTurmas = "SELECT * FROM TURMA"

    db.query(queryGetTurmas,(err,data) => {
        if (err){
          return res.json(err)
        }else {
          return res.status(200).json(data)
        }  
    })
}